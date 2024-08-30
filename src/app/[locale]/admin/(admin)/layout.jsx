import LayoutAdmin from "@/src/components/admin-page/LayoutAdmin/LayoutAdmin";
import WithAuthProvider from "@/src/components/providers/WithAuthProvider";

export const metadata = {
  title: "Baza Trainee 2 Admin",
  description: "Baza trainee web site Admin",
};

export default function layout( {children}) {
  return (
    <WithAuthProvider>
      <LayoutAdmin>
        {children}
      </LayoutAdmin>
    </WithAuthProvider>
  );
};