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
    url: "/documents/privacy_policy.pdf",
    type: linkTypes.HELP,
  },
  {
    name: "site_use_policy",
    url: "/documents/terms_of_use.pdf",
    type: linkTypes.HELP,
  },
  {
    name: "regulations",
    url: "/test",
    type: linkTypes.FOOTER,
  },
  {
    name: "reporting",
    url: "/test",
    type: linkTypes.FOOTER,
  },
];
