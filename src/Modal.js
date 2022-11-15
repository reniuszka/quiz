import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { questions, correctAnswer, isModalOpen, closeModal } =
    useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h2>congrats</h2>
        <p>
          You answered {((correctAnswer / questions.length) * 100).toFixed()}%
          questions correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
