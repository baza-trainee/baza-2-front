'use client'
import { usePathname } from "@/src/navigation";
import CookiesModal from "../modals/CookiesModal/CookiesModal";
import ModalDocumentPdf from "../modals/ModalDocumentPdf/ModalDocumentPdf";
import PaymentModal from "../modals/PaymentModal/PaymentModal";
import Footer from "../shared/Footer/Footer";
import Header from "../shared/Header/Header";
import ScrollToTopBtn from "../shared/ScrollToTopBtn/ScrollToTopBtn";
import UseAlert from "../shared/UseAlert/UseAlert";

export default function LayoutProvider({children}) {
  const pathname = usePathname()

  const isAdminPage =
    pathname.split('/').includes('admin') ||
    pathname.split('/').includes('login');

  return (
    <div className = "wrapper">
      {isAdminPage ?
        <>
          {children}
          <UseAlert/>
        </>:
        <>
          <Header />
          {children}
          <Footer />
          
          <PaymentModal />
          <CookiesModal />
          <ScrollToTopBtn />
          <UseAlert/>
          <ModalDocumentPdf/>
        </>
      }
    </div>
  )
}