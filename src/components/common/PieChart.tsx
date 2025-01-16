import Chart, { TooltipItem } from 'chart.js/auto';
import { memo, useEffect, useMemo, useRef } from 'react';

import { Category } from '@/api/store/store.type';

type PieChartProps = {
  selectedType: 'expense' | 'income';
  categories?: Category[];
};

const CHART_COLORS = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
];

const CHART_OPTIONS = {
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
};

const PieChart = memo(
  ({ selectedType, categories }: PieChartProps) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    const chartData = useMemo(
      () => ({
        labels: categories?.map((item) => item.category) || [],
        datasets: [
          {
            data: categories?.map((item) => item.cost) || [],
            backgroundColor: CHART_COLORS,
            hoverOffset: 5,
          },
        ],
      }),
      [categories]
    );

    useEffect(() => {
      if (!chartRef.current) return;
      if (!categories || categories.length === 0) return;

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      const chartInstance = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: CHART_OPTIONS,
      });

      return () => {
        chartInstance.destroy();
      };
    }, [categories, selectedType, chartData]);

    return <canvas ref={chartRef} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.selectedType === nextProps.selectedType &&
      JSON.stringify(prevProps.categories) ===
        JSON.stringify(nextProps.categories)
    );
  }
);

export default PieChart;
