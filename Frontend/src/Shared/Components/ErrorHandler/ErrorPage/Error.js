import React from "react";
import Card from "../../UIElements/Card/Card";

const Error = (props) => {
  if (props.message)
    return (
      <div className="center">
        <Card>{props.message}</Card>
      </div>
    );
  return (
    <div className="center">
      <Card>OOPS! THIS PAGE IS UNDER CONSTRUCTION</Card>
    </div>
  );
};

export default Error;
