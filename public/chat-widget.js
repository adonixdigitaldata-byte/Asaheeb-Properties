/**
 * ===================================================================
 *  Asaheeb Properties - Floating AI Chat Widget
 *  ودجت شات بوت عائم مخصص لموقع عقارات - متصل بـ n8n Webhook
 * ===================================================================
 *
 *  طريقة الاستخدام:
 *  1) ضع هذا الملف على موقعك (مثلاً: /widget/chat-widget.js)
 *  2) عدّل الإعدادات في كائن CONFIG أدناه (خاصة webhookUrl و avatarUrl)
 *  3) أضف السطر التالي قبل إغلاق </body> في صفحات الموقع:
 *     <script src="/widget/chat-widget.js" defer></script>
 *  لا حاجة لأي ملف CSS أو HTML منفصل — كل شيء يُبنى ديناميكياً بالـ JS.
 * ===================================================================
 */

(function () {
  "use strict";

  // ==================== ⚙️ الإعدادات — عدّل هنا فقط ====================
  const CONFIG = {
    // رابط الـ Webhook الخاص بـ n8n (عقدة "When chat message received")
    webhookUrl: "https://studio.adonixai.cloud/webhook/55037a2a-9308-4719-8b0e-97e669bfdfa8/chat",

    // صورة الشخصية الكرتونية للمساعد (رابط صورة دائرية، يفضل PNG شفاف)
    avatarUrl: "https://i.ibb.co/HDykxbCP/Asaheeb-real-estate-assistant.jpg",

    // اسم المساعد الذي يظهر في رأس نافذة الشات
    agentName: "مساعد أساهيب العقاري | Asaheeb Assistant",

    // رسالة الترحيب الأولى (ثنائية اللغة - عربي / إنجليزي)
    welcomeMessage:
      "أهلاً بك في أساهيب العقارية! يسعدنا مساعدتك، كيف يمكننا خدمتك اليوم؟\nWelcome to Asaheeb Real Estate! We are happy to help you, how can we serve you today?",

    // موضع الزر: "right" أو "left"
    position: "right",

    // الألوان (هوية فاخرة ذهبية)
    colors: {
      gold: "#D4AF37",
      goldLight: "#F4E5B2",
      goldDark: "#9C7A1E",
      dark: "#1A1A1A",
      bgWindow: "#ffffff",
      userBubble: "#1A1A1A",
      botBubble: "#F7F3E8",
    },

    // اسم الجلسة (يُستخدم لربط الذاكرة sessionId في n8n)
    sessionKey: "asaheeb_chat_session_id",
  };
  // ======================================================================

  // ---------- توليد / استرجاع sessionId ثابت للمستخدم ----------
  function getSessionId() {
    let sid = localStorage.getItem(CONFIG.sessionKey);
    if (!sid) {
      sid =
        "sess_" +
        Date.now().toString(36) +
        "_" +
        Math.random().toString(36).substring(2, 10);
      localStorage.setItem(CONFIG.sessionKey, sid);
    }
    return sid;
  }

  const sessionId = getSessionId();
  const side = CONFIG.position === "left" ? "left" : "right";

  // ---------------------- CSS ----------------------
  const style = document.createElement("style");
  style.textContent = `
    :root {
      --asa-gold: ${CONFIG.colors.gold};
      --asa-gold-light: ${CONFIG.colors.goldLight};
      --asa-gold-dark: ${CONFIG.colors.goldDark};
      --asa-dark: ${CONFIG.colors.dark};
      --asa-bg: ${CONFIG.colors.bgWindow};
      --asa-user: ${CONFIG.colors.userBubble};
      --asa-bot: ${CONFIG.colors.botBubble};
    }

    #asa-chat-root, #asa-chat-root * {
      box-sizing: border-box;
      font-family: "Tajawal", "Segoe UI", Tahoma, Arial, sans-serif;
    }

    #asa-chat-root {
      position: fixed;
      bottom: 24px;
      ${side}: 24px;
      z-index: 999999;
      direction: rtl;
    }

    /* -------- الزر العائم -------- */
    .asa-fab {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #fff8e1, var(--asa-gold) 70%);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 3px solid var(--asa-gold);
      box-shadow: 0 4px 18px rgba(212, 175, 55, 0.55);
      position: relative;
      overflow: visible;
      transition: transform 0.25s ease;
      animation: asa-glow 2.2s ease-in-out infinite;
    }
    .asa-fab:hover { transform: scale(1.07); }

    .asa-fab img {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #fff;
      background: #fff;
    }

    /* توهج ذهبي نابض */
    @keyframes asa-glow {
      0%   { box-shadow: 0 0 0px 0px rgba(212,175,55,0.6), 0 4px 18px rgba(212,175,55,0.5); }
      50%  { box-shadow: 0 0 22px 8px rgba(212,175,55,0.55), 0 4px 22px rgba(212,175,55,0.7); }
      100% { box-shadow: 0 0 0px 0px rgba(212,175,55,0.6), 0 4px 18px rgba(212,175,55,0.5); }
    }

    /* حلقة توهج دوارة إضافية */
    .asa-fab::before {
      content: "";
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      background: conic-gradient(from 0deg, var(--asa-gold), transparent, var(--asa-gold));
      opacity: 0.55;
      z-index: -1;
      animation: asa-rotate 4s linear infinite;
    }
    @keyframes asa-rotate {
      to { transform: rotate(360deg); }
    }

    /* نقطة إشعار صغيرة */
    .asa-fab .asa-dot {
      position: absolute;
      top: 2px;
      ${side === "left" ? "right" : "left"}: 2px;
      width: 14px;
      height: 14px;
      background: #ff4d4f;
      border: 2px solid #fff;
      border-radius: 50%;
    }

    /* -------- نافذة الشات -------- */
    .asa-window {
      position: absolute;
      bottom: 88px;
      ${side}: 0;
      width: 370px;
      max-width: 92vw;
      height: 540px;
      max-height: 75vh;
      background: var(--asa-bg);
      border-radius: 20px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.25), 0 0 0 2px var(--asa-gold);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform-origin: bottom ${side};
      transform: scale(0.85) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.28s cubic-bezier(.2,.9,.3,1.2);
    }
    .asa-window.asa-open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* رأس النافذة */
    .asa-header {
      background: linear-gradient(135deg, var(--asa-dark), #2c2416 60%, var(--asa-gold-dark));
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
    }
    .asa-header .asa-avatar-wrap {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      padding: 2px;
      background: conic-gradient(var(--asa-gold), var(--asa-gold-light), var(--asa-gold));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 0 10px rgba(212,175,55,0.7);
    }
    .asa-header .asa-avatar-wrap img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #1A1A1A;
    }
    .asa-header .asa-title {
      color: #fff;
      font-weight: 700;
      font-size: 15px;
    }
    .asa-header .asa-subtitle {
      color: var(--asa-gold-light);
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .asa-header .asa-status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #4CD964;
      box-shadow: 0 0 6px #4CD964;
    }
    .asa-close-btn {
      margin-${side === "left" ? "right" : "left"}: auto;
      background: rgba(255,255,255,0.12);
      border: none;
      color: #fff;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .asa-close-btn:hover { background: rgba(255,255,255,0.25); }

    /* منطقة الرسائل */
    .asa-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #FCFAF4;
      background-image: radial-gradient(circle at 1px 1px, #eee2c0 1px, transparent 0);
      background-size: 20px 20px;
    }
    .asa-messages::-webkit-scrollbar { width: 6px; }
    .asa-messages::-webkit-scrollbar-thumb { background: var(--asa-gold); border-radius: 10px; }

    .asa-msg-row {
      display: flex;
      gap: 8px;
      max-width: 100%;
      animation: asa-fade-in 0.25s ease;
    }
    @keyframes asa-fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .asa-msg-row.asa-user { flex-direction: row-reverse; align-self: flex-end; }
    .asa-msg-row.asa-bot { align-self: flex-start; }

    .asa-msg-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      flex-shrink: 0; object-fit: cover;
      border: 1.5px solid var(--asa-gold);
    }

    .asa-bubble {
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.6;
      max-width: 250px;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
    .asa-user .asa-bubble {
      background: var(--asa-user);
      color: #fff;
      border-bottom-left-radius: 4px;
    }
    .asa-bot .asa-bubble {
      background: var(--asa-bot);
      color: #2b2b2b;
      border: 1px solid #eadfb8;
      border-bottom-right-radius: 4px;
    }

    /* مؤشر الكتابة */
    .asa-typing {
      display: flex;
      gap: 4px;
      padding: 12px 14px;
      background: var(--asa-bot);
      border-radius: 16px;
      border-bottom-right-radius: 4px;
      border: 1px solid #eadfb8;
      width: fit-content;
    }
    .asa-typing span {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--asa-gold-dark);
      animation: asa-bounce 1.2s infinite ease-in-out;
    }
    .asa-typing span:nth-child(2) { animation-delay: 0.15s; }
    .asa-typing span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes asa-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
      30% { transform: translateY(-5px); opacity: 1; }
    }

    /* منطقة الإدخال */
    .asa-input-area {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border-top: 1px solid #eee;
      background: #fff;
    }
    .asa-input-area input {
      flex: 1;
      border: 1.5px solid #e5ddc0;
      border-radius: 24px;
      padding: 10px 16px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
      background: #FCFAF4;
    }
    .asa-input-area input:focus {
      border-color: var(--asa-gold);
    }
    .asa-send-btn {
      width: 42px; height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--asa-gold), var(--asa-gold-dark));
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.15s;
      box-shadow: 0 2px 8px rgba(212,175,55,0.5);
    }
    .asa-send-btn:hover { transform: scale(1.08); }
    .asa-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .asa-send-btn svg { width: 18px; height: 18px; fill: #1A1A1A; }

    .asa-error-msg {
      color: #b00020;
      font-size: 12.5px;
      background: #fdecea;
      border: 1px solid #f5c6cb;
      padding: 8px 12px;
      border-radius: 10px;
      align-self: flex-start;
    }

    @media (max-width: 480px) {
      .asa-window {
        width: 92vw;
        height: 70vh;
        bottom: 80px;
      }
      .asa-fab { width: 62px; height: 62px; }
      .asa-fab img { width: 52px; height: 52px; }
    }
  `;
  document.head.appendChild(style);

  // ---------------------- HTML ----------------------
  const root = document.createElement("div");
  root.id = "asa-chat-root";
  root.innerHTML = `
    <div class="asa-window" id="asaWindow">
      <div class="asa-header">
        <div class="asa-avatar-wrap">
          <img src="${CONFIG.avatarUrl}" alt="avatar" />
        </div>
        <div>
          <div class="asa-title">${CONFIG.agentName}</div>
          <div class="asa-subtitle"><span class="asa-status-dot"></span> متصل الآن</div>
        </div>
        <button class="asa-close-btn" id="asaCloseBtn" aria-label="إغلاق">✕</button>
      </div>
      <div class="asa-messages" id="asaMessages"></div>
      <div class="asa-input-area">
        <input type="text" id="asaInput" placeholder="اكتب رسالتك هنا..." autocomplete="off" />
        <button class="asa-send-btn" id="asaSendBtn" aria-label="إرسال">
          <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>

    <div class="asa-fab" id="asaFab">
      <span class="asa-dot" id="asaDot"></span>
      <img src="${CONFIG.avatarUrl}" alt="Chat" />
    </div>
  `;
  document.body.appendChild(root);

  // ---------------------- عناصر DOM ----------------------
  const fab = document.getElementById("asaFab");
  const win = document.getElementById("asaWindow");
  const closeBtn = document.getElementById("asaCloseBtn");
  const messagesBox = document.getElementById("asaMessages");
  const input = document.getElementById("asaInput");
  const sendBtn = document.getElementById("asaSendBtn");
  const dot = document.getElementById("asaDot");

  let isOpen = false;
  let hasGreeted = false;
  let isSending = false;

  // ---------------------- وظائف مساعدة ----------------------
  function scrollToBottom() {
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function addMessage(text, sender) {
    const row = document.createElement("div");
    row.className = "asa-msg-row asa-" + sender;

    if (sender === "bot") {
      const img = document.createElement("img");
      img.src = CONFIG.avatarUrl;
      img.className = "asa-msg-avatar";
      row.appendChild(img);
    }

    const bubble = document.createElement("div");
    bubble.className = "asa-bubble";
    bubble.textContent = text;
    row.appendChild(bubble);

    messagesBox.appendChild(row);
    scrollToBottom();
  }

  function showTyping() {
    const row = document.createElement("div");
    row.className = "asa-msg-row asa-bot";
    row.id = "asaTypingRow";
    row.innerHTML = `
      <img src="${CONFIG.avatarUrl}" class="asa-msg-avatar" />
      <div class="asa-typing"><span></span><span></span><span></span></div>
    `;
    messagesBox.appendChild(row);
    scrollToBottom();
  }

  function hideTyping() {
    const row = document.getElementById("asaTypingRow");
    if (row) row.remove();
  }

  function showError(msg) {
    const div = document.createElement("div");
    div.className = "asa-error-msg";
    div.textContent = msg;
    messagesBox.appendChild(div);
    scrollToBottom();
  }

  // ---------------------- فتح / إغلاق النافذة ----------------------
  function openChat() {
    isOpen = true;
    win.classList.add("asa-open");
    dot.style.display = "none";
    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(() => addMessage(CONFIG.welcomeMessage, "bot"), 300);
    }
    setTimeout(() => input.focus(), 300);
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove("asa-open");
  }

  fab.addEventListener("click", () => (isOpen ? closeChat() : openChat()));
  closeBtn.addEventListener("click", closeChat);

  // ---------------------- إرسال الرسالة إلى n8n Webhook ----------------------
  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isSending) return;

    addMessage(text, "user");
    input.value = "";
    isSending = true;
    sendBtn.disabled = true;
    showTyping();

    try {
      const response = await fetch(CONFIG.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sendMessage",     // الحقل القياسي المطلوب من n8n Chat Trigger
          chatInput: text,           // نص الرسالة (الحقل الأساسي)
          sessionId: sessionId,      // لربط الذاكرة (Simple Memory) بجلسة المستخدم
          message: text,             // بديل احتياطي
          source: "asaheeb-widget",
          pageUrl: window.location.href,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      const data = await response.json();

      // n8n قد يعيد الرد بأشكال مختلفة حسب إعداد عقدة الرد، نتحقق من الاحتمالات الشائعة:
      const reply =
        data.output ||
        data.reply ||
        data.text ||
        data.message ||
        (Array.isArray(data) && (data[0]?.output || data[0]?.text)) ||
        "عذراً، لم أتمكن من فهم الرد. حاول مرة أخرى.";

      hideTyping();
      addMessage(reply, "bot");
    } catch (err) {
      console.error("Asaheeb Chat Widget Error:", err);
      hideTyping();
      showError("⚠️ تعذر الاتصال بالمساعد الآن. الرجاء المحاولة لاحقاً أو التواصل معنا مباشرة.");
    } finally {
      isSending = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();
