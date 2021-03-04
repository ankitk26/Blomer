import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { delete_blog } from "../../redux/reducers/blogReducer";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "35%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(27,27,27,0.7)",
  },
};

Modal.setAppElement("#root");

const DeleteBlogBtn = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDelete = () => {
    dispatch(delete_blog(id));
    history.push("/myblogs");
  };

  return (
    <>
      <button className="flex items-center gap-1 p-0 focus:outline-none" onClick={openModal}>
        <i className="text-purple-500 material-icons hover:text-purple-700">delete</i>
        <span>Delete blog</span>
      </button>
      <Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal} contentLabel="Delete confirmation modal">
        <button className="float-right focus:outline-none" onClick={closeModal}>
          <i className="text-gray-800 cursor-pointer hover:text-gray-900 material-icons">close</i>
        </button>
        <h1 className="text-2xl text-gray-900">Confirm deletion of the blog</h1>
        <div className="flex items-center gap-5 mt-5">
          <button className="btn-purple" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="px-4 py-1 text-purple-700 border-2 border-purple-700 hover:border-purple-900 hover:text-purple-900"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteBlogBtn;
