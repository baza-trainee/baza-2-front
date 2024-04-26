import { ScrollToTopBtn } from "./components/ScrollToTopBtn/ScrollToTopBtn";
import History from "./components/History/History";
import StructureCard from "./components/StructureCard/StructureCard";

export default function Home() {
  return (
    <main>
      <ScrollToTopBtn />
      <History></History>
      <StructureCard></StructureCard>
    </main>
  );
}
