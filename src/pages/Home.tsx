import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChartColumn } from "lucide-react";
export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full min-h-screen bg-gray-50 pl-[22%] flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1
        className="text-5xl font-extrabold mb-2 flex items-center justify-center"
        style={{ color: "#1E1A54" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ChartColumn className="w-14 h-14 inline-block mr-2 " />
        VentaStats
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Prueba técnica para{" "}
        <span className="font-semibold" style={{ color: "#96008E" }}>
          Recu
        </span>
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/dashboard"
          className="px-6 py-4 text-white rounded-2xl shadow hover:shadow-lg transition text-lg font-medium text-center"
          style={{ backgroundColor: "#96008E" }}
        >
          Ver Resumen de Ventas
        </Link>
        <Link
          to="/ventas"
          className="px-6 py-4 text-white rounded-2xl shadow hover:shadow-lg transition text-lg font-medium text-center"
          style={{ backgroundColor: "#1E1A54" }}
        >
          Ver Ventas Detalladas
        </Link>
        <Link
          to="/estadisticas"
          className="px-6 py-4 text-white rounded-2xl shadow hover:shadow-lg transition text-lg font-medium text-center"
          style={{ backgroundColor: "#FDD32D", color: "#1E1A54" }}
        >
          Ver Estadísticas
        </Link>
      </motion.div>
    </motion.div>
  );
}
