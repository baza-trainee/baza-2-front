"use client";

//import { useTranslations } from "next-intl";
import MainButton from "../shared/MainButton/MainButton";
import useStateModal from "@/src/state/useStateModal";

export default function ControlButton({children}) {
  //const t = useTranslations("Main.mentor_section");
  const open = useStateModal((state) => state.open)
  return <MainButton onClick={open}>{children}</MainButton>
}