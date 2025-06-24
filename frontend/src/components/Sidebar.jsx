import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";

import { cn } from "../lib/utils";
import { menuItems } from "../lib/constants";

export default function Sidebar({ isCollapsed, setCollapse }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation().pathname;
  if (['/login', '/signup'].includes(location)) return null; // Don't show sidebar on login/signup pages

  return (
    <>
    {/* Mobile Hamburger */}
    <div className="md:hidden fixed top-4 left-4 z-50">
      <button
        onClick={() => setIsMobileOpen(true)}
        className="text-xl text-white bg-gray-800 p-2 rounded"
      >
        <FaBars />
      </button>
    </div>

    {/* Sidebar */}
    <aside 
      className={cn("sidebar md:block", isCollapsed ? "w-20" : "w-64", isMobileOpen ? "block" : "hidden")}
    >
      <div className="md:hidden flex justify-end p-3">
        <button onClick={() => setIsMobileOpen(false)}><FaTimes /></button>
      </div>

      <nav className="mt-4 p-4 space-y-4">
        <div className="flex-center pb-8 border-b border-light-100">
          <img src="/medisvg.png" alt="Medicare SVG" onClick={() => navigate("/")} 
            className="size-9 mt-1 cursor-pointer" 
          />
          {!isCollapsed && 
            <img src="/medicare.png" alt="Medicare Logo" onClick={() => navigate("/")} className="w-46 cursor-pointer" />
          }
        </div>

        {menuItems.map(({ label, path, Icon }, i) => {
          const isLogout = label.toLocaleLowerCase() === "logout";

          const handleClick = () => {
            setIsMobileOpen(false); // Close mobile menu on click

            if (isLogout && !window.confirm("Are you sure you want to logout?")) return;

            if (isLogout) {
              localStorage.clear();
              window.location.reload();
              window.location.href = "/login";
            } else {
              navigate(path);
            }
          };

          return (
            <button
              key={i}
              className={cn("w-full flex gap-3 text-left font-medium p-3 rounded-lg hover:bg-indigo-50 transition-colors group", 
                location === path ? "bg-gradient-to-tr from-indigo-100 to-indigo-200 text-blue-800"
                : "hover:bg-indigo-50 hover:text-black text-gray-600")}
              onClick={handleClick}
            >
              <Icon className={cn(isCollapsed ? "size-8 mt-0" : "size-5 mt-0.5")} />

              {isCollapsed ? (
                <span className="absolute left-12 rounded-md px-2 py-1 ml-6 bg-indigo-100 text-blue-800 text-sm
                  invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 
                  group-hover:translate-x-0"
                >{label}</span>
              ) : (
                <span>{label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Toggle collapse button */}
      <div className="absolute bottom-4 w-full text-end">
        <button 
          title={isCollapsed ? "Show" : "Hide"}
          className="bg-gray-50 hover:bg-gray-100 hover:text-black text-gray-600 rounded-lg p-1 mr-4" 
          onClick={setCollapse}
        >
          {isCollapsed ? <LuChevronLast className="size-8" /> : <LuChevronFirst className="size-8" />}
        </button>
      </div>
    </aside>
    </>
  );
};