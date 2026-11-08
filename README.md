# front-cicd

Vite + React + TypeScript 프로젝트에 GitHub Actions CI/CD를 연습하는 저장소입니다.

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

## 주의

GitHub Pages는 `/front-cicd/` 하위 경로로 서비스되므로 `vite.config.ts`에 `base: '/front-cicd/'`가 설정되어 있습니다.
`public/`에 있는 파일은 `/file` 대신 `` `${import.meta.env.BASE_URL}file` ``로 참조해야 합니다.
