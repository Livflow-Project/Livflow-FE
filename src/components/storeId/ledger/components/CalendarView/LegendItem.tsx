type LegendItemProps = {
  color: string;
  label: string;
};

const LegendItem = ({ color, label }: LegendItemProps) => (
  <div className='flex items-center gap-2'>
    <span className={`text-${color}`}>●</span>
    <span className='text-sm font-medium text-main'>{label}</span>
  </div>
);

export default LegendItem;
