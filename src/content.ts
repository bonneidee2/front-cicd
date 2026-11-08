// 모든 이름·수치·기관·연락처는 가상의 데모 데이터입니다.

export const BRAND = 'SimplePass'

export const NAV = ['SimplePass Lite', '자주 묻는 질문', '제휴 신청', '개발 가이드', '서비스 관리']

export const FEATURES = [
  {
    icon: 'tap',
    title: '간편해요',
    desc: '비밀번호 6자리나 생체인증 한 번이면 끝. 복잡한 보안 프로그램 설치 없이 바로 인증해요.',
  },
  {
    icon: 'shield',
    title: '안전해요',
    desc: '인증서 개인키는 기기 안의 보안 영역에만 저장돼요. 서버로 전송되지 않아 유출 걱정이 적어요.',
  },
  {
    icon: 'badge',
    title: '신뢰할 수 있어요',
    desc: '전자서명 인증사업자 기준에 맞춘 운영 체계와 정기 점검으로 믿고 쓸 수 있어요.',
  },
] as const

export const STATS = [
  { value: 120, suffix: '만명+', label: '누적 이용자 수' },
  { value: 850, suffix: '만건+', label: '월 평균 인증 건수' },
  { value: 60, suffix: '개+', label: '이용 가능 사이트' },
] as const

export const PARTNERS = [
  '한빛시청', '누리보험', '바른세무', '온새미 쇼핑', '다온 증권',
  '새솔 대학교', '하늘 통신', '미르 카드', '가람 병원', '단비 주택청약',
]

export const SERVICES = [
  { title: '간편인증', desc: '로그인과 본인 확인을 앱 하나로' },
  { title: '전자서명', desc: '계약·신청서에 법적 효력 있는 서명' },
  { title: '본인확인', desc: '이름·생년월일·휴대폰 기반 실명 확인' },
  { title: '전자문서', desc: '증명서를 안전하게 받고 제출' },
  { title: '통합인증', desc: '여러 기관 데이터를 한 번에 연결' },
] as const

export const PLANS = [
  {
    tag: '개인용',
    title: 'SimplePass',
    items: ['만 14세 이상 누구나 발급', '유효기간 3년, 발급 수수료 무료', '스마트폰 1대당 1개 인증서'],
    cta: '발급하기',
  },
  {
    tag: '법인용',
    title: 'SimplePass 비즈',
    items: ['법인·개인사업자 대표 및 임직원', '세무·조달·전자계약 업무 지원', '관리자 콘솔로 사용자 권한 관리'],
    cta: '자세히 알아보기',
  },
] as const

export const SUPPORT = [
  { label: '고객센터', value: '0000-0000' },
  { label: '해외', value: '+00-0-0000-0000' },
]
