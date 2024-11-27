import Navbar from "@/components/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
