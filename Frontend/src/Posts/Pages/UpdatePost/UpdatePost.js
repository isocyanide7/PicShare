import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AuthContext from "../../../Shared/Context/auth-context";
import useHttpClient from "../../../Shared/Hooks/http-hook";
import Input from "../../../Shared/Components/FormElements/Input/Input";
import Button from "../../../Shared/Components/FormElements/Button/Button";
import Card from "../../../Shared/Components/UIElements/Card/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Utils/Validators/Validators";
import useForm from "../../../Shared/Hooks/form-hook";
import ErrorModal from "../../../Shared/Components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner";

const UpdatePost = (props) => {
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [loadedPost, setLoadedPost] = useState();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const postId = useParams().postId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        valid: true,
      },
      description: {
        value: "",
        valid: true,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/${postId}`
        );
        setLoadedPost(responseData.post);
        setFormData(
          {
            title: {
              value: responseData.post.title,
              valid: true,
            },
            description: {
              value: responseData.post.description,
              valid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, postId, setFormData]);

  const postUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${postId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json" }
      );
      navigate("/" + auth.userId + "/posts");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        {" "}
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPost && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <form className="post-form" onSubmit={postUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValue={formState.inputs.title.value}
          initialValid={formState.inputs.title.valid}
          errorText="Please enter a valid title."
        />
        <Input
          id="description"
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          initialValue={formState.inputs.description.value}
          initialValid={formState.inputs.description.valid}
          errorText="Please enter a description with at least length 5."
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE POST
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePost;
