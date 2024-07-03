import { IconLogoHop } from "../../icons/IconLogoHop";
import { Link } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { IconMenu } from "../../icons/IconMenu";

export default function AdminHeader() {
  return (
    <header className="flex justify-between items-center shadow-md px-4 bg-none">
      <div>
        <Link to="/admin">
          <IconLogoHop />
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
