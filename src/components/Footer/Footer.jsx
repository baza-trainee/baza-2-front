import React from "react";
import ContactLinks from "../shared/ContactLinks/ContactLinks";
import SocialIcons from "../shared/SocialIcons/SocialIcons";
import FooterLinks from "../shared/FooterLinks/FooterLinks";
import styles from "./Footer.module.scss";
import Logo from "../shared/Logo/Logo";
import Copyright from "../shared/Copyright/Copyright";

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
