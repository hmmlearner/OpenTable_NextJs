import AuthContext from './components/context/AuthContext';
import Header from './components/Header'
import NavBar from './components/NavBar'
import './globals.css';
import "react-datepicker/dist/react-datepicker.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main className="bg-gray-100 w-screen min-h-screen">
          <AuthContext>
          <main className="max-w-screen-2xl bg-white m-auto">
             <NavBar />
              {children} 
          </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
