import LayoutAdmin from "@/src/components/admin-page/LayoutAdmin/LayoutAdmin";
import WithAuthProvider from "@/src/components/providers/WithAuthProvider";

export const metadata = {
  title: "Baza Trainee Ukraine Admin",
  description: "Baza Trainee Ukraine Admin page",
};

export default function layout({children}) {
  return (
    <WithAuthProvider>
      <LayoutAdmin>
        {children}
      </LayoutAdmin>
    </WithAuthProvider>
  );
};