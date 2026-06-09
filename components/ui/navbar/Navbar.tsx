import PublicNavbar from "../../../app/(public)/PublicNavbar";
import UserNavbar from "../../../app/(user)/UserNavbar";

interface NavbarProps {
  isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps) {
  return isLoggedIn ? <UserNavbar /> : <PublicNavbar />;
}
