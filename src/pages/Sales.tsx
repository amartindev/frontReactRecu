import { useEffect, useState } from "react";
import { FormattedNumber } from "react-intl";
import { motion } from "framer-motion";

type Sale = {
  id: string;
  quantity: number;
  date: string;
  product: {
    name: string;
    price: number;
  };
};

export default function Dashboard() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await fetch("https://backrecupython.onrender.com/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            {
              allSales {
                id
                quantity
                date
                product {
                  name
                  price
                }
              }
            }
          `,
        }),
      });
      const { data } = await res.json();
      setSales(data.allSales ?? []);
      setLoading(false);
    };
    fetchSales();
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <motion.div initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }} className='w-full h-full bg-gray-50 text-cyan-950 pl-[22%]'>
      <h1 className='text-2xl font-bold mb-4 pl-4 pt-4'>Tabla de Ventas</h1>
      <h2 className='text-xl font-light mb-6 p-4'>
        Listado completo de productos vendidos y cantidad de veces vendidos
      </h2>
      <div className='overflow-x-auto pr-4'>
        <div className='rounded-lg shadow-sm overflow-hidden border border-gray-200'>
          <table className='min-w-full'>
            <thead className='bg-gray-100 text-left text-gray-700 text-sm'>
              <tr>
                <th className='px-6 py-3'>Producto</th>
                <th className='px-6 py-3'>Cantidad</th>
                <th className='px-6 py-3'>Fecha</th>
                <th className='px-6 py-3'>Precio Unitario</th>
                <th className='px-6 py-3'>Total</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 text-sm text-gray-800'>
              {sales.map((s) => {
                const total = s.quantity * s.product.price;
                const fecha = new Date(s.date).toLocaleDateString("es-ES");
                const price = Number(s.product.price);

                return (
                  <tr key={s.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4'>{s.product.name}</td>
                    <td className='px-6 py-4'>{s.quantity}</td>
                    <td className='px-6 py-4'>{fecha}</td>
                    <td className='px-6 py-4'>
                      <FormattedNumber
                        value={price}
                        style='currency'
                        currency='EUR'
                        currencyDisplay='code'
                      />
                    </td>
                    <td className='px-6 py-4'>
                      <FormattedNumber
                        value={total}
                        style='currency'
                        currency='EUR'
                        currencyDisplay='code'
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
