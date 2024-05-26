import React from "react";
import ContactLinks from "../ContactLinks/ContactLinks";
import SocialIcons from "../SocialIcons/SocialIcons";
import FooterLinks from "../FooterLinks/FooterLinks";
import styles from "./Footer.module.scss";
import Logo from "../Logo/Logo";
import Copyright from "../Copyright/Copyright";
import HelpLinks from "../FooterLinks/HelpLinks";

const Footer = () => {
  return (
    <>
      <footer className={styles.section}>
        <div className={`${styles.block} ${styles.hideOnSmallScreen}`}>
          <div className={styles.footer}>
            <Logo variant="footer" className={styles.logo} />
            <FooterLinks />
            <HelpLinks />
            <div className={styles.contacts}>
              <ContactLinks />
              <SocialIcons />
            </div>
          </div>
        </div>
        <div className={styles.showOnSmallScreen}>
          <Logo variant="footer" className={styles.centerItem} />
          <FooterLinks />
          <HelpLinks />
          <ContactLinks />
          <SocialIcons className={styles.centerItem} />
        </div>
        <Copyright />
      </footer>
    </>
  );
};

export default Footer;
