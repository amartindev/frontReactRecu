import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
  ChartDataset,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type SalesByProduct = {
  productName: string;
  totalQuantity: number;
  price: number;
  totalSalesValue: number;
};

type SalesByMonth = {
  month: string;
  totalSales: number;
};

// Extiende el tipo ChartDataset para permitir la propiedad customData
type CustomChartDataset = ChartDataset<"bar", number[]> & {
  customData: { price: number; totalSalesValue: number }[];
};

export default function Statistics() {
  const [salesByProduct, setSalesByProduct] = useState<SalesByProduct[]>([]);
  const [salesByMonth, setSalesByMonth] = useState<SalesByMonth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("http://localhost:8000/graphql/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            salesByProductSummary {
              productName
              totalQuantity
              price
              totalSalesValue
            }
            salesByMonth {
              month
              totalSales
            }
          }`,
        }),
      });
      const { data } = await res.json();
      setSalesByProduct(data.salesByProductSummary);
      setSalesByMonth(data.salesByMonth);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) return <p className='pl-[22%]'>Cargando estadísticas...</p>;

  const barData: ChartData<"bar", number[], string> = {
    labels: salesByProduct.map((item) => item.productName),
    datasets: [
      {
        label: "Ventas por Producto",
        data: salesByProduct.map((item) => item.totalQuantity),
        backgroundColor: salesByProduct.map((_, index) =>
          index % 2 === 0 ? "#96008E" : "#FDD32D"
        ),
        borderRadius: 10,
        barThickness: 40,
        customData: salesByProduct.map((item) => ({
          price: item.price,
          totalSalesValue: item.totalSalesValue,
        })),
      } as CustomChartDataset,
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeOutBounce",
    },
    plugins: {
      title: {
        display: true,
        text: "Ventas por Producto",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "#1e293b",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const quantity = context.parsed.y;
            return [`Cantidad Vendida: ${quantity}`];
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#475569",
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#475569",
          font: { size: 12 },
          stepSize: 10,
        },
        grid: {
          color: "#e2e8f0",
        },
      },
    },
  };

  const lineData: ChartData<"line", number[], string> = {
    labels: salesByMonth.map((item) => {
      const label = new Date(item.month).toLocaleDateString("es-ES", {
        month: "short",
        year: "numeric",
      });
      return label.charAt(0).toUpperCase() + label.slice(1);
    }),
    datasets: [
      {
        label: "Ventas por Mes",
        data: salesByMonth.map((item) => item.totalSales),
        borderColor: "#96008E",
        backgroundColor: "rgba(150, 0, 142, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Ventas por Mes",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "#1e293b",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Cantidad Vendida: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#475569",
          font: { size: 12 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#475569",
          font: { size: 12 },
        },
        grid: {
          color: "#e2e8f0",
        },
      },
    },
  };

  return (
    <div className='p-8 bg-gray-50 text-cyan-950 pl-[22%]'>
      <h1 className='text-2xl font-bold mb-6'>Estadísticas de Ventas</h1>

      <div className='mb-12 h-[400px]'>
        <Bar data={barData} options={barOptions} />
      </div>

      <div className='mb-12 h-[400px]'>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}

