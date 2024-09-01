import Projects from "@/src/components/projects-page/Projects";
// metadata
const metadataProjectsPage ={
  ua:{
    title: "Проєкти",
    description : "Baza Trainee Ukraine Проєкти"
  },
  en:{
    title: "Projects",
    description : "Baza Trainee Ukraine Projects"
  }, 
  pl:{
    title: "Projektowanie",
    description : "Baza Trainee Ukraine Projektowanie"
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
