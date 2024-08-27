"use client";

import { useCallback, useState } from "react";
import AdminModal from "../../modals/AdminModal/AdminModal";
import UseAlert from "../../shared/UseAlert/UseAlert";
import SectionAdmin from "../SectionAdmin/SectionAdmin";

import Loader from "../../shared/loader/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";
import stateUseAlert from "@/src/state/stateUseAlert";
import DocumentsForm from "./DocumentsForm/DocumentsForm";
import { getDocuments, updateDocuments } from "@/src/api/documents";
import ModalDocumentPdf from "../../modals/ModalDocumentPdf/ModalDocumentPdf";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";

export default function Documents() {
  const [modalOpen, setmodalOpen] = useState(false);
  const open = stateUseAlert((state) => state.open);

  const[ prevUrl, setPrevUrl ] = useState(null)


  const documents = useQuery({ queryKey: ["documents"], queryFn: getDocuments });

  const { mutate, isPending, reset ,isSuccess} = useMutation({
    mutationFn: (data) => {
      return updateDocuments(data);
    },
    onSuccess: () => {
      documents.refetch();
      setmodalOpen(true);
    },
    onError: () => {
      open("error", false);
    },
  });
console.log(isSuccess)
  const closeModal = useCallback(() => {
    //documents.refetch();
    reset()
    setmodalOpen(false);
  });
console.log(documents.data)
  return (
    <SectionAdmin title={"Документи"}>
      <DocumentsForm data={documents.data} hendleMutate={mutate} hendleSetPrev={setPrevUrl} isSuccess={isSuccess}/>

      {isPending && <Loader />}
      <AdminModal
        isOpen={modalOpen}
        handleCallback={closeModal}
        title={"Дані успішно збережено"}
        btn={true}
      />

       <ModalDocumentPdf url={prevUrl?createImageUrl(prevUrl):null} hedleClose={()=>{
        setPrevUrl(null)
       }}/>
      <UseAlert />
    </SectionAdmin>
  );
}
