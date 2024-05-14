"use client";
import Image from "next/image";
import styles from "./ContactLinks.module.scss";
import { Icon } from "../Icon/Icon";

const ContactLinks = () => {
  return (
    <div className={styles.contacts}>
      <div className={styles.contact}>
        <Icon name="phone" width={25} height={29} />
        <p className={styles.text}>+380 63 628 66 30</p>
      </div>
      <div className={styles.contact}>
        <Icon name="phone" width={25} height={29} />
        <p className={styles.text}>+380 67 568 1788</p>
      </div>
      <div className={styles.contact}>
        <Icon name="mail" width={25} height={29} />
        <p className={styles.text}>info@‌baza-trainee.tech</p>
      </div>
    </div>
  );
};

export default ContactLinks;
