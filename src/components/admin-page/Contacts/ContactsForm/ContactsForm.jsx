"use client";

import { useState, useEffect } from "react";
import styles from "./ContactsForm.module.scss";
import { Icon } from "@/src/components/shared/Icon/Icon";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getContacts, updateContacts } from "@/src/api/contacts";
import { formatPhoneNumber } from "@/src/lib/utils/formatPhoneNumber";
import InputField from "@/src/components/shared/inputs/InputField/InputField";
import MainButton from "@/src/components/shared/MainButton/MainButton";

export default function ContactsForm({ onSuccess, onPending }) {
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

  const [originalPhone1, setOriginalPhone1] = useState("");
  const [originalPhone2, setOriginalPhone2] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalTelegram, setOriginalTelegram] = useState("");
  const [originalFacebook, setOriginalFacebook] = useState("");
  const [originalLinkedin, setOriginalLinkedin] = useState("");

  const mutation = useMutation({
    mutationFn: updateContacts,
    onSuccess: (data) => {
      setOriginalPhone1(phone1);
      setOriginalPhone2(phone2);
      setOriginalEmail(email);
      setOriginalTelegram(telegram);
      setOriginalFacebook(facebook);
      setOriginalLinkedin(linkedin);

      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      console.error("Помилка при оновлені даних", error.message);
      if (onPending) onPending();
    },
  });

  useEffect(() => {
    if (contactsData) {
      const phone1Value = formatPhoneNumber(
        String(contactsData.contactsDataList?.phone1 || "")
      );
      const phone2Value = formatPhoneNumber(
        String(contactsData.contactsDataList?.phone2 || "")
      );

      setPhone1(phone1Value);
      setPhone2(phone2Value);
      setEmail(contactsData.contactsDataList?.email || "");
      setTelegram(contactsData.socialsMediaList?.telegram || "");
      setFacebook(contactsData.socialsMediaList?.facebook || "");
      setLinkedin(contactsData.socialsMediaList?.linkedin || "");

      setOriginalPhone1(phone1Value);
      setOriginalPhone2(phone2Value);
      setOriginalEmail(contactsData.contactsDataList?.email || "");
      setOriginalTelegram(contactsData.socialsMediaList?.telegram || "");
      setOriginalFacebook(contactsData.socialsMediaList?.facebook || "");
      setOriginalLinkedin(contactsData.socialsMediaList?.linkedin || "");
    }
  }, [contactsData]);

  const handlePhone1Change = (e) => {
    setPhone1(formatPhoneNumber(e.target.value));
  };

  const handlePhone2Change = (e) => {
    setPhone2(formatPhoneNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedContacts = {
      contactsDataList: {
        phone1: formatPhoneNumber(phone1, true),
        phone2: formatPhoneNumber(phone2, true),
        email: email,
      },
      socialsMediaList: {
        telegram: telegram,
        facebook: facebook,
        linkedin: linkedin,
      },
    };

    if (onPending) onPending();
    mutation.mutate(updatedContacts);
  };

  const isDisabled = () => {
    return (
      phone1 === originalPhone1 &&
      phone2 === originalPhone2 &&
      email === originalEmail &&
      telegram === originalTelegram &&
      facebook === originalFacebook &&
      linkedin === originalLinkedin
    );
  };

  const reset = () => {
    setPhone1(originalPhone1);
    setPhone2(originalPhone2);
    setEmail(originalEmail);
    setTelegram(originalTelegram);
    setFacebook(originalFacebook);
    setLinkedin(originalLinkedin);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
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
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
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
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
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
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
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
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
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
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
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
            <Icon
              width={24}
              height={24}
              name="edit_black"
              className={styles.icon}
            />
          </div>
        </div>
        <div className={styles.btns}>
          <MainButton type="submit" disabled={isDisabled()}>
            {"Зберегти зміни"}
          </MainButton>

          <MainButton
            variant="admin"
            className={styles.btn_cancel}
            onClick={reset}
          >
            {"Скасувати"}
          </MainButton>
        </div>
      </form>
    </>
  );
}
