import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../Shared/Context/auth-context";
import Input from "../../../Shared/Components/FormElements/Input/Input";
import Button from "../../../Shared/Components/FormElements/Button/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Utils/Validators/Validators";
import "./NewPost.css";
import useForm from "../../../Shared/Hooks/form-hook";
import useHttpClient from "../../../Shared/Hooks/http-hook";
import ErrorModal from "../../../Shared/Components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner";

const NewPost = (props) => {
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [formState, ChangeHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/posts",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          creator: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      navigate("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <form className="post-form" onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          onInput={ChangeHandler}
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
        />
        <Input
          id="description"
          onInput={ChangeHandler}
          element="textarea"
          type="text"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a description with at least length 5."
        />
        <Button disabled={!formState.isValid}>ADD PLACE</Button>
      </form>
    </React.Fragment>
  );
};

export default NewPost;
