'use client';

import { useMutation, useQuery } from "@tanstack/react-query";
import { createNewProject, getProjectById, updateProjectById } from "@/src/api/projects";
import DescriptionForm from "./DescriptionForm/DescriptionForm";
import { useRouter } from "@/src/navigation";
import stateUseAlert from "@/src/state/stateUseAlert";
import Loader from "@/src/components/shared/loader/Loader";
import UseAlert from "@/src/components/shared/UseAlert/UseAlert";
import { useCallback, useState } from "react";
import AdminModal from "@/src/components/modals/AdminModal/AdminModal";
import { useParams } from "next/navigation";


export default function EditDescription() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setModalOpen ] = useState(false);
  const {id}= useParams()

  const projectsPath = '/admin/projects'
  
  const closeModal = useCallback(()=>{
    setModalOpen(false)
    router.replace(projectsPath)
  })
 
  const getProject = useQuery({ queryKey: ['project', id], 
    queryFn:()=>{return getProjectById(id)}});
console.log(getProject.data)


  const { mutate, isPending, error, reset } = useMutation({
    mutationFn:(data) => {
      return updateProjectById(id, data)

    },onSuccess: () => {
      setModalOpen(true)
    },onError:()=>{
      open('error', false)
      reset()
    }})

  const hendleSubmit=(data)=>{
    console.log(data)
    console.log(id)
   mutate({...data})
  }



  return (
    <>
      <DescriptionForm hendleMutate={mutate} submitBtnText="Зберегти зміни" data={getProject.data}/>

      { isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Проєкт успішно оновлено'} btn={true}></AdminModal>
      <UseAlert text={error && error?.message}/>
    </>
  )
}