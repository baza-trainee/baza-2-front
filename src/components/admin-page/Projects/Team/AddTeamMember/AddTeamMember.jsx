import { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllRoles } from "@/src/api/roles";
import { createNewMember } from "@/src/api/members";
import { useProjectFormContext } from "../../ProjectFormProvider/ProjectFormProvider";
import stateUseAlert from "@/src/state/stateUseAlert";
import TeamForm from "../TeamForm/TeamForm";
import Loader from "@/src/components/shared/loader/Loader";
import AdminModal from "@/src/components/modals/AdminModal/AdminModal";
import UseAlert from "@/src/components/shared/UseAlert/UseAlert";

export default function AddTeamMember({hendleCancel, roles}) {
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setModalOpen ] = useState(false);

  const[ selectedRole, setSelectedRole ] = useState(null)
  // Контекст форми
  const{  
    addTeamMember,
    } = useProjectFormContext()  

  // Отримуємо всі спеціальності
  // const getRoles = useQuery({ queryKey: ['roles'], 
  //   queryFn:()=>{return getAllRoles({})}, keepPreviousData: true });

  // Додавання учасника до бази  
  const createMember= useMutation({
    mutationFn:(data) => {
      return createNewMember(data)
    },onSuccess: () => {
      setModalOpen(true)
    },onError:()=>{
      open('error', false)
    }})


  const closeModal = useCallback(()=>{
    // Додавання нового учасника до проєкту 
    const newData={
      teamMemberRole:selectedRole
    }
    newData.teamMember = createMember.data.data
    addTeamMember(newData)
    setModalOpen(false)
    hendleCancel()
  })
 
  const onSubmit = (data)=>{
    const newData={
      teamMemberRole:selectedRole
    }
    // Як що учасник є в базі - додаємо до проєкту 
    if(data._id){
      newData.teamMember = data
      addTeamMember(newData)
      hendleCancel()
    }else{
      // Як що учасник новий - додаємо до бази - потім до проєкту 
      createMember.mutate(data)
    }
  }

  return(
    <>  
      <TeamForm hendleMutate={onSubmit} 
        //roles={getRoles.data?.results} 
        roles={roles}
        hendleCancel={hendleCancel}
        selectedRole={selectedRole} 
        setSelectedRole={setSelectedRole}/>

      { createMember.isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Новий учасник успішно доданий до бази та проєкту'} btn={true}></AdminModal>

      <UseAlert text={createMember.error && createMember.error?.message}/>
    </>
  )
}