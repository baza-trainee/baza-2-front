'use client';
import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/src/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProjectById, updateProjectById } from "@/src/api/projects";
import { ProjectFormProvider } from "../ProjectFormProvider/ProjectFormProvider";
import switchTabProject from "@/src/state/switchTabProject";
import stateUseAlert from "@/src/state/stateUseAlert";
import Loader from "@/src/components/shared/loader/Loader";
import UseAlert from "@/src/components/shared/UseAlert/UseAlert";
import AdminModal from "@/src/components/modals/AdminModal/AdminModal";
import ProjectForm from "../ProjectForm/ProjectForm";
import Team from "../Team/Team";

export default function EditProject() {
  const router = useRouter();
  const open = stateUseAlert(state => state.open);
  const tabName = switchTabProject(state => state.tabName);
  const[ modalOpen, setModalOpen ] = useState(false);
  const {id}= useParams()

  const projectsPath = '/admin/projects'
  
  const closeModal = useCallback(()=>{
    setModalOpen(false)
    router.replace(projectsPath)
  })

 // Отримуємо проєкт по id
  const getProject = useQuery({ queryKey: ['project', id], 
    queryFn:()=>{return getProjectById(id)}});

  // Оновлення проєкту по id
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn:(data) => {
      return updateProjectById(id, data)
    },onSuccess: () => {
      setModalOpen(true)
    },onError:()=>{
      open('error', false)
      reset()
    }})

  return (
    <ProjectFormProvider hendleMutate={mutate} data={getProject.data}>

      {tabName=='description' && <ProjectForm submitBtnText="Зберегти зміни"/>}
      {tabName=='team'&& <Team/>}

      { isPending && <Loader/> }

      <AdminModal 
        isOpen={modalOpen} 
        handleCallback={closeModal} 
        title={'Дані успішно змінено'} 
        btn={true}>
      </AdminModal>

      <UseAlert text={error && error?.message}/>
    </ProjectFormProvider>
  )
}