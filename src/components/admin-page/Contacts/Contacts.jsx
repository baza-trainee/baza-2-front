import SectionAdmin from "../SectionAdmin/SectionAdmin";
import ContactsForm from "./ContactsForm/ContactsForm";

export default function Contacts() {
  return (
    <SectionAdmin title={"Контакти"}>
      <ContactsForm />
    </SectionAdmin>
  );
}
