// Sidebar.jsx
import { useEffect, useState } from "react";
import { getSidebarMenus } from "../api/sidebar";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await getSidebarMenus();
      setMenus(res.data);
    })();
  }, []);

  return (
    <div className="sidebar">
      {menus.map((menu, index) => (
        <div key={index}>
          <div
            className="menu-title"
            onClick={() => navigate(`/dashboard/${menu.path}`)}
          >
            {menu.menu}
          </div>
          {menu.submenus?.map((sub, i) => (
            <div
              className="submenu"
              key={i}
              onClick={() => navigate(`/dashboard/${menu.path}/${sub.path}`)}
            >
              {sub.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
