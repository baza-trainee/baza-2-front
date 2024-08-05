"use client";

import { useState } from "react";
import AdminModal from "../../modals/AdminModal/AdminModal";
import UseAlert from "../../shared/UseAlert/UseAlert";
import SectionAdmin from "../SectionAdmin/SectionAdmin";
import ContactsForm from "./ContactsForm/ContactsForm";
import Loader from "../../shared/loader/Loader";

export default function Contacts() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <SectionAdmin title={"Контакти"}>
      <ContactsForm
        onSuccess={() => {
          setIsPending(false);
          openModal();
        }}
        onPending={() => setIsPending(true)}
      />

      {isPending && <Loader />}
      <AdminModal
        isOpen={modalOpen}
        handleCallback={closeModal}
        title={"Дані успішно збережено"}
        btn={true}
      />
      <UseAlert />
    </SectionAdmin>
  );
}
