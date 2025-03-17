import { motion } from 'framer-motion';

const problems = [
  '여러 가게의 정보를 관리하느라 시간을 낭비하고 있음',
  '복잡한 엑셀 파일로 가계부와 재고를 관리하기 어려움',
  '정확한 원가 계산이 어려워 수익성 분석에 문제가 있음',
  '재료 관리가 비효율적이어서 재고 파악이 어려움',
];

const solutions = [
  '한 계정으로 모든 가게 정보를 한눈에 관리',
  '직관적인 인터페이스로 손쉬운 가계부 및 재고 관리',
  '자동화된 원가 계산으로 정확한 수익성 분석',
  '실시간 재고 파악으로 효율적인 재료 관리',
];

const ProblemSolutionSection = () => {
  return (
    <div className='w-full bg-gradient-to-br from-gray-50 to-main/5 py-24'>
      <div className='container mx-auto px-4'>
        <motion.h2
          className='mb-16 text-center text-3xl font-bold text-main'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          비즈니스 관리의 어려움, Livflow가 해결합니다
        </motion.h2>

        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2'>
          <motion.div
            className='rounded-xl bg-white p-8 shadow-md'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className='mb-6 flex items-center text-xl font-semibold text-red'>
              <svg
                className='mr-2 h-6 w-6'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
              이런 어려움을 겪고 계신가요?
            </h3>

            <ul className='space-y-4'>
              {problems.map((item, index) => (
                <motion.li
                  key={index}
                  className='flex items-start rounded-lg bg-red/5 p-3'
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                >
                  <span className='mr-3 text-lg text-red'>✕</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className='rounded-xl bg-white p-8 shadow-md'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className='mb-6 flex items-center text-xl font-semibold text-green'>
              <svg
                className='mr-2 h-6 w-6'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
              Livflow의 해결책
            </h3>

            <ul className='space-y-4'>
              {solutions.map((item, index) => (
                <motion.li
                  key={index}
                  className='flex items-start rounded-lg bg-green/5 p-3'
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.3 }}
                >
                  <span className='mr-3 text-lg text-green'>✓</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolutionSection;
