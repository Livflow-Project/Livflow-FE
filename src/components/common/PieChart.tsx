import Chart, { TooltipItem } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

import { Category } from '@/api/store/store.type';

type PieChartProps = {
  selectedType: 'expense' | 'income';
  categories?: Category[];
};

const PieChart = ({ selectedType, categories }: PieChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const labels = categories?.map((item) => item.category) || [];
  const dataValues = categories?.map((item) => item.cost) || [];

  useEffect(() => {
    if (!chartRef.current) return;
    if (!categories || categories.length === 0) {
      return;
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const data = {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
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
                return `${tooltipItem.label} : ${value.toLocaleString()}원`;
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [categories, selectedType]);

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;
