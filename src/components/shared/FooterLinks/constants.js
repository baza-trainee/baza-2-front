import linkTypes from "../MainLink/constants";

export const navigationLinks = [
  { name: "main", url: "/", type: linkTypes.FOOTER },
  { name: "internship", url: "/internship", type: linkTypes.FOOTER },
  { name: "projects", url: "/projects", type: linkTypes.FOOTER },
  { name: "blog", url: "/blog", type: linkTypes.FOOTER },
];

export const helpLinks = [
  {
    name: "privacy_policy",
    url: "privacyPolicy",
    type: linkTypes.HELP,
  },
  {
    name: "site_use_policy",
    url: "termsOfUse",
    type: linkTypes.HELP,
  },
  {
    name: "regulations",
    url: "statut",
    type: linkTypes.HELP,
  },
  {
    name: "reporting",
    url: "report",
    type: linkTypes.HELP,
  },
];
