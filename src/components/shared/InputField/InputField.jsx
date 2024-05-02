"use client"

import { useState } from "react";
import CustomInput from "./CustomInput";

export default function Form() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return(
    <div>
      <CustomInput
        width={100}
        onChange={setName}
        height={20}
        placeholder="Імʼя"
        type="name"
        required={true}
        minLength={2}
        maxLength={5}
        value={name}

      />
       <CustomInput
        width={200}
        onChange={setEmail}
        height={30}
        placeholder="email@gmail.com"
        type="email"
        required={true}
        minLength={2}
        maxLength={30}
        value={email}
      />
    </div>
  )
}