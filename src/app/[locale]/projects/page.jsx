import Projects from "@/src/components/projects-page/Projects";
// metadata

const metadataProjectsPage ={ 
  ua:{ 
    title: " Baza Trainee Ukraine Проєкти - непрості і корисні продукти для соціальної сфери", 
    description : "Baza Trainee Ukraine Проєкти: Допомагаємо твоєму професійному зростанню. Понад 100 джунів уже працюють за фахом." 
  }, 
  en:{ 
    title: "Baza Trainee Ukraine Projects - complex and useful products for the social sphere", 
    description : "Baza Trainee Ukraine Projects: We help you grow professionally. More than 100 juniors are already working in their specialty." 
  }, 
  pl:{ 
    title: "Baza Trainee Ukraine Projektowanie - złożone i użyteczne produkty dla sfery społecznej ", 
    description : "Baza Trainee Ukraine Projektowanie: Pomagamy rozwijać się zawodowo. Ponad 100 juniorów już pracuje w swojej dziedzinie " 
  }, 
}

export const generateMetadata = ({ params }) => {
  return {
    title: metadataProjectsPage[params.locale].title,
    description: metadataProjectsPage[params.locale].description,
  };
};

export default function ProjectsPage() {
  return (
    <main>
      <Projects />
    </main>
  );
}
