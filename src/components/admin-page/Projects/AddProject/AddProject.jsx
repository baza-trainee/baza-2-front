'use client';
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "@/src/navigation";
import { useMutation } from "@tanstack/react-query";
import { createNewProject } from "@/src/api/projects";
import switchTabProject from "@/src/state/switchTabProject";
import { ProjectFormProvider } from "../ProjectFormProvider/ProjectFormProvider";
import stateUseAlert from "@/src/state/stateUseAlert";
import Loader from "@/src/components/shared/loader/Loader";
import UseAlert from "@/src/components/shared/UseAlert/UseAlert";
import AdminModal from "@/src/components/modals/AdminModal/AdminModal";
import ProjectForm from "../ProjectForm/ProjectForm";
import Team from "../Team/Team";

export default function AddProject() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const tabName = switchTabProject(state => state.tabName);
  const switchtabName= switchTabProject(state => state.switch);

  const[ modalOpen, setModalOpen ] = useState(false);

  const projectsPath = '/admin/projects'
  // Сторінка за замовчуванням
  useEffect(()=>{
    switchtabName('description')
  },[])

  const closeModal = useCallback(()=>{
    setModalOpen(false)
    router.replace(projectsPath)
  })

  // Додавання нового проєкту.
  const { mutate, isPending, error } = useMutation({
    mutationFn:(data) => {
      return createNewProject(data)
    },onSuccess: () => {
      setModalOpen(true)
    },onError:()=>{
      open('error', false)
    }})


  return (
    <ProjectFormProvider hendleMutate={mutate} variant="add">
      {tabName=='description'&& <ProjectForm submitBtnText="Додати"/>}

      {tabName=='team'&& <Team/>}

      { isPending && <Loader/> }

      <AdminModal 
        isOpen={modalOpen} 
        handleCallback={closeModal} 
        title={'Проєкт успішно додано'} 
        btn={true}>
      </AdminModal>

      <UseAlert text={error && error?.message}/>
    </ProjectFormProvider>
  )
}