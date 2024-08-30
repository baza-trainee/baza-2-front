import HiddenTtitlePage from "@/src/components/shared/HiddenTtitlePage/HiddenTtitlePage";

export default function layoutBlog( {children}) {
  return (
    <main>
      <HiddenTtitlePage namePage={'blog'}/>
      {children}
    </main>
  );
};