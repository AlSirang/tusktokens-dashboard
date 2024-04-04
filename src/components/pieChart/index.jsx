import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js/auto";

const maxSupply = 888888888;
const totalSupply = Math.floor((878622222 / maxSupply) * 100);
const circulatingSupply = Math.floor((622222222 / maxSupply) * 100);
const burnt = Math.floor((10266666 / maxSupply) * 100);

const chartDataDonut = {
  labels: ["Total Supply ", "Circulating Supply", "Burnt"],
  datasets: [
    {
      data: [totalSupply, circulatingSupply, burnt],
      backgroundColor: [
        "#CE984E",
        "#FFCA75",
        "#F5CD97",
        // "#A2855E",
        // "#9B8A73",
        // "#B8AEA2",
      ],
      borderWidth: 1,
      borderColor: "#ffffff",
      hoverBorderColor: "#ffffff",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,

  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",

      labels: {
        boxWidth: 10,
        padding: 20,
        boxHeight: 10,
        color: "#fff",
      },
    },

    tooltip: {
      usePointStyle: true,
    },
  },
};

export const DonutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    Chart.register(...registerables);

    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const plugins = [
          {
            beforeDraw: function (chart) {
              const width = chart.width,
                height = chart.height,
                ctx = chart.ctx;

              ctx.restore();
              const fontSize = (height / 114).toFixed(2);
              ctx.font = fontSize + "em";
              ctx.textBaseline = "middle";

              const text = "",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2.2;
              ctx.fillStyle = "black";
              ctx.fillText(text, textX, textY);
              ctx.save();
            },
          },
        ];

        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: chartDataDonut,

          options: options || {},
          plugins: plugins,
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} className="h-96" />;
};
