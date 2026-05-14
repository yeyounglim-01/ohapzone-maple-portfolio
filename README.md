# 오합zl존 메커톤 게임형 웹 포트폴리오

메이플스토리 감성의 캐릭터 선택 화면을 오마주한 팀 포트폴리오입니다.  
단순 소개 페이지가 아니라, 해커톤 팀의 배경과 역할, 프로젝트 경험, 강점, 지원 메시지를 게임 UI 흐름으로 탐색할 수 있도록 제작했습니다.

## 배포 링크

- GitHub Pages: https://yeyounglim-01.github.io/ohapzone-maple-portfolio/
- Repository: https://github.com/yeyounglim-01/ohapzone-maple-portfolio

## 프로젝트 개요

`오합zl존`은 Microsoft AI School 8기에서 만나 메이플스토리 월드 해커톤에 도전한 5인 팀입니다.  
이 웹 포트폴리오는 팀원 각자의 도메인 경험과 역할을 게임의 캐릭터 선택, 스토리 진행, 퀘스트 클리어 흐름으로 재구성했습니다.

핵심 목표는 다음과 같습니다.

- 심사자가 짧은 시간 안에 팀 구성과 강점을 이해할 수 있게 만들기
- 실제 게임 UI처럼 몰입감 있는 포트폴리오 경험 제공하기
- 팀원별 역할, 프로젝트, 협업 역량을 시각적으로 전달하기
- 추후 취업 포트폴리오에 포함할 수 있는 완성도 있는 웹 결과물로 남기기

## 주요 기능

- 흰색 페이드 인트로와 타이틀 등장 연출
- 캐릭터 선택 화면 기반의 5인 팀원 소개
- 캐릭터 hover 시 선택 캐릭터 강조 및 비선택 캐릭터 dimming
- 캐릭터 클릭 시 팀원별 프로젝트 상태창 표시
- `게임 시작` 버튼을 통한 Our Story 순차 진행
- Why Us, Why Maple, We Can Deliver, Closing 모달 플로우
- BGM, 효과음, 커스텀 커서 적용
- 모바일/태블릿/데스크톱 반응형 대응
- GitHub Pages 정적 배포

## 기술 스택

- HTML
- CSS
- JavaScript
- GitHub Pages
- Playwright 기반 화면 검증

프레임워크 없이 정적 웹으로 구현했습니다.  
별도 서버 없이 `index.html`만으로 실행 가능하며, GitHub Pages에서 바로 배포됩니다.

## 구현 포인트

### 게임 UI 스타일링

나무 간판, 양피지 패널, 픽셀풍 텍스트, 캐릭터 카드, RPG 스탯바, 모달 상태창을 CSS로 구성했습니다.  
실제 IP 자산을 직접 사용하지 않고, 자체 제작 에셋과 오마주형 UI로 분위기를 구현했습니다.

### 캐릭터 중심 인터랙션

캐릭터별 위치와 이름표는 개별 CSS 변수로 보정했습니다.  
캐릭터 hover 시 JS로 `is-hovering`, `is-hovered` 클래스를 부여하여 선택 캐릭터만 강조되고 나머지 캐릭터는 어두워지도록 처리했습니다.

### 모바일 대응

모바일에서는 캐릭터 row를 가로 스크롤 구조로 전환했습니다.  
스토리 모달과 엔딩 모달은 내부 스크롤 컨테이너를 별도로 두어 배경이 밀리지 않고 모달 안쪽 내용만 스크롤되도록 조정했습니다.

### 로딩 최적화

초기 진입 시점에 필요하지 않은 큰 역할 이미지 preload를 제거했습니다.  
BGM은 `preload="none"`으로 설정하고, 역할 이미지는 인트로/스토리/프로젝트 진입 시점에 lazy-load되도록 변경했습니다.

## 파일 구조

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── characters/
│   ├── memories/
│   ├── fantasy-village-bg.png
│   ├── bgm.mp3
│   ├── cursor.png
│   └── ...
├── package.json
└── README.md
```

## 로컬 실행

정적 웹이므로 브라우저에서 `index.html`을 직접 열어 확인할 수 있습니다.

검증 스크립트는 다음과 같습니다.

```bash
npm install
npm test
```

`npm test`는 `node --check script.js`를 실행해 JavaScript 문법 오류를 확인합니다.

## 팀원 구성

| 이름 | 포지션 | 주요 역할 |
| --- | --- | --- |
| 김효열 | 개발 | 반도체 공정, AI PoC, MVP 범위 조정 |
| 문경준 | 디자인 | 데이터 분석, UI/UX, AI 서비스 연결 |
| 이상은 | 개발 | 프론트엔드, UI/UX 구현, 리팩토링 |
| 이재균 | 기획 | 교통/UAM 연구, PM, 플레이 흐름 설계 |
| 임예영 | 기획 | 패션/콘텐츠 창작, UX 흐름, 비주얼 방향 |

## 협업 및 반영 기록

팀원별 브랜치와 PR을 그대로 merge하기보다, 현재 `main` 구조와 충돌하지 않는 범위에서 필요한 코드와 에셋을 선별 반영했습니다.

- EasyStock 설명 보강 문구 반영
- 데스크톱/온라인 환경의 화면 잘림 및 반응형 구조 개선
- 캐릭터별 역할 이미지와 모달 이미지 업데이트
- We Can Deliver 모달 문구 겹침 수정
- 모바일 Our Story 및 Closing 모달 스크롤 보정
- 초기 로딩 에셋 요청량 축소

세부 반영 내역은 GitHub Discussions의 공지에 정리했습니다.

- https://github.com/yeyounglim-01/ohapzone-maple-portfolio/discussions/6

## 앞으로 개선할 수 있는 부분

- 큰 PNG 에셋을 WebP/AVIF로 변환해 초기 로딩 추가 개선
- 실제 서비스 배포 전 접근성 라벨과 키보드 포커스 흐름 정리
- Lighthouse 기준 성능/접근성 점검
- 포트폴리오 제출용 전체 페이지 캡처 또는 PDF 버전 제작

## 스크린샷

추후 대표 화면 캡처를 추가할 예정입니다.
