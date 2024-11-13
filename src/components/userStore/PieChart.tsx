import Chart, { TooltipItem } from 'chart.js/auto';
import { useEffect, useRef } from 'react';

interface PieChartProps {
  selectedType?: 'expense' | 'income';
  categories: Record<string, number>;
}

const PieChart: React.FC<PieChartProps> = ({ selectedType, categories }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const labels = Object.keys(categories);
    const dataValues = Object.values(categories);

    const data = {
      labels,
      datasets: [
        {
          label: selectedType === 'expense' ? '지출' : '수입',
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
  }, [categories]);

  return <canvas ref={chartRef}></canvas>;
};

export default PieChart;
