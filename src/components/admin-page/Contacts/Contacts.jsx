"use client";

import { useCallback, useEffect, useState } from "react";
import AdminModal from "../../modals/AdminModal/AdminModal";
import UseAlert from "../../shared/UseAlert/UseAlert";
import SectionAdmin from "../SectionAdmin/SectionAdmin";
import ContactsForm from "./ContactsForm/ContactsForm";
import Loader from "../../shared/loader/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getContacts, updateContacts } from "@/src/api/contacts";
import stateUseAlert from "@/src/state/stateUseAlert";

export default function Contacts() {
  const [modalOpen, setmodalOpen] = useState(false);
  const open = stateUseAlert((state) => state.open);

  const contacts = useQuery({ queryKey: ["contacts"], queryFn: getContacts });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return updateContacts(data);
    },
    onSuccess: () => {
      setmodalOpen(true);
      contacts.refetch();
    },
    onError: () => {
      open("error", false);
    },
  });

  const closeModal = useCallback(() => {
    setmodalOpen(false);
  });
  useEffect(() => {
    if (contacts.data) {
      console.log("Данные контактов:", contacts.data);
    }
  }, [contacts.data]);

  return (
    <SectionAdmin title={"Контакти"}>
      <ContactsForm defaultValues={contacts.data} handleMutate={mutate} />

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
