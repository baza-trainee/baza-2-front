import FeedbackCard from "./components/FeedbackCard/FeedbackCard";
import CarouselTestSection from "./components/CarouselTestSection/CarouselTestSection"
import { ScrollToTopBtn } from "./components/ScrollToTopBtn/ScrollToTopBtn";

export default function Home() {
  return (
    <main>
      <ScrollToTopBtn />
      <FeedbackCard />
      <CarouselTestSection />
    </main>
  );
}
