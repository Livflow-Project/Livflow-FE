import Chart, { TooltipItem } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const PieChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null); // canvas 요소 타입 설정

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    if (!ctx) return;

    const data = {
      labels: ['생활용품', '간식', '식재료'],
      datasets: [
        {
          label: ' ',
          data: [3000, 5000, 1000],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 5,
        },
      ],
    };

    const chartInstance = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: TooltipItem<'pie'>) => {
                const value = tooltipItem.raw as number;
                return ` : ${value.toLocaleString()}`; // 포맷팅
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;
