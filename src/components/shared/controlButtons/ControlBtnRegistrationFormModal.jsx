"use client";
import useStateModal from "@/src/state/stateRegistrationFormModal";
import MainButton from "../MainButton/MainButton";

export default function ControlBtnRegistrationFormModal({children, className}) {
  const open = useStateModal((state) => state.open)
  return <MainButton 
    className={className} 
    onClick={open}>
      {children}
  </MainButton>
}