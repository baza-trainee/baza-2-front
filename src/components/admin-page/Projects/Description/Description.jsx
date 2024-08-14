'use client';

import { useMutation } from "@tanstack/react-query";
import { createNewProject } from "@/src/api/projects";
import DescriptionForm from "./DescriptionForm/DescriptionForm";
import { useRouter } from "@/src/navigation";
import stateUseAlert from "@/src/state/stateUseAlert";
import Loader from "@/src/components/shared/loader/Loader";
import UseAlert from "@/src/components/shared/UseAlert/UseAlert";
import { useCallback, useState } from "react";
import AdminModal from "@/src/components/modals/AdminModal/AdminModal";


export default function Description() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setModalOpen ] = useState(false);

  const projectsPath = '/admin/projects'
  
  const closeModal = useCallback(()=>{
    setModalOpen(false)
    router.replace(projectsPath)
  })
 

  const { mutate, isPending, error } = useMutation({
    mutationFn:(data) => {
      return createNewProject(data)

    },onSuccess: () => {
      setModalOpen(true)
    },onError:()=>{
      open('error', false)
    }})


  return (
    <>
      <DescriptionForm hendleMutate={mutate}/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Проєкт успішно додано'} btn={true}></AdminModal>
      <UseAlert text={error && error?.message}/>
    </>
  )
}