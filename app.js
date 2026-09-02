/**
 * ==========================================================================
 * OmniAI - 서울시 교육 공공서비스예약 AI 가이드 JavaScript
 * ==========================================================================
 * 
 * [실습용 OpenRouter API Key 설정]
 * 아래 DEFAULT_OPENROUTER_KEY 변수에 오픈라우터 API 키를 입력해 두시면 자동 로드됩니다.
 */
const DEFAULT_OPENROUTER_KEY = '78666347696b616f38395043566a6f';

// ==========================================================================
// 서울시 교육 공공서비스예약 데이터셋 (OA-2268 연동 데이터)
// ==========================================================================
const seoulEduData = [
  {
    id: "S260210133959300415",
    category: "역사",
    status: "접수종료",
    title: "2026년 상·하반기 '내 친구 박물관' 교육생 모집",
    cost: "무료",
    place: "서울역사박물관",
    target: "어린이(내 친구 박물관)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260210133959300415",
    district: "종로구",
    tel: "02-724-0236,191",
    details: "초등학생 대상 시청각 및 보드게임 학습 역사 교육"
  },
  {
    id: "S260519103905622756",
    category: "역사",
    status: "접수종료",
    title: "내 인생의 18번, 시대의 명곡이 되다 수강생 모집",
    cost: "무료",
    place: "서울역사박물관",
    target: "성인(55세 이상 성인)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260519103905622756",
    district: "종로구",
    tel: "02-724-0199 / 0196",
    details: "시니어 대상 시대의 명곡 역사 문화 강좌"
  },
  {
    id: "S260622155501556026",
    category: "역사",
    status: "접수종료",
    title: "제49기 <중학생 인턴제> 수강생 모집",
    cost: "무료",
    place: "서울역사박물관",
    target: "청소년(중학생 1-3학년)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260622155501556026",
    district: "종로구",
    tel: "02-724-0236, 0193",
    details: "중학생 대상 박물관 진로 직업 인턴 체험 프로그램"
  },
  {
    id: "S260804164236879206",
    category: "역사",
    status: "접수종료",
    title: "2026 서울역사박물관대학 (심화반)",
    cost: "무료",
    place: "서울역사박물관",
    target: "성인",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260804164236879206",
    district: "종로구",
    tel: "02-724-0199, 0280",
    details: "성인 대상 역사 강연 인문학 심화 과정"
  },
  {
    id: "S260806090535821750",
    category: "역사",
    status: "예약마감",
    title: "2026년 하반기 '우리 가족 경희궁 탐험대' 교육생 모집",
    cost: "무료",
    place: "서울역사박물관",
    target: "가족(초등학교 1~6학년 자녀 동반 가족)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260806090535821750",
    district: "종로구",
    tel: "02-724-9750, 0196",
    details: "초등 자녀 동반 가족 궁궐 경희궁 탐험 생태 역사 체험"
  },
  {
    id: "S260821162002108928",
    category: "자연/과학",
    status: "접수중",
    title: "[월드컵공원] 꽁지 불빛 반딧불이 해설(9월)",
    cost: "무료",
    place: "서울특별시 산악문화체험센터>반딧불이생태관",
    target: "제한없음",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260821162002108928",
    district: "마포구",
    tel: "02-302-6687",
    details: "환경지표곤충 반딧불이 생태 해설 프로그램 (화요일 운영)"
  },
  {
    id: "S260820162219957629",
    category: "자연/과학",
    status: "접수중",
    title: "[월드컵공원] 누에 생태 체험(9월)",
    cost: "무료",
    place: "서울특별시 산악문화체험센터>누에생태체험장",
    target: "제한없음",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260820162219957629",
    district: "마포구",
    tel: "02-300-5574, 02-302-7363",
    details: "누에 알, 애벌레, 누에고치 명주실 뽑기 생태 해설"
  },
  {
    id: "S241020135353369824",
    category: "자연/과학",
    status: "예약마감",
    title: "[강서습지]어른이를 위한 꼼지락 공방 - 걱정인형 만들기 -",
    cost: "무료",
    place: "강서한강공원>강서습지생태공원",
    target: "성인",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S241020135353369824",
    district: "강서구",
    tel: "02-3661-7133",
    details: "성인 대상 실내 무료 수공예 공방 체험"
  },
  {
    id: "S260221153407453243",
    category: "자연/과학",
    status: "접수종료",
    title: "[강서습지] 강서습지 새를 보다 -새, 사랑을 노래하다-",
    cost: "무료",
    place: "강서한강공원>강서습지생태공원",
    target: "가족(초등이상 포함 가족)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260221153407453243",
    district: "강서구",
    tel: "02-3661-7133",
    details: "가족 대상 강서습지 조류 탐조 야외 생태 교육"
  },
  {
    id: "S260224162339790929",
    category: "자연/과학",
    status: "접수종료",
    title: "[강서습지] 한강 생태 밧줄놀이 -봄꽃 친구 밧줄정원-",
    cost: "무료",
    place: "강서한강공원>강서습지생태공원",
    target: "가족(초등 이상 아동 동반 가족)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260224162339790929",
    district: "강서구",
    tel: "02-3661-7133",
    details: "초등 아동 동반 가족 밧줄 야외 생태 놀이 체험"
  },
  {
    id: "S260823161642403048",
    category: "자연/과학",
    status: "접수중",
    title: "[강서습지] 강서습지 새를 보다 -새의 흔적을 찾아라-",
    cost: "무료",
    place: "강서한강공원>강서습지생태공원",
    target: "가족(초등이상 포함 가족)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260823161642403048",
    district: "강서구",
    tel: "02-3661-7133",
    details: "강서습지 야외 철새 흔적 탐구 가족 생태 탐방"
  },
  {
    id: "S260823162102711417",
    category: "자연/과학",
    status: "예약마감",
    title: "[강서습지]어른이를 위한 꼼지락 공방 -나뭇잎 키링 만들기 -",
    cost: "무료",
    place: "강서한강공원>강서습지생태공원",
    target: "성인",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260823162102711417",
    district: "강서구",
    tel: "02-3661-7133",
    details: "성인 대상 나뭇잎 활용 액세서리 키링 만들기"
  },
  {
    id: "S260823162429077645",
    category: "자연/과학",
    status: "접수중",
    title: "[강서습지] 한강 생태 밧줄놀이 -숲속의 점프왕, 메뚜기-",
    cost: "무료",
    place: "강서한강공원>강서습지생태공원",
    target: "가족(초등 이상 아동 동반 가족)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260823162429077645",
    district: "강서구",
    tel: "02-3661-7133",
    details: "메뚜기 관찰 및 밧줄 놀이 가족 생태 프로그램"
  },
  {
    id: "S260826103733650639",
    category: "도시농업",
    status: "예약마감",
    title: "9/6(일) 서울어린이대공원 꼬마 텃밭 학교_16탄 \"손수건 에코프린트 만들기\"",
    cost: "유료",
    place: "서울어린이대공원>어린이대공원 후문 텃밭",
    target: "가족(4세~12세 어린이 동반 가족)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260826103733650639",
    district: "광진구",
    tel: "02-450-9338",
    details: "어린이 텃밭 에코프린트 손수건 농사 생태 체험"
  },
  {
    id: "S260821132811073194",
    category: "자연/과학",
    status: "예약마감",
    title: "2026유아생태학교(9월,가을곤충)",
    cost: "무료",
    place: "길동생태공원",
    target: "유아(어린이집 5~7세)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260821132811073194",
    district: "강동구",
    tel: "02-460-2909",
    details: "유아 및 어린이집 대상 가을 곤충 생태 학교"
  },
  {
    id: "S260821140019406777",
    category: "자연/과학",
    status: "예약마감",
    title: "2026소소한 자연공작소(9월, 포도껍질염색)",
    cost: "유료",
    place: "길동생태공원",
    target: "가족(7세이상+보호자)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260821140019406777",
    district: "강동구",
    tel: "02-460-2909",
    details: "포도껍질 활용 천연 염색 공작 체험"
  },
  {
    id: "S260821140351810750",
    category: "자연/과학",
    status: "예약마감",
    title: "역사 속 식물이야기(9월, 토종허브심기)",
    cost: "유료",
    place: "길동생태공원",
    target: "가족(7세이상+보호자)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260821140351810750",
    district: "강동구",
    tel: "02-460-2909",
    details: "토종 허브 심기 및 역사 식물 이야기 가족 체험"
  },
  {
    id: "S260821140812225025",
    category: "자연/과학",
    status: "접수중",
    title: "명화 속 나무이야기(국화, 양버즘)9월",
    cost: "유료",
    place: "길동생태공원",
    target: "성인",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260821140812225025",
    district: "강동구",
    tel: "02-472-2799",
    details: "성인 대상 명화 속에 등장하는 국화 및 나무 인문학 강좌"
  },
  {
    id: "S260211094553640419",
    category: "역사",
    status: "접수중",
    title: "[한성백제박물관] 초등 4~6학년 단체 대면 교육 <한강삼국지: 삼국의 한강 쟁탈전>",
    cost: "무료",
    place: "한성백제박물관",
    target: "초등학생(4-6학년 학급 단체)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260211094553640419",
    district: "송파구",
    tel: "02-2152-5852",
    details: "삼국의 한강 쟁탈전 탐구, 몽촌토성 탐방, 아차산 보루 입체카드 만들기"
  },
  {
    id: "S260211102205346964",
    category: "역사",
    status: "접수중",
    title: "[한성백제박물관] 초등 4~6학년 학급 비대면 교육 <한강삼국지: 삼국의 한강 쟁탈전>",
    cost: "무료",
    place: "한성백제박물관",
    target: "초등학생(4-6학년 학급 원격)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260211102205346964",
    district: "송파구",
    tel: "02-2152-5852",
    details: "실시간 원격 비대면 한강 삼국 역사 교육 및 피규어 만들기"
  },
  {
    id: "S260318091048885429",
    category: "역사",
    status: "안내중",
    title: "[한성백제박물관] 서울 고대유적 탐방 및 만들기 체험(테라리움, 가죽공예, 조향체험)",
    cost: "무료",
    place: "한성백제박물관",
    target: "성인(일반성인, 중장년, 시니어)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260318091048885429",
    district: "송파구",
    tel: "02-2152-5852",
    details: "몽촌토성, 풍납동토성, 석촌동고분군 유적 탐방 및 향수/가죽공예 만들기"
  },
  {
    id: "S260801130033084929",
    category: "역사",
    status: "접수중",
    title: "[한성백제박물관] 초등 4~6학년 단체 대면 교육 <서울 쏙! 백제 콕!>(목ㆍ금)",
    cost: "무료",
    place: "한성백제박물관",
    target: "초등학생(4-6학년 학급)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260801130033084929",
    district: "송파구",
    tel: "02-2152-5838",
    details: "서울 속 백제 유물을 통해 백제의 탄생과 성장을 알아보는 탐구 역사 교실"
  },
  {
    id: "S260806101937603574",
    category: "역사",
    status: "접수중",
    title: "[한성백제박물관] 초등 4~6학년 단체 비대면 교육 <서울 쏙! 백제 콕!>(목ㆍ금)",
    cost: "무료",
    place: "한성백제박물관",
    target: "초등학생(4-6학년 원격)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260806101937603574",
    district: "송파구",
    tel: "02-2152-5838",
    details: "전국 초등 4~6학년 대상 실시간 온라인 백제 유물 비대면 수업"
  },
  {
    id: "S260806134535936093",
    category: "역사",
    status: "접수중",
    title: "[한성백제박물관] 하반기 장애인 단체 대면 교육 <옛날옛날, 빛나는 백제 이야기>",
    cost: "무료",
    place: "한성백제박물관",
    target: "장애인(지적, 정서, 지체)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260806134535936093",
    district: "송파구",
    tel: "02-2152-5839",
    details: "특수학급 및 장애인 단체 맞춤형 박물관 백제 역사 체험"
  },
  {
    id: "S260827103049658240",
    category: "역사",
    status: "예약마감",
    title: "[한성백제박물관] 2026년 하반기 주말가족교육<찾아라! 백제 왕성 속 비밀들>",
    cost: "무료",
    place: "한성백제박물관",
    target: "가족(직계가족)",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260827103049658240",
    district: "송파구",
    tel: "02-2152-5834",
    details: "매주 토요일 몽촌토성 발굴 성과 중심 백제 왕성 가족 체험"
  },
  {
    id: "S260223124613897595",
    category: "기타",
    status: "접수중",
    title: "강서구 가양3동주민센터 2층 강의실 대관",
    cost: "유료",
    place: "강서구 가양3동주민센터",
    target: "제한없음",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S260223124613897595",
    district: "강서구",
    tel: "02-2600-7848",
    details: "교육 및 주민모임을 위한 자치회관 강의실 대관"
  },
  {
    id: "S240607144250707220",
    category: "역사",
    status: "접수중",
    title: "송파문화관광 해설(풍납동토성길)",
    cost: "무료",
    place: "송파구청 (풍납동토성길)",
    target: "제한없음",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S240607144250707220",
    district: "송파구",
    tel: "02-2147-2110",
    details: "풍납근린공원, 경당역사공원, 풍납동토성 전문 문화관광 해설 (2시간)"
  },
  {
    id: "S240607145943269835",
    category: "역사",
    status: "접수중",
    title: "송파문화관광 해설(몽촌토성길)",
    cost: "무료",
    place: "송파구청 (몽촌토성길)",
    target: "제한없음",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S240607145943269835",
    district: "송파구",
    tel: "02-2147-2110",
    details: "평화의 문, 곰말다리, 망월봉, 몽촌토성 발굴 현장 역사 해설"
  },
  {
    id: "S240607152152531185",
    category: "역사",
    status: "접수중",
    title: "송파문화관광 해설(석촌동고분군길)",
    cost: "무료",
    place: "송파구청 (석촌동고분군길)",
    target: "제한없음",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S240607152152531185",
    district: "송파구",
    tel: "02-2147-2110",
    details: "삼전도비, 석촌호수, 석촌동 고분군 백제 역사 해설 투어"
  },
  {
    id: "S240613105142565240",
    category: "역사",
    status: "접수중",
    title: "송파문화관광 해설(야간해설)",
    cost: "무료",
    place: "송파구청 (야간 코스)",
    target: "제한없음",
    url: "https://yeyak.seoul.go.kr/web/reservation/selectReservView.do?rsv_svc_id=S240613105142565240",
    district: "송파구",
    tel: "02-2147-2110",
    details: "금·토요일 18시 야간 송파 역사 문화 유적 야간 해설"
  }
];

// Application State
const state = {
  messages: [],
  isGenerating: false,
  abortController: null,
};

// DOM Elements
const elements = {
  sidebar: document.getElementById('sidebar'),
  sidebarOverlay: document.getElementById('sidebarOverlay'),
  openSidebarBtn: document.getElementById('openSidebarBtn'),
  closeSidebarBtn: document.getElementById('closeSidebarBtn'),
  newChatBtn: document.getElementById('newChatBtn'),
  apiKeyInput: document.getElementById('apiKeyInput'),
  togglePasswordBtn: document.getElementById('togglePasswordBtn'),
  modelSelect: document.getElementById('modelSelect'),
  webSearchToggle: document.getElementById('webSearchToggle'),
  temperatureInput: document.getElementById('temperatureInput'),
  tempValue: document.getElementById('tempValue'),
  systemPromptInput: document.getElementById('systemPromptInput'),
  statusDot: document.getElementById('statusDot'),
  statusText: document.getElementById('statusText'),

  totalCourseCount: document.getElementById('totalCourseCount'),
  activeCourseCount: document.getElementById('activeCourseCount'),

  currentModelDisplay: document.getElementById('currentModelDisplay'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),

  messagesContainer: document.getElementById('messagesContainer'),
  welcomeScreen: document.getElementById('welcomeScreen'),
  chatThread: document.getElementById('chatThread'),

  chatForm: document.getElementById('chatForm'),
  userInput: document.getElementById('userInput'),
  sendBtn: document.getElementById('sendBtn'),
  stopBtn: document.getElementById('stopBtn'),

  chips: document.querySelectorAll('.chip')
};

// Configure Marked Renderer for HTML links and code
function setupMarkdownRenderer() {
  if (typeof marked !== 'undefined') {
    const renderer = new marked.Renderer();

    // Render clickable links with blank target & custom button class if reservation link
    renderer.link = function (href, title, text) {
      const isRsvUrl = href.includes('yeyak.seoul.go.kr');
      if (isRsvUrl) {
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="rsv-link-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${text || '공공서비스 예약 바로가기'}</a>`;
      }
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    };

    renderer.code = function (code, lang) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'text';
      let highlightedCode = code;
      if (typeof hljs !== 'undefined') {
        try {
          highlightedCode = hljs.highlight(code, { language }).value;
        } catch (e) {
          highlightedCode = escapeHtml(code);
        }
      } else {
        highlightedCode = escapeHtml(code);
      }

      return `
        <div class="code-block-wrapper">
          <div class="code-header">
            <span><i class="fa-solid fa-code"></i> ${language}</span>
            <button class="copy-code-btn" onclick="copyToClipboard(this)">
              <i class="fa-regular fa-copy"></i> 복사
            </button>
          </div>
          <pre><code class="hljs language-${language}">${highlightedCode}</code></pre>
        </div>
      `;
    };

    marked.setOptions({
      renderer: renderer,
      gfm: true,
      breaks: true
    });
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

window.copyToClipboard = function (button) {
  const codeBlock = button.closest('.code-block-wrapper').querySelector('code');
  const textToCopy = codeBlock.innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML = `<i class="fa-solid fa-check" style="color: var(--success-color);"></i> 복사됨!`;
    setTimeout(() => {
      button.innerHTML = originalHTML;
    }, 2000);
  });
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupMarkdownRenderer();
  initDatasetStats();
  initKeyAndSettings();
  attachEventListeners();
});

// Update Dataset Counts
function initDatasetStats() {
  if (elements.totalCourseCount) {
    elements.totalCourseCount.textContent = seoulEduData.length;
  }
  if (elements.activeCourseCount) {
    const activeCount = seoulEduData.filter(item => item.status === '접수중').length;
    elements.activeCourseCount.textContent = activeCount;
  }
}

function initKeyAndSettings() {
  const savedKey = localStorage.getItem('omni_openrouter_key');
  let keyToUse = '';
  
  if (DEFAULT_OPENROUTER_KEY && DEFAULT_OPENROUTER_KEY.trim() !== '') {
    keyToUse = DEFAULT_OPENROUTER_KEY.trim();
  } else if (savedKey && savedKey.trim() !== '') {
    keyToUse = savedKey.trim();
  }

  if (keyToUse) {
    if (!keyToUse.startsWith('sk-or-v1-')) {
      keyToUse = 'sk-or-v1-' + keyToUse;
    }
    elements.apiKeyInput.value = keyToUse;
  }
  updateModelDisplay();
}

function updateModelDisplay() {
  const selectedOption = elements.modelSelect.options[elements.modelSelect.selectedIndex];
  elements.currentModelDisplay.textContent = selectedOption.text.split('(')[0].trim();
}

function attachEventListeners() {
  elements.apiKeyInput.addEventListener('input', (e) => {
    localStorage.setItem('omni_openrouter_key', e.target.value.trim());
  });

  elements.togglePasswordBtn.addEventListener('click', () => {
    const isPassword = elements.apiKeyInput.type === 'password';
    elements.apiKeyInput.type = isPassword ? 'text' : 'password';
    elements.togglePasswordBtn.querySelector('i').className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
  });

  elements.temperatureInput.addEventListener('input', (e) => {
    elements.tempValue.textContent = e.target.value;
  });

  elements.modelSelect.addEventListener('change', updateModelDisplay);

  elements.openSidebarBtn.addEventListener('click', () => {
    elements.sidebar.classList.add('active');
    elements.sidebarOverlay.classList.add('active');
  });

  elements.closeSidebarBtn.addEventListener('click', closeSidebar);
  elements.sidebarOverlay.addEventListener('click', closeSidebar);

  function closeSidebar() {
    elements.sidebar.classList.remove('active');
    elements.sidebarOverlay.classList.remove('active');
  }

  elements.newChatBtn.addEventListener('click', resetChat);
  elements.clearHistoryBtn.addEventListener('click', resetChat);

  elements.userInput.addEventListener('input', autoResizeTextarea);
  elements.userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      elements.chatForm.dispatchEvent(new Event('submit'));
    }
  });

  elements.chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt');
      elements.userInput.value = promptText;
      autoResizeTextarea();
      elements.chatForm.dispatchEvent(new Event('submit'));
    });
  });

  elements.chatForm.addEventListener('submit', handleFormSubmit);
  elements.stopBtn.addEventListener('click', stopGeneration);
}

function autoResizeTextarea() {
  elements.userInput.style.height = 'auto';
  elements.userInput.style.height = Math.min(elements.userInput.scrollHeight, 160) + 'px';
}

function resetChat() {
  if (state.isGenerating) {
    stopGeneration();
  }
  state.messages = [];
  elements.chatThread.innerHTML = '';
  elements.welcomeScreen.classList.remove('hidden');
  setStatus('준비됨', false);
}

function setStatus(text, isBusy = false) {
  elements.statusText.textContent = text;
  if (isBusy) {
    elements.statusDot.classList.add('busy');
  } else {
    elements.statusDot.classList.remove('busy');
  }
}

function setGeneratingState(isGenerating) {
  state.isGenerating = isGenerating;
  if (isGenerating) {
    elements.sendBtn.classList.add('hidden');
    elements.stopBtn.classList.remove('hidden');
    setStatus('서울시 공공예약 정보 검색 및 답변 중...', true);
  } else {
    elements.sendBtn.classList.remove('hidden');
    elements.stopBtn.classList.add('hidden');
    setStatus('준비됨', false);
  }
}

function stopGeneration() {
  if (state.abortController) {
    state.abortController.abort();
    state.abortController = null;
  }
  setGeneratingState(false);
}

// RAG: Query Matcher for Seoul Education Reservation Dataset
function searchRelevantCourses(userQuery) {
  const query = userQuery.toLowerCase();

  // Scoring each course based on match
  const scored = seoulEduData.map(course => {
    let score = 0;

    // District match (종로구, 송파구, 마포구, 강서구, 강동구, 광진구 등)
    if (query.includes(course.district.toLowerCase())) score += 5;

    // Place match (한성백제박물관, 서울역사박물관, 강서습지, 월드컵공원, 길동생태공원 등)
    if (query.includes(course.place.toLowerCase()) || course.place.toLowerCase().split('>').some(p => query.includes(p))) score += 5;

    // Status match (접수중, 마감 등)
    if (query.includes('접수중') && course.status === '접수중') score += 4;

    // Cost match (무료, 유료)
    if (query.includes('무료') && course.cost === '무료') score += 3;
    if (query.includes('유료') && course.cost === '유료') score += 3;

    // Target match (어린이, 초등, 성인, 가족, 중학생, 유아, 장애인)
    if ((query.includes('어린이') || query.includes('초등')) && (course.target.includes('어린이') || course.target.includes('초등'))) score += 3;
    if (query.includes('가족') && course.target.includes('가족')) score += 3;
    if (query.includes('성인') && course.target.includes('성인')) score += 3;
    if ((query.includes('중학생') || query.includes('청소년')) && (course.target.includes('중학생') || course.target.includes('청소년'))) score += 3;

    // Category & Keyword match (역사, 자연, 과학, 생태, 박물관, 반딧불이, 누에, 밧줄, 탐방, 야간, 해설 등)
    const keywords = ['역사', '자연', '과학', '생태', '박물관', '반딧불이', '누에', '밧줄', '탐방', '야간', '해설', '공방', '곤충', '삼국지', '백제', '경희궁', '인턴'];
    keywords.forEach(kw => {
      if (query.includes(kw) && (course.title.includes(kw) || course.details.includes(kw) || course.category.includes(kw))) {
        score += 2;
      }
    });

    return { course, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // If top matches have score > 0, return top 7 matches, else return all active courses or top 6
  const topMatches = scored.filter(item => item.score > 0).map(item => item.course);
  if (topMatches.length > 0) {
    return topMatches.slice(0, 7);
  }

  // Default fallback: return current active courses & popular museum courses
  return seoulEduData.slice(0, 7);
}

// Chat Submission & API Call
async function handleFormSubmit(e) {
  e.preventDefault();

  const userText = elements.userInput.value.trim();
  if (!userText) return;

  let apiKey = elements.apiKeyInput.value.trim();
  if ((!apiKey || apiKey === 'sk-or-v1-') && typeof DEFAULT_OPENROUTER_KEY !== 'undefined' && DEFAULT_OPENROUTER_KEY.trim() !== '') {
    apiKey = DEFAULT_OPENROUTER_KEY.trim();
  }

  if (apiKey && !apiKey.startsWith('sk-or-v1-')) {
    apiKey = 'sk-or-v1-' + apiKey;
  }

  if (apiKey) {
    elements.apiKeyInput.value = apiKey;
  }

  if (!apiKey || apiKey.length < 15) {
    elements.sidebar.classList.add('active');
    elements.apiKeyInput.style.borderColor = 'var(--error-color)';
    elements.apiKeyInput.focus();
    alert('⚠️ OpenRouter API Key가 올바르지 않습니다!\n\n오픈라우터 키는 sk-or-v1-로 시작해야 합니다. 사이드바의 API Key 입력란을 확인해 주세요.');
    return;
  } else {
    elements.apiKeyInput.style.borderColor = '';
  }

  if (!elements.welcomeScreen.classList.contains('hidden')) {
    elements.welcomeScreen.classList.add('hidden');
  }

  elements.userInput.value = '';
  elements.userInput.style.height = 'auto';

  appendMessage('user', userText);
  state.messages.push({ role: 'user', content: userText });

  const assistantBubble = appendMessage('assistant', '');
  const contentElement = assistantBubble.querySelector('.message-content');
  contentElement.classList.add('streaming-cursor');

  setGeneratingState(true);
  state.abortController = new AbortController();

  const model = elements.modelSelect.value;
  const temperature = parseFloat(elements.temperatureInput.value);
  const userSystemPrompt = elements.systemPromptInput.value.trim();
  const isWebSearchEnabled = elements.webSearchToggle ? elements.webSearchToggle.checked : false;

  // Retrieve relevant Seoul Public Service Education Courses
  const matchedCourses = searchRelevantCourses(userText);

  // Format Context Data for LLM System Prompt
  const contextDataText = matchedCourses.map((item, idx) => `
[강좌 ${idx + 1}]
- 강좌명(SVCNM): ${item.title}
- 분류: ${item.category} | 상태(SVCSTATNM): ${item.status} | 수강료: ${item.cost}
- 장소(PLACENM): ${item.place} (${item.district})
- 이용대상(USETGTINFO): ${item.target}
- 예약 URL(SVCURL): ${item.url}
- 문의전화: ${item.tel}
- 상세설명: ${item.details}
`).join("\n");

  const seoulGuideSystemPrompt = `
당신은 '서울시 공공서비스예약 교육·강좌 전문 AI 가이드'입니다.
사용자가 서울시 공공 서비스 교육, 박물관 강좌, 생태 체험, 문화관광 해설 등에 대해 질문하면 아래 제공된 [서울시 공공예약 공식 데이터]를 바탕으로 정중하고 친절하며 명확하게 안내하세요.

[수집된 서울시 공공예약 공식 데이터]
${contextDataText}

[답변 작성 수칙]
1. 사용자의 질문에 부합하는 강좌를 적극적으로 추천하고 안내하세요.
2. 각 강좌 안내 시 다음 항목을 가독성 좋은 마크다운 형식으로 명확히 정리하세요:
   - 📌 **강좌명**
   - 🏢 **장소 및 지역**: 장소명 (자치구)
   - 🟢 **접수상태**: [접수중 / 접수종료 / 예약마감 등]
   - 💰 **수강료**: [무료 / 유료]
   - 👥 **이용대상**
   - 📞 **문의전화**
   - 🔗 **예약 바로가기**: 반드시 마크다운 링크 형식 \`[예약하러 가기](SVCURL)\` 로 제공하세요!
3. 강좌 상태가 '접수중'인 경우 예약 바로가기 링크를 이용해 신청하도록 안내하세요.
4. 데이터에 존재하지 않는 허구의 예약 정보(환각/거짓말)는 만들지 마시고, 데이터에 있는 정확한 정보만을 바탕으로 전달하세요.
${userSystemPrompt ? "\n[추가 유저 지침]\n" + userSystemPrompt : ""}
`;

  const apiMessages = [
    { role: 'system', content: seoulGuideSystemPrompt },
    ...state.messages
  ];

  const requestBody = {
    model: model,
    messages: apiMessages,
    temperature: temperature,
    stream: true
  };

  if (isWebSearchEnabled) {
    requestBody.plugins = [{ id: "web" }];
  }

  let fullResponseText = '';

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin || 'http://localhost',
        'X-Title': 'Seoul Public Education AI Guide'
      },
      body: JSON.stringify(requestBody),
      signal: state.abortController.signal
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP 오류: ${response.status}`;
      throw new Error(errorMessage);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(':')) continue;

        if (trimmed === 'data: [DONE]') break;

        if (trimmed.startsWith('data: ')) {
          const jsonStr = trimmed.slice(6);
          try {
            const data = JSON.parse(jsonStr);
            const delta = data.choices?.[0]?.delta;
            if (delta) {
              const content = delta.content || delta.reasoning || '';
              if (content) {
                fullResponseText += content;
                if (typeof marked !== 'undefined') {
                  contentElement.innerHTML = marked.parse(fullResponseText);
                } else {
                  contentElement.textContent = fullResponseText;
                }
                scrollToBottom();
              }
            }
          } catch (err) {
            console.error('JSON parsing error:', err);
          }
        }
      }
    }

    state.messages.push({ role: 'assistant', content: fullResponseText });

  } catch (error) {
    if (error.name === 'AbortError') {
      if (fullResponseText) {
        state.messages.push({ role: 'assistant', content: fullResponseText });
      }
    } else {
      console.error('OpenRouter API Error:', error);
      contentElement.innerHTML = `<div style="color: var(--error-color);"><i class="fa-solid fa-triangle-exclamation"></i> <strong>오류 발생:</strong> ${escapeHtml(error.message)}</div>`;
    }
  } finally {
    contentElement.classList.remove('streaming-cursor');
    setGeneratingState(false);
    state.abortController = null;
    scrollToBottom();
  }
}

function appendMessage(role, text) {
  const wrapper = document.createElement('div');
  wrapper.className = `message-wrapper ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.innerHTML = role === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-graduation-cap"></i>';

  const content = document.createElement('div');
  content.className = 'message-content';

  if (role === 'assistant' && text) {
    content.innerHTML = typeof marked !== 'undefined' ? marked.parse(text) : escapeHtml(text);
  } else {
    content.textContent = text;
  }

  wrapper.appendChild(avatar);
  wrapper.appendChild(content);
  elements.chatThread.appendChild(wrapper);

  scrollToBottom();
  return wrapper;
}

function scrollToBottom() {
  elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}
