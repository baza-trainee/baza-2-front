import React from "react";
import ContactLinks from "../shared/ContactLinks/ContactLinks";
import SocialIcons from "../shared/SocialIcons/SocialIcons";
import FooterLinks from "../shared/FooterLinks/FooterLinks";
import styles from "./Footer.module.scss";
import Logo from "../shared/Logo/Logo";
import Copyright from "../shared/Copyright/Copyright";
import HelpLinks from "../shared/FooterLinks/HelpLinks";

const Footer = () => {
  return (
    <>
      <footer className={styles.section}>
        <div className={`${styles.block} ${styles.bigScreen}`}>
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
        <div className={styles.smallScreen}>
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
