import React from "react";
import { useState } from "react";

import Card from "../../../Shared/Components/UIElements/Card/Card";
import Button from "../../../Shared/Components/FormElements/Button/Button";
import Modal from "../../../Shared/Components/UIElements/Modal/Modal";

import "./PostItem.css";

const PostItem = (props) => {
  const [showPhoto, setShowPhoto] = useState(false);
  const openPhotoHandler = () => {
    setShowPhoto(true);
  };
  const closePhotoHandler = () => {
    setShowPhoto(false);
  };
  return (
    <React.Fragment>
      <Modal
        show={showPhoto}
        onCancel={closePhotoHandler}
        header={props.caption}
        contentClass="post-item__modal-content"
        footerClass="post-item__modal-actions"
        footer={<Button onClick={closePhotoHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <p className="post-item__info">{props.description}</p>
          </div>
      </Modal>
      <li className="post-item">
        <Card className="post-item__content">
          <div className="post-item__image">
            <img src={props.image} alt={props.caption} />
          </div>
          <div className="post-item__info">
            <h2>{props.caption}</h2>
          </div>
          <div className="post-item__actions">
            <Button inverse onClick={openPhotoHandler}>
              VIEW DESCRIPTION
            </Button>
            <Button to={`/posts/${props.id}`}>EDIT POST</Button>
            <Button danger>DELETE POST</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PostItem;
