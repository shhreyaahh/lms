import Navbar from "@/components/ui/navbar/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
}
