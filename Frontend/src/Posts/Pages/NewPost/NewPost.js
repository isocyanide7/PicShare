import React from "react";

import Input from "../../../Shared/Components/FormElements/Input/Input";
import "./NewPost.css";

const NewPost = (props) => {
  return (
    <form className="post-form">
      <Input element="input" type="text" label="Title"></Input>
    </form>
  );
};

export default NewPost;
