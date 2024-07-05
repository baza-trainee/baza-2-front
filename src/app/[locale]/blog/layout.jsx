import SorryModal from "@/src/components/modals/SorryModal/SorryModal";

export default function layout( {children}) {
  return (
    <main>
      {children}
      <SorryModal/>
    </main>
  );
};