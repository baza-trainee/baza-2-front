"use client";

import { useState, useEffect } from "react";
import InputField from "@/src/components/shared/InputField/InputField";
import styles from "./ContactsForm.module.scss";
import { Icon } from "@/src/components/shared/Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "@/src/api/contacts";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";

export default function ContactsForm() {
  const { data: contactsData } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    if (contactsData) {
      setPhone1(
        formatPhoneNumber(String(contactsData.contactsDataList?.phone1 || ""))
      );
      setPhone2(
        formatPhoneNumber(String(contactsData.contactsDataList?.phone2 || ""))
      );
      setEmail(contactsData.contactsDataList?.email || "");
      setTelegram(contactsData.socialsMediaList?.telegram || "");
      setFacebook(contactsData.socialsMediaList?.facebook || "");
      setLinkedin(contactsData.socialsMediaList?.linkedin || "");
    }
  }, [contactsData]);

  const handlePhone1Change = (e) => {
    setPhone1(formatPhoneNumber(e.target.value));
  };

  const handlePhone2Change = (e) => {
    setPhone2(formatPhoneNumber(e.target.value));
  };

  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <div className={styles.input}>
          <InputField
            id="phone1"
            required={false}
            type="textArea"
            placeholder="Введіть телефон"
            version="input_admin"
            label="Телефон"
            value={phone1}
            onChange={handlePhone1Change}
          />
        </div>
        <div className={styles.input}>
          <InputField
            id="phone2"
            required={false}
            type="textArea"
            placeholder="Введіть телефон"
            version="input_admin"
            label="Телефон"
            value={phone2}
            onChange={handlePhone2Change}
          />
        </div>
        <div className={styles.input}>
          <InputField
            id="email"
            required={false}
            type="textArea"
            placeholder="Введіть електронну пошту"
            version="input_admin"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.input}>
          <InputField
            id="telegram"
            required={false}
            type="textArea"
            placeholder="Додайте посилання"
            version="input_admin"
            label="Telegram"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <InputField
            id="facebook"
            required={false}
            type="textArea"
            placeholder="Додайте посилання"
            version="input_admin"
            label="Facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <InputField
            id="linkedin"
            required={false}
            type="textArea"
            placeholder="Додайте посилання"
            version="input_admin"
            label="Linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <Icon width={24} height={24} name="edit_black" />
        </div>
      </div>
    </div>
  );
}
