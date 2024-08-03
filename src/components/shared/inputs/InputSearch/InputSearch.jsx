"use client";

import { useEffect, useState } from "react";
import styles from "./InputSearch.module.scss";
import { Icon } from "../../Icon/Icon";
import clsx from "clsx";

const InputSearch = ({ onSubmit, className, defaultValue='' }) => {
  const [value, setValue] = useState("");
  // Очищає поле по дефолту
  useEffect(()=>{
    if(defaultValue == ''){
      setValue('')
    }
  },[defaultValue])

  const handlerClickSubmit = (e) => {
    e.preventDefault();

    if (e.target.value?.trim() === "") {
      return "error";
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
    <form className={clsx(styles.wrapper,className)} onSubmit={handlerClickSubmit}>
      <input
        type="text"
        placeholder="Введіть ключове слово "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => handlerOnblur(e)}
      />

    {value.length ? <button type="button" 
      className={styles.close} 
      onClick={()=>
      {
        onSubmit('')
        setValue('')
      }}>
        <Icon name="close_dark" width={18} height={18} />
      </button> : null
    }

      <button type="submit" className={styles.submit}>
        <Icon name="search" width={32} height={32} />
      </button>
    </form>
  );
};

export default InputSearch;
