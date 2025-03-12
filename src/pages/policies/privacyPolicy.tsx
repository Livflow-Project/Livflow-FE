const PrivacyPolicy = () => {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold'>개인정보 처리방침</h1>
      <p className='mb-8 text-gray-600'>최종 업데이트: 2025년 3월 12일</p>

      {/* 목차 (선택사항) */}
      <div className='mb-8 rounded-lg bg-gray-50 p-4'>
        <h2 className='mb-2 text-xl font-semibold'>목차</h2>
        <ul className='list-disc pl-5'>
          <li>
            <a href='#collection' className='text-blue-600 hover:underline'>
              수집하는 개인정보
            </a>
          </li>
          <li>
            <a href='#purpose' className='text-blue-600 hover:underline'>
              개인정보의 이용 목적
            </a>
          </li>
          <li>
            <a href='#storage' className='text-blue-600 hover:underline'>
              개인정보의 보관 및 보호
            </a>
          </li>
          <li>
            <a href='#share' className='text-blue-600 hover:underline'>
              개인정보의 제3자 제공
            </a>
          </li>
          <li>
            <a href='#rights' className='text-blue-600 hover:underline'>
              이용자의 권리
            </a>
          </li>
          <li>
            <a href='#children' className='text-blue-600 hover:underline'>
              아동의 개인정보
            </a>
          </li>
          <li>
            <a href='#changes' className='text-blue-600 hover:underline'>
              개인정보 처리방침 변경
            </a>
          </li>
          <li>
            <a href='#contact' className='text-blue-600 hover:underline'>
              문의하기
            </a>
          </li>
        </ul>
      </div>

      {/* 본문 섹션 */}
      <section id='collection' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>1. 수집하는 개인정보</h2>
        <p className='mb-4'>Livflow는 다음과 같은 개인정보를 수집합니다:</p>
        <ul className='mb-4 list-disc pl-5'>
          <li>소셜 로그인을 통해 제공되는 이메일 주소</li>
          <li>서비스 이용 과정에서 생성되는 가계부 및 재고 관리 데이터</li>
          <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
        </ul>
        <p>당사는 최소한의 개인정보만을 수집하여 처리합니다.</p>
      </section>

      <section id='purpose' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>2. 개인정보의 이용 목적</h2>
        <p className='mb-4'>
          Livflow는 수집한 개인정보를 다음과 같은 목적으로 이용합니다:
        </p>
        <ul className='mb-4 list-disc pl-5'>
          <li>회원 식별 및 서비스 제공을 위한 계정 관리</li>
          <li>가게 관리, 가계부, 재고 관리 등 서비스 기능 제공</li>
          <li>서비스 개선 및 신규 서비스 개발을 위한 통계 분석</li>
          <li>서비스 관련 공지사항 및 중요 정보 전달</li>
        </ul>
      </section>

      <section id='storage' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>
          3. 개인정보의 보관 및 보호
        </h2>
        <p className='mb-4'>
          Livflow는 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같은
          조치를 취하고 있습니다:
        </p>
        <ul className='mb-4 list-disc pl-5'>
          <li>개인정보는 암호화하여 저장 및 관리됩니다.</li>
          <li>
            해킹이나 컴퓨터 바이러스로부터 보호하기 위한 보안 프로그램을
            설치하고 주기적으로 갱신합니다.
          </li>
          <li>개인정보에 대한 접근 권한을 최소화하고 있습니다.</li>
        </ul>
        <p className='mb-4'>
          개인정보는 서비스 제공을 위해 필요한 기간 동안 보관되며, 이용자가 계정
          삭제를 요청하거나 서비스 이용 계약이 종료된 경우에는 지체 없이
          파기됩니다. 다만, 관련 법령에 따라 보존할 필요가 있는 경우에는 해당
          기간 동안 보관될 수 있습니다.
        </p>
      </section>

      <section id='share' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>
          4. 개인정보의 제3자 제공
        </h2>
        <p className='mb-4'>
          Livflow는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
          다만, 아래와 같은 경우에는 예외로 합니다:
        </p>
        <ul className='mb-4 list-disc pl-5'>
          <li>이용자가 사전에 동의한 경우</li>
          <li>
            법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에
            따라 수사기관의 요구가 있는 경우
          </li>
        </ul>
        <p className='mb-4'>
          소셜 로그인 서비스 제공업체(Google 등)와의 정보 공유는 이용자가 해당
          서비스 연동을 직접 설정한 범위 내에서만 이루어집니다.
        </p>
      </section>

      <section id='rights' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>5. 이용자의 권리</h2>
        <p className='mb-4'>
          이용자는 개인정보에 대해 다음과 같은 권리를 행사할 수 있습니다:
        </p>
        <ul className='mb-4 list-disc pl-5'>
          <li>개인정보 열람 및 수정 요청</li>
          <li>개인정보 삭제 요청</li>
          <li>개인정보 처리 정지 요청</li>
          <li>동의 철회</li>
        </ul>
        <p className='mb-4'>
          위 권리 행사는 서비스 내 설정 메뉴 또는
          이메일(dudrknd1642@gmail.com)을 통해 요청하실 수 있습니다. 요청이 있을
          경우 지체 없이 필요한 조치를 취하겠습니다.
        </p>
      </section>

      <section id='children' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>6. 아동의 개인정보</h2>
        <p className='mb-4'>
          Livflow는 만 14세 미만 아동의 개인정보를 수집하지 않습니다. 만약 만
          14세 미만 아동의 개인정보가 수집된 사실이 확인될 경우 해당 정보는 즉시
          삭제됩니다.
        </p>
        <p className='mb-4'>
          법정대리인이 자녀의 개인정보 열람, 정정, 삭제, 처리정지를 요청하는
          경우 지체 없이 필요한 조치를 취하겠습니다.
        </p>
      </section>

      <section id='changes' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>
          7. 개인정보 처리방침 변경
        </h2>
        <p className='mb-4'>
          본 개인정보 처리방침은 법령, 정책 또는 보안 기술의 변경에 따라 내용이
          추가, 삭제 및 수정될 수 있습니다. 개인정보 처리방침이 변경되는 경우
          변경 사항을 서비스 내 공지사항을 통해 안내하겠습니다.
        </p>
        <p className='mb-4'>
          변경된 개인정보 처리방침은 공지한 시점부터 효력이 발생합니다.
        </p>
      </section>

      <section id='contact' className='mb-8'>
        <h2 className='mb-4 text-2xl font-semibold'>8. 문의하기</h2>
        <p className='mb-4'>
          개인정보 보호 또는 서비스 이용과 관련하여 문의사항이 있으시면 아래
          연락처로 문의해 주시기 바랍니다:
        </p>
        <ul className='mb-4 list-disc pl-5'>
          <li>이메일: dudrknd1642@gmail.com</li>
          <li>이메일: guswwn1925@gmail.com</li>
        </ul>
      </section>

      <div className='mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500'>
        <p>© {new Date().getFullYear()} Livflow. 포트폴리오 프로젝트</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
