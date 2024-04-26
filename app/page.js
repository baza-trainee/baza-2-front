import FeedbackCard from "./components/FeedbackCard/FeedbackCard";
import { ScrollToTopBtn } from "./components/ScrollToTopBtn/ScrollToTopBtn";

export default function Home() {
  return (
    <main>
      <ScrollToTopBtn />
      <FeedbackCard />
    </main>
  );
}
