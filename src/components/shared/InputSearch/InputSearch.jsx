"use client";

import { useState } from "react";
import styles from "./InputSearch.module.scss";

const InputSearch = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handlerClickSubmit = (e) => {
    e.preventDefault();

    if (e.target.value?.trim() === "") {
      return "error";
    }
    onSubmit(value);
  };

  return (
    <form className={styles.wrapper} onSubmit={handlerClickSubmit}>
      <input
        type="text"
        placeholder="Введіть ключове слово "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default InputSearch;
