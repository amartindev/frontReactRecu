import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChartColumn, LayoutDashboard, ShoppingBag, House } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/dashboard", icon: <LayoutDashboard className="text-cyan-400 w-7 h-7" />, label: "Dashboard" },
    { path: "/ventas", icon: <ShoppingBag className="text-purple-600 w-7 h-7" />, label: "Ventas" },
    { path: "/estadisticas", icon: <ChartColumn className="text-yellow-600 w-7 h-7" />, label: "Estadísticas" },
  ];

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70, damping: 12 }}
      className="fixed z-20 left-0 top-0 h-screen w-1/5 bg-[#1E1A54] text-white flex flex-col items-left space-y-4 p-6"
    >
      <div className="flex flex-row gap-4">
        <ChartColumn className="w-8 h-8" />
        <span className="text-2xl font-bold">VentaStats</span>
      </div>

      <div className="flex flex-col gap-4 mt-10">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeOut",
            }}
          >
            <Link
              to={item.path}
              className={`flex flex-row gap-3.5 items-center cursor-pointer p-2 border-0 rounded-md
                ${currentPath === item.path ? 'bg-fuchsia-900 text-white' : 'text-gray-300 hover:bg-indigo-900 hover:text-white'}
              `}
            >
              {item.icon}
              <p>{item.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <Link
        to={"/"}
        className={`flex flex-row gap-3.5 items-center cursor-pointer p-2 border-0 rounded-md absolute bottom-0
          ${currentPath === "/" ? 'text-white font-semibold' : 'text-gray-300'}
        `}
      >
        <House className="text-green-600 w-7 h-7" />
        <p>Inicio</p>
      </Link>
    </motion.div>
  );
}
