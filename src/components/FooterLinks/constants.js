import linkTypes from "../shared/MainLink/constants";

export const navigationLinks = [
  { name: "Головна", url: "/" },
  { name: "Стажування", url: "/internship" },
  { name: "Проєкти", url: "/projects" },
  { name: "Блог", url: "/blog" },
];

export const helpLinks = [
  { name: "Політика конфіденційності", url: "/", type: linkTypes.HELP },
  { name: "Правила користування сайтом", url: "/", type: linkTypes.HELP },
  { name: "Статут", url: "/", type: linkTypes.DEFAULT },
  { name: "Звітність", url: "/", type: linkTypes.DEFAULT },
];
