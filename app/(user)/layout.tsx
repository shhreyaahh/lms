import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/ui/navbar/Navbar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  return (
    <>
      <Navbar isLoggedIn />
      <main>{children}</main>
    </>
  );
}
