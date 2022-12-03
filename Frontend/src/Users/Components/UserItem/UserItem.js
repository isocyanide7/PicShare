import userEvent from "@testing-library/user-event";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../Shared/Components/UIElements/Avatar/Avatar";
import Card from "../../../Shared/Components/UIElements/Card/Card";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <ul className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/posts`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.postCount} {props.postCount === 1 ? "Photo" : "Photos"}
            </h3>
          </div>
        </Link>
      </Card>
    </ul>
  );
};

export default UserItem;
