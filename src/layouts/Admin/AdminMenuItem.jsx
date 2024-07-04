import { Link } from "react-router-dom";

export default function AdminMenuItem({ active, menuName, to }) {
  return (
    <Link to={to}>
      <h1
        className={`hover:underline hover:font-bold text-white ${
          active
            ? "underline hover:font-bold drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
            : "text-white"
        }
        }`}
      >
        {menuName}
      </h1>
    </Link>
  );
}
