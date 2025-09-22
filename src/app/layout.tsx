import "./globals.css";
import languageData from "./data/languagedata";
import CardNav from "./components/CardNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="">
        <nav className="p-5 bg-orange-200">
          <CardNav
            logo=""
            logoAlt="Tech Libraries"
            items={[]}
            languageData={languageData}
            baseColor="#1f2937"
            menuColor="#fff"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
          />
        </nav>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
