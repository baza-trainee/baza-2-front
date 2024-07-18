import clsx from "clsx";
import { useTranslations } from "next-intl";
import styles from "./ProjectStatus.module.scss";

const ProjectStatus = ({ creationDate, launchDate, isTeamRequired }) => {
  const t = useTranslations("Projects.card");

  const getStatusInfo = () => {
    if (launchDate && launchDate > creationDate) {
      return {
        style: styles.done,
        text: t("status.done"),
      };
    } else if (isTeamRequired) {
      return {
        style: styles.teamFormation,
        text: t("status.team_formation"),
      };
    } else {
      return {
        style: styles.development,
        text: t("status.in_progress"),
      };
    }
  };

  const { style, text } = getStatusInfo();

  return <span className={clsx(styles.status, style)}>{text}</span>;
};

export default ProjectStatus;
