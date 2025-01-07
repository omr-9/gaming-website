import GridContainer from "../componants/defaults/GridContainer";
import Navbar from "../componants/nav/Navbar";
import Sidebar from "../componants/nav/Sidebar";
import { WishlistProvider } from "../context/wishlistContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WishlistProvider>
      <main className="background grid min-h-screen h-full">
        <GridContainer cols={1} className={`md:grid-cols-10 lg:grid-cols-12`}>
          <Sidebar />
          <div className="md:col-span-9 lg:col-span-10 py-5 md:py-7 px-5 md:px-10 lg:px-20 w-full">
            <Navbar />
            {children}
          </div>
        </GridContainer>
      </main>
    </WishlistProvider>
  );
}
