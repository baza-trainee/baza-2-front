import SorryModal from "@/src/components/modals/SorryModal/SorryModal";
import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";

export default function layout( {children}) {
  return (
    <main>
      <HiddenTtitlePage namePage={'blog'}/>
      {children}
      <SorryModal/>
    </main>
  );
};