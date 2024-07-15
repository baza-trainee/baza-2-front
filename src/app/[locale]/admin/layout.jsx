import LayoutAdmin from "@/src/components/admin-page/LayoutAdmin/LayoutAdmin";
import WithAuthProvider from "@/src/components/providers/WithAuthProvider";

export default function layout( {children}) {
  return (
    <WithAuthProvider>
      <LayoutAdmin>
        {children}
      </LayoutAdmin>
    </WithAuthProvider>
  );
};