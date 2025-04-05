import { motion } from 'framer-motion';

const steps = [
  {
    step: 1,
    title: '계정 생성',
    description: '소셜 로그인으로 간편하게 가입하고 시작하세요.',
    icon: '👤',
  },
  {
    step: 2,
    title: '스토어 등록',
    description: '관리할 가게 정보를 입력하고 설정하세요.',
    icon: '🏪',
  },
  {
    step: 3,
    title: '기능 활용',
    description: '가계부, 재고 관리, 원가 계산 등 다양한 기능을 이용하세요.',
    icon: '🚀',
  },
];

const GettingStartedSection = () => {
  return (
    <div className='w-full bg-white py-24'>
      <div className='container mx-auto'>
        <motion.h2
          className='mb-6 text-center text-3xl font-bold text-main'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Livflow 시작하기
        </motion.h2>

        <motion.p
          className='mx-auto mb-16 max-w-2xl text-center text-lg text-gray-600'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          몇 가지 간단한 단계만으로 비즈니스 관리의 혁신을 경험하세요
        </motion.p>

        <div className='relative mx-auto max-w-[1300px]'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {steps.map((item, index) => (
              <motion.div
                key={index}
                className='flex flex-col items-center'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <div className='relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-main text-white shadow-lg'>
                  <span className='text-3xl'>{item.icon}</span>
                  <div className='absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold text-main shadow-md'>
                    {item.step}
                  </div>
                </div>
                <div className='w-full rounded-xl border border-underline/15 bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl'>
                  <h3 className='mb-2 text-xl font-semibold text-main'>
                    {item.title}
                  </h3>
                  <p className='min-h-[50px] text-[16px] text-gray-600'>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default GettingStartedSection;
