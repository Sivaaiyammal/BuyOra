import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, ChartDataLabels);

const CATEGORY_COLORS = [
  "#fbbf24", // electrical - orange
  "#22c55e", // Men fashion - green
  "#3b82f6", // Kids fashion - blue
  "#f472b6", // women fashion - pink
];

const ProductChart = () => {
  const [labels, setLabels] = useState([]);
  const [counts, setCounts] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/product-charts/category-counts")
      .then(res => {
        setLabels(res.data.map(item => item.category));
        setCounts(res.data.map(item => item.count));
      });
  }, []);
  

  const data = {
    labels,
    datasets: [
      {
        label: "Product Categories",
        data: counts,
        backgroundColor: CATEGORY_COLORS.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 14 },
        },
      },
      datalabels: {
        color: "#222",
        font: { weight: "bold", size: 14 },
        formatter: (value, context) => context.chart.data.labels[context.dataIndex],
      },
    },
    scales: {
      r: {
        ticks: { color: "#6b7280", font: { size: 12 } },
        grid: { color: "#e5e7eb" },
        angleLines: { color: "#e5e7eb" },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Product</h3>
      <div className="flex justify-center mb-6" style={{ height: 260 }}>
        <div className="relative w-64 h-64">
          <PolarArea data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ProductChart;