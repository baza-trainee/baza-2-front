"use client";

import { useCallback, useState } from "react";
import SectionAdmin from "../SectionAdmin/SectionAdmin";
import ContactsForm from "./ContactsForm/ContactsForm";
import stateUseAlert from "@/src/state/stateUseAlert";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getContacts, updateContacts } from "@/src/api/contacts";
import Loader from "../../shared/loader/Loader";
import AdminModal from "../../modals/AdminModal/AdminModal";
import UseAlert from "../../shared/UseAlert/UseAlert";

export default function Contacts() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = stateUseAlert((state) => state.open);

  const contactsData = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return updateContacts(data);
    },
    onSuccess: () => {
      setModalOpen(true);
      contactsData.refetch();
    },
    onError: () => {
      open("error", false);
    },
  });

  const closeModal = useCallback(() => {
    setModalOpen(false);
  });

  return (
    <SectionAdmin title={"Контакти"}>
      <ContactsForm defaultValues={contactsData.data} handleMutate={mutate} />

      {isPending && <Loader />}
      <AdminModal
        isOpen={modalOpen}
        handleCallback={closeModal}
        title={"Дані успішно збережено"}
        btn={true}
      ></AdminModal>

      <UseAlert />
    </SectionAdmin>
  );
}
