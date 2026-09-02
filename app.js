/**
 * ==========================================================================
 * OmniAI - OpenRouter AI Chatbot JavaScript
 * ==========================================================================
 * 
 * [실습용 OpenRouter API Key 설정]
 * 아래 DEFAULT_OPENROUTER_KEY 변수에 오픈라우터에서 발급받은 API 키(sk-or-v1-...)를 
 * 따옴표 안에 직접 넣어두시면, 페이지에 접속할 때마다 자동으로 키가 입력되어 실습이 편리해집니다.
 */
const DEFAULT_OPENROUTER_KEY = ''; // 예: 'sk-or-v1-xxxxxxxxxxxxxxxx'

// ==========================================================================
// Application State
// ==========================================================================
const state = {
  messages: [],             // Chat history format: [{ role: 'user'|'assistant'|'system', content: '' }]
  isGenerating: false,      // Generation status
  abortController: null,    // Abort controller to cancel stream
};

// ==========================================================================
// DOM Elements
// ==========================================================================
const elements = {
  // Sidebar & Config
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

  // Header
  currentModelDisplay: document.getElementById('currentModelDisplay'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),

  // Messages Area
  messagesContainer: document.getElementById('messagesContainer'),
  welcomeScreen: document.getElementById('welcomeScreen'),
  chatThread: document.getElementById('chatThread'),

  // Form & Inputs
  chatForm: document.getElementById('chatForm'),
  userInput: document.getElementById('userInput'),
  sendBtn: document.getElementById('sendBtn'),
  stopBtn: document.getElementById('stopBtn'),

  // Suggestion Chips
  chips: document.querySelectorAll('.chip')
};

// ==========================================================================
// Marked & Highlight.js Renderer Configuration
// ==========================================================================
function setupMarkdownRenderer() {
  if (typeof marked !== 'undefined') {
    const renderer = new marked.Renderer();

    // Custom Code Block Renderer with Language Label and Copy Button
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

// Utility: Escape HTML
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Global helper for code block copy button
window.copyToClipboard = function (button) {
  const codeBlock = button.closest('.code-block-wrapper').querySelector('code');
  const textToCopy = codeBlock.innerText;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML = `<i class="fa-solid fa-check" style="color: var(--success-color);"></i> 복사됨!`;
    setTimeout(() => {
      button.innerHTML = originalHTML;
    }, 2000);
  }).catch(err => {
    console.error('복사 실패:', err);
  });
};

// ==========================================================================
// Initialization & Event Listeners
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupMarkdownRenderer();
  initKeyAndSettings();
  attachEventListeners();
});

// Initialize API Key and Saved Settings
function initKeyAndSettings() {
  // Check if default key in code exists
  if (DEFAULT_OPENROUTER_KEY && DEFAULT_OPENROUTER_KEY.trim() !== '') {
    elements.apiKeyInput.value = DEFAULT_OPENROUTER_KEY.trim();
  } else {
    // Check localStorage fallback
    const savedKey = localStorage.getItem('omni_openrouter_key');
    if (savedKey) elements.apiKeyInput.value = savedKey;
  }

  // Update selected model display header
  updateModelDisplay();
}

// Update model display header label
function updateModelDisplay() {
  const selectedOption = elements.modelSelect.options[elements.modelSelect.selectedIndex];
  elements.currentModelDisplay.textContent = selectedOption.text.split('(')[0].trim();
}

// Attach all DOM event listeners
function attachEventListeners() {
  // Save API Key to localStorage on change
  elements.apiKeyInput.addEventListener('input', (e) => {
    localStorage.setItem('omni_openrouter_key', e.target.value.trim());
  });

  // Toggle API key visibility
  elements.togglePasswordBtn.addEventListener('click', () => {
    const isPassword = elements.apiKeyInput.type === 'password';
    elements.apiKeyInput.type = isPassword ? 'text' : 'password';
    elements.togglePasswordBtn.querySelector('i').className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
  });

  // Temperature slider display update
  elements.temperatureInput.addEventListener('input', (e) => {
    elements.tempValue.textContent = e.target.value;
  });

  // Model select change
  elements.modelSelect.addEventListener('change', updateModelDisplay);

  // Sidebar toggle for mobile
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

  // New Chat Button
  elements.newChatBtn.addEventListener('click', resetChat);
  elements.clearHistoryBtn.addEventListener('click', resetChat);

  // Auto-resize input textarea & Submit on Enter
  elements.userInput.addEventListener('input', autoResizeTextarea);
  elements.userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      elements.chatForm.dispatchEvent(new Event('submit'));
    }
  });

  // Suggestion Chips
  elements.chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt');
      elements.userInput.value = promptText;
      autoResizeTextarea();
      elements.chatForm.dispatchEvent(new Event('submit'));
    });
  });

  // Form submit handler
  elements.chatForm.addEventListener('submit', handleFormSubmit);

  // Stop button handler
  elements.stopBtn.addEventListener('click', stopGeneration);
}

// Auto-adjust textarea height up to limit
function autoResizeTextarea() {
  elements.userInput.style.height = 'auto';
  elements.userInput.style.height = Math.min(elements.userInput.scrollHeight, 160) + 'px';
}

// Reset Chat Thread
function resetChat() {
  if (state.isGenerating) {
    stopGeneration();
  }
  state.messages = [];
  elements.chatThread.innerHTML = '';
  elements.welcomeScreen.classList.remove('hidden');
  setStatus('준비됨', false);
}

// Set status indicator
function setStatus(text, isBusy = false) {
  elements.statusText.textContent = text;
  if (isBusy) {
    elements.statusDot.classList.add('busy');
  } else {
    elements.statusDot.classList.remove('busy');
  }
}

// Toggle generating state (Updates UI buttons)
function setGeneratingState(isGenerating) {
  state.isGenerating = isGenerating;
  if (isGenerating) {
    elements.sendBtn.classList.add('hidden');
    elements.stopBtn.classList.remove('hidden');
    setStatus('답변 생성 중...', true);
  } else {
    elements.sendBtn.classList.remove('hidden');
    elements.stopBtn.classList.add('hidden');
    setStatus('준비됨', false);
  }
}

// Stop current generation stream
function stopGeneration() {
  if (state.abortController) {
    state.abortController.abort();
    state.abortController = null;
  }
  setGeneratingState(false);
}

// ==========================================================================
// Chat Logic & OpenRouter API Call
// ==========================================================================
async function handleFormSubmit(e) {
  e.preventDefault();

  const userText = elements.userInput.value.trim();
  const apiKey = elements.apiKeyInput.value.trim();

  if (!userText) return;

  if (!apiKey) {
    alert('OpenRouter API Key를 입력하거나 코드(app.js) 상단의 DEFAULT_OPENROUTER_KEY에 키를 설정해주세요!');
    elements.apiKeyInput.focus();
    return;
  }

  // Hide welcome screen on first message
  if (!elements.welcomeScreen.classList.contains('hidden')) {
    elements.welcomeScreen.classList.add('hidden');
  }

  // Reset input field
  elements.userInput.value = '';
  elements.userInput.style.height = 'auto';

  // Append User Message to UI & State
  appendMessage('user', userText);
  state.messages.push({ role: 'user', content: userText });

  // Prepare Assistant Message Bubble for Streaming
  const assistantBubble = appendMessage('assistant', '');
  const contentElement = assistantBubble.querySelector('.message-content');
  contentElement.classList.add('streaming-cursor');

  // Set streaming state
  setGeneratingState(true);
  state.abortController = new AbortController();

  // Construct request payload
  const model = elements.modelSelect.value;
  const temperature = parseFloat(elements.temperatureInput.value);
  const userSystemPrompt = elements.systemPromptInput.value.trim();
  const isWebSearchEnabled = elements.webSearchToggle ? elements.webSearchToggle.checked : false;

  // Fact-checking / Web search instructions
  const webSearchInstruction = isWebSearchEnabled
    ? "최신 정보나 구체적인 사실(뉴스, 최신 기술, 사실 관계 등)을 질문받았을 때는 반드시 웹 검색(Web Search) 결과 및 최신 데이터를 참고하여 객관적 사실만을 바탕으로 검증된 신뢰할 수 있는 답변을 제공하세요. 불확실하거나 근거가 없는 무분별한 추측(환각/거짓말)은 절대로 하지 마세요."
    : "";

  const finalSystemPrompt = [userSystemPrompt, webSearchInstruction].filter(Boolean).join("\n\n");

  const apiMessages = [];
  if (finalSystemPrompt) {
    apiMessages.push({ role: 'system', content: finalSystemPrompt });
  }
  apiMessages.push(...state.messages);

  // Request Body Payload
  const requestBody = {
    model: model,
    messages: apiMessages,
    temperature: temperature,
    stream: true
  };

  // Enable OpenRouter Web Search Plugin if toggled
  if (isWebSearchEnabled) {
    requestBody.plugins = [
      {
        id: "web"
      }
    ];
  }

  let fullResponseText = '';

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin || 'http://localhost',
        'X-Title': 'OmniAI Single Page Chatbot'
      },
      body: JSON.stringify(requestBody),
      signal: state.abortController.signal
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP 오류: ${response.status}`;
      throw new Error(errorMessage);
    }

    // Read SSE ReadableStream
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // Keep last incomplete line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(':')) continue;

        if (trimmed === 'data: [DONE]') {
          break;
        }

        if (trimmed.startsWith('data: ')) {
          const jsonStr = trimmed.slice(6);
          try {
            const data = JSON.parse(jsonStr);
            const delta = data.choices?.[0]?.delta;
            if (delta) {
              const content = delta.content || delta.reasoning || '';
              if (content) {
                fullResponseText += content;
                // Render Markdown in real time
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

    // Save final response to history state
    state.messages.push({ role: 'assistant', content: fullResponseText });

  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Stream generation aborted by user.');
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

// Append Message UI Component
function appendMessage(role, text) {
  const wrapper = document.createElement('div');
  wrapper.className = `message-wrapper ${role}`;

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.innerHTML = role === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

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

// Scroll messages to bottom smoothly
function scrollToBottom() {
  elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}
