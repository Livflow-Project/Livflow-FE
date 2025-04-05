const Terms = () => {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold'>이용약관</h1>
      <p className='mb-8 text-gray-600'>최종 업데이트: 2025년 3월 12일</p>

      <div className='mb-8 rounded-lg bg-gray-50 p-4'>
        <h2 className='mb-2 text-xl font-semibold'>목차</h2>
        <ul className='list-disc pl-5'>
          <li>
            <a href='#terms' className='text-blue-600 hover:underline'>
              서비스 이용 약관
            </a>
          </li>
          <li>
            <a href='#account' className='text-blue-600 hover:underline'>
              계정 관리
            </a>
          </li>
          <li>
            <a href='#service' className='text-blue-600 hover:underline'>
              서비스 이용
            </a>
          </li>
          <li>
            <a href='#user-content' className='text-blue-600 hover:underline'>
              사용자 콘텐츠
            </a>
          </li>
          <li>
            <a href='#prohibited' className='text-blue-600 hover:underline'>
              금지된 활동
            </a>
          </li>
          <li>
            <a href='#termination' className='text-blue-600 hover:underline'>
              서비스 해지
            </a>
          </li>
          <li>
            <a href='#disclaimer' className='text-blue-600 hover:underline'>
              면책 조항
            </a>
          </li>
          <li>
            <a href='#changes' className='text-blue-600 hover:underline'>
              약관 변경
            </a>
          </li>
        </ul>
      </div>

      <section id='terms' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>1. 서비스 이용 약관</h2>
        <p className='mb-4'>
          Livflow 서비스(이하 "서비스")의 이용에 관한 조건 및 절차에 관한 사항과
          기타 필요한 사항을 규정함을 목적으로 합니다.
        </p>
        <p className='mb-4'>
          본 약관에 동의하시면 당사가 제공하는 모든 서비스를 이용하실 수
          있습니다. 본 약관에 동의하지 않는 경우 서비스 이용이 제한될 수
          있습니다.
        </p>
        <p className='mb-4'>
          본 서비스는 포트폴리오 프로젝트로, 실제 상업적 서비스가 아님을
          알려드립니다.
        </p>
      </section>

      <section id='account' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>2. 계정 관리</h2>
        <p className='mb-4'>
          사용자는 소셜 로그인을 통해 서비스에 접근할 수 있으며, 계정 보안에
          대한 책임이 있습니다.
        </p>
        <p className='mb-4'>사용자는 다음 사항에 대해 동의합니다:</p>
        <ul className='mb-4 list-disc pl-5'>
          <li>소셜 로그인 계정 정보의 보안을 유지할 책임이 있습니다.</li>
          <li>계정에서 발생하는 모든 활동에 대한 책임이 있습니다.</li>
          <li>
            계정 무단 사용이나 보안 위반 사항을 발견한 경우 즉시 당사에 알려야
            합니다.
          </li>
          <li>다른 사용자의 계정을 무단으로 사용할 수 없습니다.</li>
        </ul>
      </section>

      <section id='service' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>3. 서비스 이용</h2>
        <p className='mb-4'>
          Livflow는 가게 관리, 가계부, 재고 관리 등의 서비스를 제공합니다.
          서비스 이용에 관한 주요 사항은 다음과 같습니다:
        </p>
        <ul className='mb-4 list-disc pl-5'>
          <li>
            서비스는 "있는 그대로" 제공되며, 특정 목적에 대한 적합성이나
            정확성을 보장하지 않습니다.
          </li>
          <li>서비스는 사전 통지 없이 변경, 중단, 제한될 수 있습니다.</li>
          <li>서비스 이용 중 발생하는 데이터 손실에 대해 책임지지 않습니다.</li>
          <li>서비스 개선을 위해 사용자 피드백을 수집할 수 있습니다.</li>
        </ul>
      </section>

      <section id='user-content' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>4. 사용자 콘텐츠</h2>
        <p className='mb-4'>
          사용자가 서비스에 업로드하거나 생성하는 모든 콘텐츠(텍스트, 이미지,
          데이터 등)에 대한 소유권은 사용자에게 있습니다. 다만, 사용자는 다음
          사항에 동의합니다:
        </p>
        <ul className='mb-4 list-disc pl-5'>
          <li>
            Livflow에 서비스 제공 및 개선을 위해 사용자 콘텐츠를 사용, 저장,
            복제할 수 있는 권한을 부여합니다.
          </li>
          <li>사용자는 자신이 업로드한 콘텐츠에 대한 모든 책임을 집니다.</li>
          <li>타인의 지적재산권을 침해하는 콘텐츠를 업로드해서는 안 됩니다.</li>
          <li>
            부적절하거나 불법적인 콘텐츠는 사전 통지 없이 삭제될 수 있습니다.
          </li>
        </ul>
      </section>

      <section id='prohibited' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>5. 금지된 활동</h2>
        <p className='mb-4'>다음과 같은 활동은 서비스 이용 시 금지됩니다:</p>
        <ul className='mb-4 list-disc pl-5'>
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
          <li>불법적이거나 사기적인 목적으로 서비스를 사용하는 행위</li>
          <li>타인의 개인정보를 무단으로 수집하는 행위</li>
          <li>서비스의 보안을 우회하거나 취약점을 악용하는 행위</li>
          <li>바이러스나 악성 코드를 전송하는 행위</li>
          <li>타인을 사칭하거나 허위 정보를 제공하는 행위</li>
        </ul>
      </section>

      <section id='termination' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>6. 서비스 해지</h2>
        <p className='mb-4'>
          사용자는 언제든지 계정 삭제를 요청하여 서비스 이용을 중단할 수
          있습니다. 당사는 다음과 같은 경우 사용자의 서비스 이용을 제한하거나
          계정을 해지할 수 있습니다:
        </p>
        <ul className='mb-4 list-disc pl-5'>
          <li>이용약관을 위반한 경우</li>
          <li>불법적인 활동에 서비스를 사용한 경우</li>
          <li>타인에게 피해를 주는 방식으로 서비스를 사용한 경우</li>
          <li>장기간 서비스를 이용하지 않은 경우</li>
        </ul>
        <p className='mb-4'>
          계정이 해지되면 사용자의 데이터는 당사의 개인정보 처리방침에 따라
          처리됩니다.
        </p>
      </section>

      <section id='disclaimer' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>7. 면책 조항</h2>
        <p className='mb-4'>
          Livflow 서비스는 "있는 그대로" 제공되며, 법률이 허용하는 최대 범위
          내에서 다음 사항에 대해 명시적 또는 묵시적 보증을 하지 않습니다:
        </p>
        <ul className='mb-4 list-disc pl-5'>
          <li>서비스의 정확성, 신뢰성, 완전성</li>
          <li>특정 목적에 대한 적합성</li>
          <li>서비스의 중단 없는 가용성</li>
          <li>서비스를 통해 제공되는 정보의 정확성</li>
        </ul>
        <p className='mb-4'>
          당사는 서비스 이용으로 인해 발생하는 직접적, 간접적, 부수적, 특별,
          결과적 손해에 대해 책임지지 않습니다.
        </p>
      </section>

      <section id='changes' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>8. 약관 변경</h2>
        <p className='mb-4'>
          당사는 필요에 따라 본 이용약관을 변경할 수 있습니다. 약관이 변경될
          경우 서비스 내 공지사항을 통해 안내하며, 변경된 약관은 공지한 시점부터
          효력이 발생합니다.
        </p>
        <p className='mb-4'>
          변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.
          변경 사항 공지 후 계속해서 서비스를 이용하는 경우 변경된 약관에 동의한
          것으로 간주됩니다.
        </p>
      </section>

      <div className='mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500'>
        <p>© {new Date().getFullYear()} Livflow. 포트폴리오 프로젝트</p>
      </div>
    </div>
  );
};

export default Terms;
