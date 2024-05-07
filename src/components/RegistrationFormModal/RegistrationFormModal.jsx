"use client";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./RegistrationFormModal.module.scss";

const RegistrationFormModal = ({ isOpen, children, onClose }) => {
  const modalRef = React.useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2>Реєстрація на участь у проекті Baza Trainee Ukraine</h2>
          <input type="text" placeholder="Ім'я" required />
          <input type="text" placeholder="Прізвище" required />
          <div>
            <label>
              <input
                type="checkbox"
                name="specialization"
                value="UIUX designer"
              />{" "}
              UI/UX designer
            </label>
            <label>
              <input type="checkbox" name="specialization" value="Frontend" />{" "}
              Frontend
            </label>
            <label>
              <input type="checkbox" name="specialization" value="Backend" />{" "}
              Backend
            </label>
            <label>
              <input
                type="checkbox"
                name="specialization"
                value="Fullstack engineer"
              />{" "}
              Fullstack engineer
            </label>
            <label>
              <input
                type="checkbox"
                name="specialization"
                value="QA Manual engineer"
              />{" "}
              QA Manual engineer
            </label>
            <label>
              <input
                type="checkbox"
                name="specialization"
                value="Project Manager"
              />{" "}
              Project Manager
            </label>
          </div>
          <input type="email" placeholder="Електронна пошта" required />
          <input type="text" placeholder="Телефон" required />
          <input type="text" placeholder="Нік в Discord" required />
          <input type="url" placeholder="Профіль в Linkedin" required />
          <div>
            <label>
              <input type="checkbox" name="consultation_time" value="9-12" />{" "}
              9.00-12.00
            </label>
            <label>
              <input type="checkbox" name="consultation_time" value="12-15" />{" "}
              12.00-15.00
            </label>
            <label>
              <input type="checkbox" name="consultation_time" value="18-21" />{" "}
              18.00-21.00
            </label>
            <label>
              <input type="checkbox" name="consultation_time" value="Anytime" />{" "}
              Будь-який
            </label>
          </div>
          <button type="submit">Відправити</button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default RegistrationFormModal;
