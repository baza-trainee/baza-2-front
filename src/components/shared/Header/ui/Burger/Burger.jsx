"use client";

import { useState } from "react";
import BurgerButton from "./BurgerButton/BurgerButton";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const Burger = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <BurgerButton setMenuOpened={setMenuOpened} menuOpened={menuOpened} />
      <BurgerMenu menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
    </>
  );
};

export default Burger;
