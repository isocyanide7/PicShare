import React from "react";

import Input from "../../../Shared/Components/FormElements/Input/Input";
import { VALIDATOR_REQUIRE } from "../../../Shared/Utils/Validators";
import "./NewPost.css";

const NewPost = (props) => {
  return (
    <form className="post-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
      />
    </form>
  );
};

export default NewPost;
