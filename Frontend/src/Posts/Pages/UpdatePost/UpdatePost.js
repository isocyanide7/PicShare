import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import USERPOSTS from "../../../Shared/Utils/Data/UserPostData";
import Error from "../../../Shared/Components/ErrorHandler/ErrorPage/Error";
import Input from "../../../Shared/Components/FormElements/Input/Input";
import Button from "../../../Shared/Components/FormElements/Button/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Utils/Validators/Validators";
import useForm from "../../../Shared/Hooks/form-hook";

const UpdatePost = (props) => {
  const postId = useParams().postId;

  const [isLoading, setIsLoading] = useState(true);

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
  const postUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  const identifiedPost = USERPOSTS.find((post) => post.id === postId);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: identifiedPost.title,
          valid: true,
        },
        description: {
          value: identifiedPost.description,
          valid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, identifiedPost]);

  if (!identifiedPost) return <Error message="COULD NOT FIND SUCH A PLACE. " />;

  if (isLoading) {
    return <div className="center"> LOADING...</div>;
  }
  return (
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
  );
};

export default UpdatePost;
