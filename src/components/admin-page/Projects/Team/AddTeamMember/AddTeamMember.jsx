import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNewMember } from "@/src/api/members";
import { useProjectFormContext } from "../../ProjectFormProvider/ProjectFormProvider";
import stateUseAlert from "@/src/state/stateUseAlert";
import TeamForm from "../TeamForm/TeamForm";
import Loader from "@/src/components/shared/loader/Loader";
import AdminModal from "@/src/components/modals/AdminModal/AdminModal";

export default function AddTeamMember({hendleCancel, roles}) {
  const open = stateUseAlert(state => state.open);
  const[ modalOpen, setModalOpen ] = useState(false);

  const[ selectedRole, setSelectedRole ] = useState(null)
  const[ errorModal, setErrorModal ] = useState(false)

  // Контекст форми
  const{  
    addTeamMember,
    teamMemberData,
  } = useProjectFormContext()  

  // Додавання учасника до бази  
  const createMember= useMutation({
    mutationFn:(data) => {
      return createNewMember(data)
    },onSuccess: () => {
      setModalOpen(true)
    },onError:()=>{
      open('error', false)
    }})

  const memberIsProject=(idMember)=>{
    const res = teamMemberData.find((el)=>{
      return el.teamMember._id === idMember
    })
    if(res){
      return true
    }else return false
  }

  const closeErrorModal=useCallback(()=>{
    setErrorModal(false)
    hendleCancel()
  })

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
      if(memberIsProject(data._id)){
        //'Такий учасник вже є на проєкті'
        setErrorModal(true)
        return
      }else{
        newData.teamMember = data
        addTeamMember(newData)
        hendleCancel()
      }
    }else{
      // Як що учасник новий - додаємо до бази - потім до проєкту 
      createMember.mutate(data)
    }
  }

  return(
    <>  
      <TeamForm hendleMutate={onSubmit} 
        roles={roles}
        hendleCancel={hendleCancel}
        selectedRole={selectedRole} 
        setSelectedRole={setSelectedRole}/>

      { createMember.isPending && <Loader/> }

      <AdminModal isOpen={modalOpen} handleCallback={closeModal} title={'Новий учасник успішно доданий до бази та проєкту'} btn={true}></AdminModal>

      <AdminModal isOpen={errorModal} handleCallback={closeErrorModal} title={'Такий учасник вже є на проєкті'} btn={true}></AdminModal>
    </>
  )
} 