"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./InputSearch.module.scss";
import { Icon } from "../../Icon/Icon";
import clsx from "clsx";

const InputSearch = ({ onSubmit, className, defaultValue = "" ,placeholder="Введіть ключове слово"}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  // Очищає поле по дефолту
  // useEffect(() => {
  //   if (defaultValue == "") {
  //     setValue("");
  //   }
  // }, [defaultValue]);

  const handleSearch = () => {
    if (value.trim() === "") {
      return;
    }
    onSubmit(value);
  };
  // Робить запит як що користувач очистив поле
  const handlerOnblur = (e) => {
    e.preventDefault();
    if (e.target.value?.trim() === "") {
      onSubmit(value);
    }
  };

  return (
    <form className={clsx(styles.wrapper, className)}>
      <input
        ref={inputRef}
        type="text"
        maxLength={300}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => handlerOnblur(e)}
      />

      <button
        type="button"
        className={clsx(styles.close, value.length > 0 && styles.show)}
        onClick={() => {
          setValue("");
          inputRef.current.focus();
        }}
      >
        <Icon name="close_dark" width={18} height={18} />
      </button>

      <button
        onClick={handleSearch}
        // disabled={isSearchBtnDisabled}
        type="button"
        className={styles.submit}
      >
        <Icon name="search" width={32} height={32} />
      </button>
    </form>
  );
};

export default InputSearch;
