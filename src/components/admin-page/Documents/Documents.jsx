"use client";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDocuments, updateDocuments } from "@/src/api/documents";
import { createImageUrl } from "@/src/lib/hooks/createImageUrl";
import AdminModal from "../../modals/AdminModal/AdminModal";
import UseAlert from "../../shared/UseAlert/UseAlert";
import SectionAdmin from "../SectionAdmin/SectionAdmin";
import Loader from "../../shared/loader/Loader";
import stateUseAlert from "@/src/state/stateUseAlert";
import DocumentsForm from "./DocumentsForm/DocumentsForm";
import ModalDocumentPdf from "../../modals/ModalDocumentPdf/ModalDocumentPdf";

export default function Documents() {
  const [modalOpen, setmodalOpen] = useState(false);
  const open = stateUseAlert((state) => state.open);
  const[ prevUrl, setPrevUrl ] = useState(null)

  // Запит на отримання данних
  const documents = useQuery({ queryKey: ["documents"], queryFn: getDocuments });

 // Запит на зміну данних
  const { mutate, isPending, error ,isSuccess} = useMutation({
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

  const closeModal = useCallback(() => {
    setmodalOpen(false);
  });

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

       <ModalDocumentPdf 
        url={prevUrl?createImageUrl(prevUrl):null} 
        hedleClose={()=>{
          setPrevUrl(null)
        }}/>

      <UseAlert text={error?.message}/>
    </SectionAdmin>
  );
}
