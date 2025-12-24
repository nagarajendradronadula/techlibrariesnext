import "./globals.css";
import languageData from "./data/languagedata";
import ClientLayout from "./components/ClientLayout";
import Script from "next/script";

export const metadata = {
  title: "Tech Libraries - Programming Language Resources",
  description: "Explore comprehensive programming language libraries and documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "uqmlnqklbu");
            `,
          }}
        />
      </head>
      <body className="bg-white">
        <ClientLayout languageData={languageData}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
