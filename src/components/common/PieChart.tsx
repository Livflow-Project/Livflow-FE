import Chart, { TooltipItem } from 'chart.js/auto';
import { memo, useEffect, useMemo, useRef } from 'react';

import { ChartOverview } from '@/api/storeId/ledger/calendar/calendar.type';

type PieChartProps = {
  categories: ChartOverview['categories'];
};

const CATEGORY_COLOR_MAP: Record<string, string> = {
  // 수입 관련 - 파랑/청록 계열로 통일
  급여: '#5B9BD5', // 중간 파랑 (덜 진하게)
  부수입: '#8FAADC', // 연한 파랑
  투자수익: '#4472C4', // 진한 파랑 (덜 진하게)
  정부지원금: '#70C1CE', // 밝은 청록색
  매출: '#2E8BC0', // 밝은 파랑 (추가)

  // 주거 관련 - 보라/분홍 계열로 통일
  주거비: '#C5A3BD', // 연한 라벤더
  월세: '#9B59B6', // 자주색 (덜 진하게)
  관리비: '#D7BDE2', // 연한 자주색
  수도광열비: '#F1948A', // 연한 빨강
  인터넷통신비: '#FFBDC5', // 연한 분홍
  수리비: '#A98BC7', // 연한 보라
  인테리어비: '#D2B4DE', // 연한 보라
  난방비: '#E8ADAD', // 연한 분홍
  냉방비: '#9590C7', // 연한 보라

  // 식비 관련
  식료품: '#F8B88B', // 연한 주황

  // 교통 관련 - 파랑/회색 계열로 통일
  자동차유지비: '#BDD7EE', // 연한 파랑
  자동차보험: '#D0D3DD', // 연한 회색
  주유비: '#F4A582', // 연한 오렌지

  // 생활 필수품 - 노랑/녹색 계열로 통일
  생활용품: '#FFE699', // 연한 노랑
  가전제품: '#7BC5AE', // 연한 녹색
  가구: '#B3CC92', // 연한 모스 그린
  계절재고구매: '#F9D27D', // 연한 황금색

  // 의료/건강 - 청록색 계열로 통일
  의료비: '#66B2B2', // 연한 청록색
  약품비: '#9CCCCC', // 매우 연한 청록색
  건강관리: '#A3D1B2', // 연한 녹색

  // 세금 관련 - 빨강 계열로 통일
  소득세: '#E57373', // 연한 빨강
  부가가치세: '#EF5350', // 연한 체리 레드
  재산세: '#FFABA5', // 매우 연한 빨강
  사업자보험: '#E57373', // 연한 빨강

  // 보험/금융 - 황금/갈색 계열로 통일
  보험료: '#F4A460', // 연한 오렌지
  저축: '#D4B96A', // 연한 황금색
  투자: '#C68B59', // 연한 버닛 시에나
  대출상환: '#A47A7C', // 연한 적갈색
  금융수수료: '#C9A66B', // 연한 황토색

  // 교육/자기계발 - 보라 계열로 통일
  전문교육비: '#9370DB', // 연한 보라
  세미나컨퍼런스: '#BFA58A', // 연한 갈색

  // 사업 관련 - 다양한 색상을 조화롭게 배치
  직원급여: '#5DADE2', // 연한 청록색
  사무용품: '#F7DC6F', // 연한 노랑
  포장용품: '#F5CBA7', // 연한 골드
  재료비: '#F5B041', // 연한 오렌지
  마케팅비: '#F1948A', // 연한 핑크
  임대료: '#C39BD3', // 연한 버건디
  설비유지비: '#7DCEA0', // 연한 녹색
  배송비: '#85C1E9', // 연한 로얄 블루
  소프트웨어: '#7FB3D5', // 연한 파랑
  전문서비스: '#AED6F1', // 연한 스카이 블루

  // 온라인 사업 관련 - 파랑/청록 계열로 통일
  웹호스팅서버: '#5DADE2', // 연한 틸 블루
  온라인광고비: '#D6EAF8', // 매우 연한 파랑
  플랫폼수수료: '#D6EFF1', // 매우 연한 씨폼 그린

  // 기타
  기타: '#A9A9A9', // 연한 회색
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
