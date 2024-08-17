import AddProject from "@/src/components/admin-page/Projects/AddProject/AddProject";
import ProjectLayout from "@/src/components/admin-page/Projects/ProjectLayout/ProjectLayout";

export default function addProjectPage() {
  return (
  <ProjectLayout title="Додати проєкт">
    <AddProject/>
  </ProjectLayout>)
};