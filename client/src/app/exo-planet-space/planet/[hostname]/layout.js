// app/planet/[hostname]/layout.js
import { Inter } from "next/font/google";
import "@/app/globals.css";
import resultJson from "@/data/result"; // Importing from result.js

const inter = Inter({ subsets: ["latin"] });

export function generateMetadata({ params }) {
  const hostKey = params.hostname;  // Get the hostname parameter
  const planetData = resultJson.find(item => item.hostname === hostKey); // Find planet data

  if (planetData) {
    return {
      title: `Planet Data - ${planetData.pl_name}`, // Dynamic title
      description: `Detailed information about ${planetData.pl_name}.`, // Dynamic description
    };
  } else {
    return {
      title: "Planet Data - Not Found", // Fallback title
      description: "No data available for this planet.", // Fallback description
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
