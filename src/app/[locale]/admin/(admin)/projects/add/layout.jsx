import AddProjectLayout from "@/src/components/admin-page/Projects/AddProjectLayout/AddProjectLayout";

export default function addProjectLayout({children}) {
  return (
  <AddProjectLayout title="Додати проєкт">
    {children}
  </AddProjectLayout>)
};