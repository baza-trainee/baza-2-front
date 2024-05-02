import { PageNotFound } from "@/src/components/PageNotFound/PageNotFound";

export default function NotFound() {
  return (
    <PageNotFound
      text="Вибачте, сторінка, яку ви шукаєте, переміщена або видалена."
      textErrBtn="Повернутись на головну"
    />
  );
}
