import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";

// metadata
const metadataBlogPage ={ 
  ua:{ 
    title: "Блог: тільки корисне і цікаве про розробку і практику", 
    description : "Baza Trainee Ukraine Блог: Підпишись на останні новини про старт проєктів і не пропусти унікальну можливість долучитись" 
  }, 
  en:{ 
    title: "Baza Trainee Ukraine Blog: only useful and fresh themes about development and practice", 
    description : "Baza Trainee Ukraine Blog: Sign up to receive the latest news about the projects launch and don't miss this unique opportunity to get involved " 
  }, 
  pl:{ 
    title: "Baza Trainee Ukraine Blog: tylko i wyłącznie przydatne informacje na temat rozwoju i praktyki", 
    description : "Baza Trainee Ukraine Blog: Zapisz się, aby otrzymywać najnowsze informacje o start projektu i nie przegap tej wyjątkowej okazji, aby się zaangażować" 
  }, 
}

export const generateMetadata = ({ params }) => {
  return {
    title: metadataBlogPage[params.locale].title,
    description: metadataBlogPage[params.locale].description,
  };
};

export default function layoutBlog( {children}) {
  return (
    <main>
      <HiddenTtitlePage namePage={'blog'}/>
      {children}
    </main>
  );
};