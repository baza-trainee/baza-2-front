import "./styles/global.scss";
import { Open_Sans, Montserrat } from "next/font/google";

const OpenSansFont = Open_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});
const MontserratFont = Montserrat({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Baza trainee 2",
  description: "Baza trainee web site",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ua"
      className={`${OpenSansFont.className} ${MontserratFont.className}`}
    >
      <body>{children}</body>
    </html>
  );
}
