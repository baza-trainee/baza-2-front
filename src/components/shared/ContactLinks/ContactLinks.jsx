"use client";
import styles from "./ContactLinks.module.scss";
import { Icon } from "../Icon/Icon";
import { getContacts } from "@/src/api/contacts";
import { useQuery } from "@tanstack/react-query";

const ContactLinks = () => {
  const { data: contactsData } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }
    return phoneNumber;
  };

  return (
    <div className={styles.contacts}>
      {contactsData && (
        <>
          <div className={styles.contact}>
            <Icon name="phone" width={25} height={29} />
            <p className={styles.text}>
              {formatPhoneNumber(contactsData.contactsDataList.phone1)}
            </p>
          </div>
          <div className={styles.contact}>
            <Icon name="phone" width={25} height={29} />
            <p className={styles.text}>
              {formatPhoneNumber(contactsData.contactsDataList.phone2)}
            </p>
          </div>
          <div className={styles.contact}>
            <Icon name="mail" width={25} height={29} className={styles.mail} />
            <p className={styles.text}>{contactsData.contactsDataList.email}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactLinks;
