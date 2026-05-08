const members = {
  hyoyeol: {
    name: "김효열",
    job: "아델",
    role: "개발 · 반도체 공정 / AI PoC",
    desc: "mLua 구현, 핵심 플레이 루프 개발, MVP 범위 조정",
    projects: [
      ["LabIT", "AI 기반 실험실 업무 지원 플랫폼. FastAPI, SQL Server, Azure OpenAI 기반 백엔드·인프라 담당. MS AI School 최종 프로젝트 최우수상."],
      ["FabFlow", "반도체 팹 운영 시뮬레이션 게임. 반도체 현장 병목과 자원 배분 감각을 게임으로 구현."]
    ]
  },
  gyeongjun: {
    name: "문경준",
    job: "루미너스",
    role: "디자인 · 데이터 분석 / 웹앱",
    desc: "UI/UX 디자인, 프로토타이핑, AI 서비스 연결",
    projects: [
      ["멀티모달 AI 음성 컴패니언", "Gemini 2.5 Flash Live 기반 생활형 AI 에이전트. AI 모델 선정, 멀티모달 연동, 의도 라우팅 구현."],
      ["터널 천공 이상 탐지 연구", "Isolation Forest, LOF, One-Class SVM 비교 실험으로 데이터 특성별 모델 성능 차이를 분석."]
    ]
  },
  sangeun: {
    name: "이상은",
    job: "팬텀",
    role: "개발 · 건설 / 프론트엔드",
    desc: "UI/UX 구현, 사용자 경험 최적화, 시스템 안정성, 리팩토링",
    projects: [
      ["Deep Nexus", "사내 데이터 인텔리전스 플랫폼. Electron 프론트엔드 설계와 멀티모달 UX 구현으로 업무 데이터 처리 속도 향상."],
      ["EasyStock", "Azure 기반 주식 투자 교육 서비스. UI/UX 설계와 레벨·성장 피드백 화면 구현."]
    ]
  },
  jaegyun: {
    name: "이재균",
    job: "메카닉",
    role: "기획 · 교통 / UAM 연구",
    desc: "게임 콘셉트·플레이 흐름 설계, PM, AI 기능 보조",
    projects: [
      ["LabIT", "Azure Digital Twins 기반 연구실 관리 서비스. PM과 백엔드 개발 담당. MS AI School 최종 프로젝트 최우수상."],
      ["강한 매니저", "AI 기반 온라인 교육 보조 강사 서비스. LLM 기능 개발과 라우팅 설계 담당. MS AI School 2차 프로젝트 최우수상."],
      ["2025 UAM 올림피아드", "영남지방 소방+교통용 버티포트 입지 분석. PM, QGIS 시뮬레이션 운영. 최우수상·국토교통부장관상."]
    ]
  },
  yeyoung: {
    name: "임예영",
    job: "팬텀",
    role: "기획 · 패션 / 콘텐츠 창작",
    desc: "세계관·UX 흐름 기획, UI/UX 설계, 비주얼 방향",
    projects: [
      ["text2fit", "NeRF·OOTDiffusion 기반 AI 가상 피팅 서비스. 전체 파이프라인 설계와 HuggingFace 단독 배포."],
      ["Cro-share", "이미지 기반 뜨개질 도안 자동 생성 플랫폼. Median Cut, BFS, Canvas API 핵심 로직 구현과 Next.js 배포."]
    ]
  }
};

const slots = [...document.querySelectorAll(".character-slot")];
const characterRow = document.querySelector(".character-row");
const selectedName = document.querySelector("#selected-name");
const selectedJob = document.querySelector("#selected-job");
const selectedRole = document.querySelector("#selected-role");
const selectedDesc = document.querySelector("#selected-desc");
const modal = document.querySelector("#project-modal");
const modalName = document.querySelector("#modal-name");
const modalJob = document.querySelector("#modal-job");
const modalRole = document.querySelector("#modal-role");
const modalBody = document.querySelector("#modal-body");
const storyModal = document.querySelector("#story-modal");
const storyCharacter = document.querySelector("#story-character");
const storyName = document.querySelector("#story-name");
const storyRole = document.querySelector("#story-role");
const storyText = document.querySelector("#story-text");
const storyCount = document.querySelector("#story-count");
const storyPrev = document.querySelector("#story-prev");
const storyNext = document.querySelector("#story-next");
const whyModal = document.querySelector("#why-modal");
const mapleModal = document.querySelector("#maple-modal");
const deliverModal = document.querySelector("#deliver-modal");
const closingModal = document.querySelector("#closing-modal");
const whyNext = document.querySelector("#why-next");
const mapleNext = document.querySelector("#maple-next");
const deliverNext = document.querySelector("#deliver-next");
const endingTypewriter = document.querySelector("#ending-typewriter");
const introStart = document.querySelector("#intro-start");
const introLogoSfx = new Audio("./assets/intro-logo.mp3");
const selectSfx = new Audio("./assets/select.mp3");
const cursorSfx = new Audio("./assets/cursor-click.mp3");
let selectedKey = "sangeun";
let storyIndex = 0;
const mobileCharacterQuery = window.matchMedia("(max-width: 760px)");

function playSfx(source, volume = 0.72) {
  const sound = source.cloneNode();
  sound.volume = volume;
  sound.play().catch(() => {});
}

const storyOrder = ["hyoyeol", "gyeongjun", "sangeun", "jaegyun", "yeyoung"];
const storyCopy = {
  hyoyeol:
    "반도체 제조 현장에서 공정·데이터 기반 문제 해결을 경험한 후 MS AI School을 통해 AI 기반 PoC와 MVP 제작을 거쳤습니다. 게임을 규칙·선택·보상·피드백이 연결된 체계적인 시스템으로 바라보는 시각을 가지고 있습니다.",
  gyeongjun:
    "에너지자원공학과 학부연구생으로 터널 천공 데이터 이상 탐지를 연구하며 현장 데이터 분석 감각을 키웠습니다. MS AI School에서 LLM API·웹앱·클라우드 배포를 경험하고, 사용자 경험과 디자인까지 함께 고민하는 방향으로 확장하고 있습니다.",
  sangeun:
    "건설 현장에서 협업과 자재·인원 관리 역량을 쌓은 후, 현장 데이터의 가치를 깨닫고 AI와 보안 분야로 전환했습니다. MS AI School에서 React와 클라우드 기술을 활용한 프로젝트를 통해 협업 역량과 전문성을 넓히고 있습니다.",
  jaegyun:
    "공공기관에서 교통신호체계를 운영하고, 대학원에서 도심항공교통(UAM) 버티포트 운영 및 최적 입지 선정을 연구했습니다. MS AI School에서 세 차례의 팀 프로젝트를 경험하며 아이디어를 실제 서비스로 구현하는 역량을 갖췄습니다.",
  yeyoung:
    "패션디자이너로 매 시즌 트렌드 분석과 스토리텔링 기획을 반복해온 경험이 콘텐츠 설계 감각의 바탕이 되었습니다. 웹툰 공모전 수상·인스타툰 연재 등 창작 활동을 이어오며, MS AI School에서 기획과 기술을 함께 다루는 사람으로 성장하고 있습니다."
};

function selectMember(key) {
  const member = members[key];
  selectedKey = key;
  slots.forEach((slot) => slot.classList.toggle("active", slot.dataset.member === key));
  selectedName.textContent = member.name;
  selectedJob.textContent = member.job;
  selectedRole.textContent = member.role;
  selectedDesc.textContent = member.desc;
}

function centerActiveCharacter() {
  if (!mobileCharacterQuery.matches || !characterRow) return;
  const activeSlot = characterRow.querySelector(".character-slot.active");
  activeSlot?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
}

function openProjects(key) {
  const member = members[key];
  modalName.textContent = member.name;
  modalJob.textContent = member.job;
  modalRole.textContent = member.role;
  modalBody.innerHTML = member.projects
    .map(([title, body]) => `<article><h3>${title}</h3><p>${body}</p></article>`)
    .join("");
  modal.showModal();
}

function renderStory(index) {
  storyIndex = (index + storyOrder.length) % storyOrder.length;
  const key = storyOrder[storyIndex];
  const member = members[key];
  storyCharacter.classList.remove("slide-in");
  storyCharacter.src = `./assets/characters/${key}.png`;
  storyCharacter.alt = `${member.name} 캐릭터`;
  storyName.textContent = member.name;
  storyRole.textContent = member.role;
  storyText.textContent = storyCopy[key];
  storyCount.textContent = `${storyIndex + 1} / ${storyOrder.length}`;
  requestAnimationFrame(() => {
    storyCharacter.classList.add("slide-in");
  });
}

function openStorySequence() {
  playSfx(selectSfx);
  renderStory(0);
  storyModal.showModal();
}

slots.forEach((slot) => {
  const key = slot.dataset.member;
  const img = slot.querySelector(".character-img");
  img.addEventListener("error", () => {
    slot.classList.remove("has-image");
    slot.classList.add("missing-image");
  });
  img.addEventListener("load", () => {
    slot.classList.remove("missing-image");
    slot.classList.add("has-image");
  });
  if (img.complete) {
    slot.classList.toggle("has-image", img.naturalWidth > 0);
    slot.classList.toggle("missing-image", img.naturalWidth === 0);
  }
  slot.addEventListener("mouseenter", () => selectMember(key));
  slot.addEventListener("focus", () => selectMember(key));
  slot.addEventListener("click", () => {
    playSfx(selectSfx);
    selectMember(key);
    openProjects(key);
  });
});

document.querySelector("#open-project").addEventListener("click", openStorySequence);
storyPrev.addEventListener("click", () => {
  playSfx(cursorSfx, 0.55);
  renderStory(storyIndex - 1);
});
storyNext.addEventListener("click", () => {
  playSfx(cursorSfx, 0.55);
  if (storyIndex === storyOrder.length - 1) {
    storyModal.close();
    whyModal.showModal();
    return;
  }
  renderStory(storyIndex + 1);
});
whyNext.addEventListener("click", () => {
  playSfx(cursorSfx, 0.55);
  whyModal.close();
  mapleModal.showModal();
});
mapleNext.addEventListener("click", () => {
  playSfx(cursorSfx, 0.55);
  mapleModal.close();
  deliverModal.showModal();
});

let endingTypeTimer;

function playEndingTypewriter() {
  const text = endingTypewriter.dataset.text || "";
  let index = 0;
  clearInterval(endingTypeTimer);
  endingTypewriter.textContent = "";
  endingTypeTimer = setInterval(() => {
    endingTypewriter.textContent = text.slice(0, index + 1);
    index += 1;
    if (index >= text.length) {
      clearInterval(endingTypeTimer);
    }
  }, 58);
}

deliverNext.addEventListener("click", () => {
  playSfx(cursorSfx, 0.55);
  deliverModal.close();
  closingModal.showModal();
  playEndingTypewriter();
});

const bgm = document.querySelector("#bgm");
const soundToggle = document.querySelector("#sound-toggle");
let bgmWanted = true;

async function tryPlayBgm() {
  if (!bgmWanted) return;
  try {
    bgm.volume = 0.55;
    await bgm.play();
    soundToggle.textContent = "♪ BGM ON";
    soundToggle.setAttribute("aria-pressed", "true");
  } catch {
    soundToggle.textContent = "♪ BGM 대기";
    soundToggle.setAttribute("aria-pressed", "false");
  }
}

function unlockBgmOnce() {
  tryPlayBgm();
  window.removeEventListener("pointerdown", unlockBgmOnce);
  window.removeEventListener("keydown", unlockBgmOnce);
}

soundToggle.addEventListener("click", async () => {
  playSfx(cursorSfx, 0.55);
  if (!bgm.paused) {
    bgmWanted = false;
    bgm.pause();
    soundToggle.textContent = "♪ BGM OFF";
    soundToggle.setAttribute("aria-pressed", "false");
  } else {
    bgmWanted = true;
    await tryPlayBgm();
  }
});

introStart.addEventListener("click", () => {
  document.body.classList.add("intro-started");
  centerActiveCharacter();
  playSfx(introLogoSfx, 0.78);
  bgmWanted = true;
  tryPlayBgm();
});

window.addEventListener("load", centerActiveCharacter);
mobileCharacterQuery.addEventListener("change", centerActiveCharacter);

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a, .character-slot");
  if (!target) return;
  if (target.id === "intro-start") return;
  if (target.id === "open-project" || target.classList.contains("character-slot")) return;
  if (target.id === "story-prev" || target.id === "story-next" || target.id === "sound-toggle") return;
  playSfx(cursorSfx, 0.55);
});

tryPlayBgm();
window.addEventListener("pointerdown", unlockBgmOnce);
window.addEventListener("keydown", unlockBgmOnce);
selectMember(selectedKey);
