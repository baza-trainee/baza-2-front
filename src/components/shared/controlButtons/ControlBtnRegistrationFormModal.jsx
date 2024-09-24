"use client";
import useStateModal from "@/src/state/stateRegistrationFormModal";
import MainButton from "../MainButton/MainButton";
import { isMobile } from 'react-device-detect'; // <<<!! Прибрати 

export default function ControlBtnRegistrationFormModal({
  children, 
  className, 
  onClick, 
  type='mentor'
}) {
  const open = useStateModal((state) => state.open)
  // >>> !! Прибрати коли буде готовий СРМ роут для форми учасника
  // const url = 'https://docs.google.com/forms/d/1QsjBjv90-GNkMN_fm2-Nsn0ROlx-yHiyYyou2_oyH2Q/edit'

  // const hendleClick=(type)=>{
  //   if(type==='mentor'){
  //     open(type)
  //   }else {
  //     if(isMobile){
  //       window.location.assign(url)
  //     }else window.open(url);
  //   }
  // }
// <<<!! Прибрати коли буде готовий СРМ роут для форми учасника
  return <MainButton 
    className={className}
    onClick={()=>{
      open(type) // <<<!! Розкоментувати
      //hendleClick(type)// <<<!! Прибрати 
      onClick && onClick()
    }}>
      {children}
  </MainButton>
}