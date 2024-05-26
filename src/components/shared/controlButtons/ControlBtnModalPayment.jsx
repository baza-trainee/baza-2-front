"use client";
import stateModalPayment from "@/src/state/stateModalPayment";
import MainButton from "../MainButton/MainButton";

export default function ControlBtnModalPayment({ children, className, onClick}) {
  const open = stateModalPayment((state) => state.open)
  return <MainButton 
    className={className} 
    onClick={()=>{
      open()
      onClick && onClick()
    }}>
      {children}
  </MainButton>
}