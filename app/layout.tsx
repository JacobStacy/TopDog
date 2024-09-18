import type { Metadata } from "next";

import "./globals.scss";

import { dbConnect } from "@/utils/mongo";


export const metadata: Metadata = {
  title: "Top Dog",
  description: "Who's the top dog?",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const conn = await dbConnect();
  console.log(conn);

  return (
    <html lang="en">
        <body>
          <div className="supported">
            {children}
          </div>
          <div className="not_supported">
            This screen size is not supported.
          </div>
        </body>
    </html>
  );
}
