import React from "react";
import { useParams } from "react-router-dom";
import USERPOSTS from "../../../Shared/Utils/Data/UserPostData";
import Error from "../../../Shared/Components/ErrorHandler/ErrorPage/Error";
import Input from "../../../Shared/Components/FormElements/Input/Input";
import Button from "../../../Shared/Components/FormElements/Button/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../../Shared/Utils/Validators/Validators";

const UpdatePost = (props) => {
  const postId = useParams().postId;
  const identifiedPost = USERPOSTS.find((post) => post.id === postId);
  if (!identifiedPost) return <Error message="COULD NOT FIND SUCH A PLACE. " />;
  return (<form className="post-form">
    <Input
        id="title"
        onInput={()=>{}}
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        value={identifiedPost.title}
        valid={true}
        errorText="Please enter a valid title."
      />
      <Input
        id="description"
        onInput={()=>{}}
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        value={identifiedPost.description}
        valid={true}
        errorText="Please enter a description with at least length 5."
      />
      <Button disabled={false}>ADD PLACE</Button>
  </form>);
};

export default UpdatePost;
