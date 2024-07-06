import clsx from "clsx";
import { Icon } from "../Icon/Icon";
import styles from "./SocialIcons.module.scss";
import { useEffect, useState } from "react";
import { getContacts } from "@/src/api/contacts";

const SocialIcons = ({ classNameCustom }) => {
  const [socialMediaData, setSocialMediaData] = useState(null);
  useEffect(() => {
    getContacts()
      .then((data) => {
        setSocialMediaData(data);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error.message);
      });
  }, []);

  return (
    <div className={clsx(styles.list, classNameCustom)}>
      {socialMediaData && (
        <>
          <a
            href={socialMediaData.socialsMediaList.linkedin}
            target="_blank"
            className={styles.link}
          >
            <Icon
              name="linkedin"
              width={48}
              height={48}
              className={styles.icon}
            />
          </a>
          <a href={socialMediaData.socialsMediaList.facebook} target="_blank">
            <Icon
              name="facebook"
              width={48}
              height={48}
              className={styles.icon}
            />
          </a>
          <a href={socialMediaData.socialsMediaList.telegram} target="_blank">
            <Icon
              name="telegram"
              width={48}
              height={48}
              className={styles.icon}
            />
          </a>
        </>
      )}
    </div>
  );
};

export default SocialIcons;
