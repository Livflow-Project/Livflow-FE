export const TRANSACTION_CATEGORIES_GROUPED = [
  {
    group: '수입',
    items: [
      { value: '매출', label: '매출' },
      { value: '수입', label: '수입' },
      { value: '부수입', label: '부수입' },
      { value: '투자 수익', label: '투자 수익' },
      { value: '정부 지원금', label: '정부 지원금' },
    ],
  },
  {
    group: '지출',
    items: [
      { value: '직원 급여', label: '직원 급여' },
      { value: '배송비', label: '배송비' },
      { value: '사무 용품', label: '사무 용품' },
      { value: '포장 용품', label: '포장 용품' },
    ],
  },
  {
    group: '주거',
    items: [
      { value: '주거비', label: '주거비' },
      { value: '임대료', label: '임대료' },
      { value: '월세', label: '월세' },
      { value: '관리비', label: '관리비' },
      { value: '수도 광열비', label: '수도 광열비' },
      { value: '인터넷 통신비', label: '인터넷 통신비' },
      { value: '수리비', label: '수리비' },
      { value: '인테리어비', label: '인테리어비' },
      { value: '난방비', label: '난방비' },
      { value: '냉방비', label: '냉방비' },
    ],
  },
  {
    group: '재료',
    items: [
      { value: '재료비', label: '재료비' },
      { value: '식료품', label: '식료품' },
    ],
  },
  {
    group: '교통',
    items: [
      { value: '자동차 유지비', label: '자동차 유지비' },
      { value: '자동차 보험', label: '자동차 보험' },
      { value: '주유비', label: '주유비' },
    ],
  },
  {
    group: '생활 필수품',
    items: [
      { value: '생활 용품', label: '생활 용품' },
      { value: '가전 제품', label: '가전 제품' },
      { value: '가구', label: '가구' },
      { value: '계절 재고 구매', label: '계절 재고 구매' },
    ],
  },
  {
    group: '의료/건강',
    items: [
      { value: '의료비', label: '의료비' },
      { value: '약품비', label: '약품비' },
      { value: '건강 관리', label: '건강 관리' },
    ],
  },
  {
    group: '세금',
    items: [
      { value: '소득세', label: '소득세' },
      { value: '부가 가치세', label: '부가 가치세' },
      { value: '재산세', label: '재산세' },
      { value: '사업자 보험', label: '사업자 보험' },
    ],
  },
  {
    group: '보험/금융',
    items: [
      { value: '보험료', label: '보험료' },
      { value: '저축', label: '저축' },
      { value: '투자', label: '투자' },
      { value: '대출 상환', label: '대출 상환' },
      { value: '금융 수수료', label: '금융 수수료' },
    ],
  },
  {
    group: '교육/자기계발',
    items: [
      { value: '전문 교육비', label: '전문 교육비' },
      { value: '세미나 컨퍼런스', label: '세미나 컨퍼런스' },
    ],
  },
  {
    group: '사업비',
    items: [
      { value: '마케팅비', label: '마케팅비' },
      { value: '설비 유지비', label: '설비 유지비' },
      { value: '소프트웨어', label: '소프트웨어' },
      { value: '전문 서비스', label: '전문 서비스' },
    ],
  },
  {
    group: '온라인 사업',
    items: [
      { value: '웹호스팅 서버', label: '웹호스팅 서버' },
      { value: '온라인 광고비', label: '온라인 광고비' },
      { value: '플랫폼 수수료', label: '플랫폼 수수료' },
    ],
  },
  {
    group: '기타',
    items: [{ value: '기타', label: '기타' }],
  },
];

export const TRANSACTION_CATEGORIES = TRANSACTION_CATEGORIES_GROUPED.flatMap(
  (group) =>
    group.items.map((item) => ({
      ...item,
      group: group.group,
    }))
);
