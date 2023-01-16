import React from "react";
import { useState,useContext } from "react";

import AuthContext from "../../../Shared/Context/auth-context";
import useHttpClient from "../../../Shared/Hooks/http-hook";
import Card from "../../../Shared/Components/UIElements/Card/Card";
import Button from "../../../Shared/Components/FormElements/Button/Button";
import Modal from "../../../Shared/Components/UIElements/Modal/Modal";

import "./PostItem.css";
import ErrorModal from "../../../Shared/Components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner";

const PostItem = (props) => {
  const {isLoading, error, sendRequest, errorHandler} =useHttpClient();
  const auth = useContext(AuthContext);
  const [showPhoto, setShowPhoto] = useState(false);
  const openPhotoHandler = () => {
    setShowPhoto(true);
  };
  const closePhotoHandler = () => {
    setShowPhoto(false);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    
    try{
      await sendRequest(`http://localhost:5000/api/posts/${props.id}`, "DELETE");
      props.onDelete(props.id);
    }catch(err){console.log(err.message)}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      <Modal
        show={showPhoto}
        onCancel={closePhotoHandler}
        header={props.title}
        contentClass="post-item__modal-content"
        footerClass="post-item__modal-actions"
        footer={<Button onClick={closePhotoHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <p className="post-item__info">{props.description}</p>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="ARE YOU SURE?"
        footerClass="post-item__modal-actions"
        footer={
          <React.Fragment>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
          </React.Fragment>
        }
      >
        <p>DELETING IS IRREVERSIBLE. DO YOU WANT TO PROCEED?</p>
      </Modal>
      <li className="post-item">
        {isLoading && <LoadingSpinner asOverlay/>}
        <Card className="post-item__content">
          <div className="post-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="post-item__info">
            <h2>{props.title}</h2>
          </div>
          <div className="post-item__actions">
            <Button inverse onClick={openPhotoHandler}>
              VIEW DESCRIPTION
            </Button>
            {auth.userId===props.creatorId && <Button to={`/posts/${props.id}`}>EDIT POST</Button>}
            {auth.userId===props.creatorId && <Button danger onClick={showDeleteWarningHandler}>
              DELETE POST
            </Button>}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PostItem;
