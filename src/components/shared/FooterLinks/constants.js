import linkTypes from "../MainLink/constants";

export const navigationLinks = [
  { name: "Головна", url: "/", type: linkTypes.FOOTER },
  { name: "Стажування", url: "/internship", type: linkTypes.FOOTER },
  { name: "Проєкти", url: "/projects", type: linkTypes.FOOTER },
  { name: "Блог", url: "/blog", type: linkTypes.FOOTER },
];

export const helpLinks = [
  { name: "Політика конфіденційності", url: "/", type: linkTypes.HELP },
  { name: "Правила користування сайтом", url: "/", type: linkTypes.HELP },
  { name: "Статут", url: "/", type: linkTypes.FOOTER },
  { name: "Звітність", url: "/", type: linkTypes.FOOTER },
];
