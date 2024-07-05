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

  return (
    <div className="wrapper">
      {pathname==='/admin'|| pathname==='/login'?
        <>
          {children}
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