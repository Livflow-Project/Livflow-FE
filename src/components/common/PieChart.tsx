import Chart, { TooltipItem } from 'chart.js/auto';
import { memo, useEffect, useMemo, useRef } from 'react';

import { ChartOverview } from '@/api/storeId/ledger/calendar/calendar.type';

type PieChartProps = {
  categories: ChartOverview['categories'];
};

const CATEGORY_COLOR_MAP: Record<string, string> = {
  급여: 'rgb(191, 248, 167)',
  식비: 'rgb(255, 99, 132)',
  교통비: 'rgb(54, 162, 235)',
  생활용품: 'rgb(255, 205, 86)',
  저축: 'rgb(75, 192, 192)',
  주거: 'rgb(153, 102, 255)',
  용돈: 'rgb(255, 159, 64)',
  통신비: 'rgb(255, 175, 192)',
  건강: 'rgb(54, 75, 235)',
  자기계발: 'rgb(237, 205, 129)',
  여행: 'rgb(119, 238, 238)',
  자동차: 'rgb(180, 144, 252)',
  문화: 'rgb(217, 115, 13)',
  경조사: 'rgb(253, 87, 87)',
  기타: 'rgb(134, 200, 245)',
};

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: true,
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

const getColorForCategory = (category: string) => {
  if (category in CATEGORY_COLOR_MAP) {
    return CATEGORY_COLOR_MAP[category];
  }
};

const PieChart = memo(({ categories }: PieChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<'pie', number[], string> | null>(null);

  const chartData = useMemo(() => {
    const data = {
      labels: categories.map((item) => item.category),
      datasets: [
        {
          data: categories.map((item) => item.cost),
          backgroundColor: categories.map((item) =>
            getColorForCategory(item.category)
          ),
          hoverOffset: 5,
        },
      ],
    };
    return data;
  }, [categories]);

  useEffect(() => {
    const initChart = () => {
      if (!chartRef.current) return;
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // 기존 차트 인스턴스가 있다면 제거
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // 새로운 차트 생성
      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: CHART_OPTIONS,
      });
    };

    initChart();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [chartData, categories]);

  return <canvas ref={chartRef} />;
});

export default PieChart;
