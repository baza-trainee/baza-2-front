"use client";
import stateModalPayment from "@/src/state/stateModalPayment";
import MainButton from "../MainButton/MainButton";

export default function ControlBtnModalPayment({ children, className }) {
  const open = stateModalPayment((state) => state.open)
  return <MainButton 
    className={className} 
    onClick={open}>
      {children}
  </MainButton>
}