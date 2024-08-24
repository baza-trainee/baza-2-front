"use client";
import styles from "./InputSearch.module.scss";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../../Icon/Icon";

const InputSearch = ({ onSubmit, className, placeholder="Введіть ключове слово"}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

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

  const pushOnEnter = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", pushOnEnter);
    return () => {
      document.body.removeEventListener("keydown", pushOnEnter);
    };
  }, [pushOnEnter]);


  return (
    <div className={clsx(styles.wrapper, className)}>
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
        type="button"
        className={styles.submit}
      >
        <Icon name="search" width={32} height={32} />
      </button>
    </div>
  );
};

export default InputSearch;
