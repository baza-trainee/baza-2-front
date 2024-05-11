import React from "react";
import ContactLinks from "../ContactLinks/ContactLinks";
import SocialIcons from "../SocialIcons/SocialIcons";
import FooterLinks from "../FooterLinks/FooterLinks";
import styles from "./Footer.module.scss";
import Logo from "../Logo/Logo";
import Copyright from "../Copyright/Copyright";

const Footer = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.footer}>
          <Logo variant="footer" className={styles.logo} />
          <FooterLinks />
          <div className={styles.contacts}>
            <ContactLinks />
            <SocialIcons />
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Footer;
