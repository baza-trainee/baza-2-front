"use client";

import React, { useState } from "react";
import InputField from "../InputField/InputField";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (newValue) => {
    setName(newValue);
    console.log("New value name");
  };

  const handleEmailChange = (newValue) => {
    setEmail(newValue);
    console.log("New value email");

  };

  return (
    <form>
      <InputField
        width={625}
        height={44}
        placeholder="Enter your name"
        type="name"
        minLength={3}
        maxLength={50}
        value={name}
        onChange={handleNameChange}
        required={true}
      />
      <InputField
        width={625}
        height={44}
        placeholder="Enter your email"
        type="email"
        minLength={5}
        maxLength={100}
        value={email}
        onChange={handleEmailChange}
        required={true}
      />
    </form>
  );
}
