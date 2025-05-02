import { useEffect, useState } from "react";
import { FormattedNumber } from "react-intl";
import { motion } from "framer-motion";
import { ShoppingCart, Calculator, ChartColumn, Package } from "lucide-react";

type SaleByProduct = {
  productName: string;
  totalQuantity: number;
  price: number;
  totalSalesValue: number;
};

export default function Dashboard() {
  const [salesByProduct, setSalesByProduct] = useState<SaleByProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculando las métricas
  const totalVentas = salesByProduct.reduce((sum, sale) => sum + sale.totalSalesValue, 0);
  const cantidades = salesByProduct.map((sale) => sale.totalQuantity);
  const media =
    cantidades.length > 0
      ? cantidades.reduce((sum, quantity) => sum + quantity, 0) / cantidades.length
      : 0;
  const mediana =
    cantidades.length > 0 ? cantidades.sort((a, b) => a - b)[Math.floor(cantidades.length / 2)] : 0;
  const moda = (() => {
    const freq: Record<number, number> = {};
    cantidades.forEach((n) => (freq[n] = (freq[n] || 0) + 1));
    let maxCount = 0,
      modeValue = 0;
    for (const n in freq) {
      if (freq[n] > maxCount) {
        maxCount = freq[n];
        modeValue = Number(n);
      }
    }
    return modeValue;
  })();

  useEffect(() => {
    const fetchSales = async () => {
      const res = await fetch("https://backrecupython.onrender.com/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          {
            salesByProductSummary {
              productName
              totalQuantity
              price
              totalSalesValue
            }
          }
        `,
        }),
      });
      const { data } = await res.json();
      setSalesByProduct(data.salesByProductSummary);
      setLoading(false);
    };
    fetchSales();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-full bg-gray-50 text-cyan-950 pl-[22%]"
    >
      <h1 className="text-2xl font-bold mb-4 pl-4 pt-4">Dashboard</h1>

      <div className="grid grid-cols-4 gap-9 mb-6 p-4">
        <motion.div
          className="p-4 rounded-3xl bg-gray-100 shadow hover:shadow-lg hover:bg-gray-200 transition-shadow duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex justify-between text-sm text-gray-500 pb-4">
            <p>Total de Ventas</p>
            <ShoppingCart />
          </div>
          <div className="text-xl font-semibold text-center">
            <FormattedNumber value={totalVentas} style="currency" currency="EUR" currencyDisplay="code" />
          </div>
        </motion.div>

        <motion.div
          className="p-4 rounded-3xl bg-gray-100 shadow hover:shadow-lg hover:bg-gray-200 transition-shadow duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="flex justify-between text-sm text-gray-500 pb-4">
            <p>Media</p> <Calculator />
          </div>
          <div className="text-xl font-semibold text-center">{media.toFixed(2)}</div>
        </motion.div>

        <motion.div
          className="p-4 rounded-3xl bg-gray-100 shadow hover:shadow-lg hover:bg-gray-200 transition-shadow duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex justify-between text-sm text-gray-500 pb-4">
            <p>Mediana</p>
            <ChartColumn />
          </div>
          <div className="text-xl font-semibold text-center">{mediana}</div>
        </motion.div>

        <motion.div
          className="p-4 rounded-3xl bg-gray-100 shadow hover:shadow-lg hover:bg-gray-200 transition-shadow duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <div className="flex justify-between text-sm text-gray-500 pb-4">
            <p>Moda</p>
            <Package />
          </div>
          <div className="text-xl font-semibold text-center">{moda}</div>
        </motion.div>
      </div>

      <h2 className="text-xl font-bold mb-2 pl-4">Resumen de Ventas</h2>

      <div className="overflow-x-auto p-4">
        <div className="rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left text-gray-700 text-sm">
              <tr>
                <th className="px-6 py-3">Producto</th>
                <th className="px-6 py-3">Cantidad Total</th>
                <th className="px-6 py-3">Precio Unitario</th>
                <th className="px-6 py-3">Ventas Totales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {salesByProduct.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">{item.productName}</td>
                  <td className="px-6 py-4">{item.totalQuantity}</td>
                  <td className="px-6 py-4">
                    {typeof item.price === "number" ? (
                      <FormattedNumber value={item.price} style="currency" currency="EUR" currencyDisplay="code" />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {typeof item.totalSalesValue === "number" ? (
                      <FormattedNumber
                        value={item.totalSalesValue}
                        style="currency"
                        currency="EUR"
                        currencyDisplay="code"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
