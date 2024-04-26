import NavLinks from "./components/NavLinks/NavLinks";
import "./styles/global.scss";

export const metadata = {
	title: "Baza trainee 2",
	description: "Baza trainee web site",
};

export default function RootLayout({ children }) {
	return (
		<html lang="ua">
			<body>
				<div className="wrapper">
          <NavLinks />
					{children}
				</div>
			</body>
		</html>
	);
}