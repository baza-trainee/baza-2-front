import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";

// metadata
const metadataBlogPage ={
  ua:{
    title: "Блог",
    description : "Baza Trainee Ukraine Блог"
  },
  en:{
    title: "Blog",
    description : "Baza Trainee Ukraine Blog"
  }, 
  pl:{
    title: "Bloga",
    description : "Baza Trainee Ukraine Bloga"
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