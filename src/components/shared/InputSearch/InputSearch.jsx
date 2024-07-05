"use client";

import { useState } from "react";
import styles from "./InputSearch.module.scss";
import { Icon } from "../Icon/Icon";

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
      <button type="submit">
        <Icon name="search" width={32} height={32} />
      </button>
    </form>
  );
};

export default InputSearch;
