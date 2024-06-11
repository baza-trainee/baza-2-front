import AdvantagesSection from "@/src/components/AdvantagesSection/AdvantagesSection";
import JoinProjectSection from "@/src/components/JoinProjectSection/JoinProjectSection";
export default function Internship() {
  // !! Замінити  <div> на готові компоненти !!

  return (
    <main style={{ marginTop: "120px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2>Секція: Запрошуємо до участі</h2>
      </div>
      <JoinProjectSection style={{ marginBottom: "20px" }} />
      {/* <h2>Секція: Як долучитись до проєкту</h2> */}
      <div style={{ marginBottom: "120px" }}>
        <AdvantagesSection />
      </div>
    </main>
  );
}
