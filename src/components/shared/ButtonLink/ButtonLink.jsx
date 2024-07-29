"use client";
import { useRouter } from "@/src/navigation";
import MainButton from "../MainButton/MainButton";

export default function ButtonLink({url='/', onClick=()=>{}, className,children, variant }) {
  const router = useRouter();

  const handleClick=()=>{
    router.push(url)
    onClick()
  }
  return <MainButton 
    onClick={handleClick} 
    className={className} 
    children={children}
    variant={variant}
    />
}