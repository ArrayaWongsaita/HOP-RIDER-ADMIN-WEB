import { useState } from "react";
import { Link } from "react-router-dom";

const dropdownItems = [
  { id: 1, title: "Profile Setting", path: "" },
  { id: 2, title: "Chat", path: "/admin/chat" },
];

export default function Dropdown() {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div>
      <ul onClick={() => setDropdown(!dropdown)}>
        {dropdownItems.map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.path} onClick={() => setDropdown(false)}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
