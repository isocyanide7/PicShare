import React from "react";

import Input from "../../../Shared/Components/FormElements/Input/Input";
import Button from "../../../Shared/Components/FormElements/Button/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../Shared/Utils/Validators/Validators";
import "./NewPost.css";
import useForm from "../../../Shared/Hooks/form-hook";

const NewPost = (props) => {
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

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="post-form" onSubmit={submitHandler}>
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
  );
};

export default NewPost;
