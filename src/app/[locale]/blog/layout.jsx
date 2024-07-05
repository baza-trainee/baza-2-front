import SorryModal from "@/src/components/modals/SorryModal/SorryModal";

export default function layout( {children}) {
  return (
    <main className="container" style={{marginTop:'120px'}}>
      {children}
      <SorryModal/>
    </main>
  );
};