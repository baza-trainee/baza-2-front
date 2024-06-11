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
    url: "/test",
    type: linkTypes.HELP,
    openInNewTab: true,
  },
  {
    name: "site_use_policy",
    url: "/test",
    type: linkTypes.HELP,
    openInNewTab: true,
  },
  {
    name: "regulations",
    url: "/test",
    type: linkTypes.FOOTER,
    openInNewTab: true,
  },
  {
    name: "reporting",
    url: "/test",
    type: linkTypes.FOOTER,
    openInNewTab: true,
  },
];
