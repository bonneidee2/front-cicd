# front-cicd

Vite + React + TypeScript 프로젝트에 GitHub Actions CI/CD를 연습하는 저장소입니다.
화면은 가상의 인증서 서비스 **SimplePass**를 소개하는 데모 랜딩 페이지입니다. 이름, 수치, 기관, 연락처는 모두 가상의 데이터입니다.

- 배포 주소: https://bonneidee2.github.io/front-cicd/
- CI (`.github/workflows/ci.yml`): PR과 main 이외 브랜치 push마다 `lint`와 `build`를 실행합니다
- CD (`.github/workflows/deploy.yml`): main에 push하면 빌드해서 GitHub Pages에 배포합니다

## 로컬 실행

```bash
npm ci
npm run dev      # 개발 서버
npm run lint     # oxlint
npm run build    # 타입체크 + 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 미리보기 (/front-cicd/ 경로로 열림)
```

Node 버전은 `.nvmrc`(24)를 따릅니다.

## 구조

- `src/content.ts`: 화면에 나오는 문구와 데이터
- `src/App.tsx`: 섹션 컴포넌트 (헤더, 히어로, 특징, 통계, 이용 기관, 서비스, 용도별 안내, CTA, 푸터, QR 모달)
- `src/App.css`, `src/index.css`: 스타일 (라이트/다크 모드, 모바일 대응)

## 주의

GitHub Pages는 `/front-cicd/` 하위 경로로 서비스되므로 `vite.config.ts`에 `base: '/front-cicd/'`가 설정되어 있습니다.
`public/`에 있는 파일을 코드에서 참조할 때는 `/file` 대신 `` `${import.meta.env.BASE_URL}file` ``을 써야 합니다.
