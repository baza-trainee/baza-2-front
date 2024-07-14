import WithAuthProvider from "@/src/components/providers/WithAuthProvider";

export default function layout( {children}) {
  return (
    <WithAuthProvider>
      {children}
    </WithAuthProvider>
  );
};