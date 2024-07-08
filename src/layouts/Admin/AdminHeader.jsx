import { IconLogoHop } from "../../icons/IconLogoHop";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { IconMenu } from "../../icons/IconMenu";
import { LogoHopForNav } from "../../icons/IconLogoHopForNav";

export default function AdminHeader() {
  return (
    <header className="flex justify-between items-center shadow-md px-4 bg-none max-h-[50px]">
      <div>
        <Link to="/admin">
          <LogoHopForNav width="50" />
        </Link>
      </div>
      <div>
        <AdminMenu />
      </div>
      <div>
        <IconMenu />
      </div>
    </header>
  );
}
