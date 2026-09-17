(function () {
  "use strict";

  const data = window.VOCAB_READER_DATA || {};
  const books = data.books || [];
  const SITE_KEY = "ielts-listening-vocab-typing-v2";
  const SEQUENCE_GAP_MS = 2000;
  const state = {
    book: null,
    unit: null,
    filteredWords: [],
    sequenceMode: false,
    sequenceIndex: -1,
    sequenceTimer: null,
    typing: {
      mode: "all",
      words: [],
      index: 0,
      checked: false,
      revealed: false,
      correct: 0,
      answered: 0,
      showHint: false,
    },
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    body: document.body,
    homeBtn: $("homeBtn"),
    pageTitle: $("pageTitle"),
    headerMeta: $("headerMeta"),
    homeView: $("homeView"),
    unitView: $("unitView"),
    introTotalWords: $("introTotalWords"),
    overviewDays: $("overviewDays"),
    overviewPages: $("overviewPages"),
    bookGrid: $("bookGrid"),
    unitPicker: $("unitPicker"),
    selectedBookTitle: $("selectedBookTitle"),
    unitGrid: $("unitGrid"),
    backToDaysBtn: $("backToDaysBtn"),
    backToDaysInlineBtn: $("backToDaysInlineBtn"),
    unitKicker: $("unitKicker"),
    unitTitle: $("unitTitle"),
    unitDescription: $("unitDescription"),
    startAllTypingBtn: $("startAllTypingBtn"),
    startStarTypingBtn: $("startStarTypingBtn"),
    wordListTab: $("wordListTab"),
    typingTab: $("typingTab"),
    wordListView: $("wordListView"),
    typingView: $("typingView"),
    searchInput: $("searchInput"),
    playAllBtn: $("playAllBtn"),
    stopBtn: $("stopBtn"),
    toggleChineseBtn: $("toggleChineseBtn"),
    wordGrid: $("wordGrid"),
    typingModeLabel: $("typingModeLabel"),
    typingProgress: $("typingProgress"),
    typingReplayBtn: $("typingReplayBtn"),
    typingHint: $("typingHint"),
    typingHintToggleBtn: $("typingHintToggleBtn"),
    typingForm: $("typingForm"),
    typingInput: $("typingInput"),
    typingSubmitBtn: $("typingSubmitBtn"),
    typingResult: $("typingResult"),
    typingAnswer: $("typingAnswer"),
    typingShowAnswerBtn: $("typingShowAnswerBtn"),
    typingMarkBtn: $("typingMarkBtn"),
    typingNextBtn: $("typingNextBtn"),
    typingAccuracy: $("typingAccuracy"),
    typingAnswered: $("typingAnswered"),
    typingCorrect: $("typingCorrect"),
    typingStarred: $("typingStarred"),
    typingBackToListBtn: $("typingBackToListBtn"),
    audio: $("wordAudio"),
  };

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "vocab";
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("en-US");
  }

  function allWords() {
    return books.flatMap((book) => (book.units || []).flatMap((unit) => unit.words || []));
  }

  const TOTAL_WORDS = allWords().length;
  let stars = loadStars();

  function loadStars() {
    try {
      return new Set(JSON.parse(localStorage.getItem(SITE_KEY) || "[]"));
    } catch (_) {
      return new Set();
    }
  }

  function saveStars() {
    localStorage.setItem(SITE_KEY, JSON.stringify(Array.from(stars)));
  }

  function starKey(word) {
    return [state.book ? state.book.id : "book", state.unit ? state.unit.id : "unit", word.no, slug(word.word)].join("::");
  }

  function isStarred(word) {
    return stars.has(starKey(word));
  }

  function setStarred(word, on) {
    const key = starKey(word);
    if (on) stars.add(key); else stars.delete(key);
    saveStars();
  }

  function starredCount() {
    return state.unit ? state.unit.words.filter(isStarred).length : 0;
  }

  function updateHeaderMeta() {
    if (state.unit) {
      els.headerMeta.textContent = `${formatNumber(state.unit.words.length)} words · ${starredCount()} starred`;
    } else {
      els.headerMeta.textContent = `${formatNumber(TOTAL_WORDS)} words`;
    }
  }

  function normalizeAnswer(value) {
    return String(value || "")
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[’‘]/g, "'")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function answerMatches(word, answer) {
    const variants = [word.word];
    if (word.word.includes("/")) variants.push(...word.word.split("/"));
    return variants.some((variant) => normalizeAnswer(variant) === normalizeAnswer(answer));
  }

  function clearSequenceTimer() {
    if (state.sequenceTimer) window.clearTimeout(state.sequenceTimer);
    state.sequenceTimer = null;
  }

  function clearActiveMedia() {
    clearSequenceTimer();
    els.audio.pause();
    els.audio.removeAttribute("src");
    els.audio.load();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    document.querySelectorAll(".is-playing").forEach((node) => node.classList.remove("is-playing"));
  }

  function stopAudio() {
    state.sequenceMode = false;
    state.sequenceIndex = -1;
    clearActiveMedia();
  }

  function setPlayingCard(index) {
    document.querySelectorAll(".word-card.is-playing").forEach((node) => node.classList.remove("is-playing"));
    const card = document.querySelector(`[data-word-index="${index}"]`);
    if (card) card.classList.add("is-playing");
    return card;
  }

  function setCardStatus(card, text) {
    if (!card) return;
    const status = card.querySelector(".audio-status");
    if (status) status.textContent = text || "";
  }

  function finishPlayback() {
    const wasSequence = state.sequenceMode;
    const nextIndex = state.sequenceIndex + 1;
    document.querySelectorAll(".is-playing").forEach((node) => node.classList.remove("is-playing"));
    if (wasSequence && nextIndex < state.filteredWords.length) {
      state.sequenceTimer = window.setTimeout(() => playListWord(nextIndex), SEQUENCE_GAP_MS);
    } else if (wasSequence) {
      stopAudio();
    }
  }

  function speakFallback(word, sequence) {
    if (!window.speechSynthesis) {
      if (sequence) finishPlayback();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = "en-GB";
    utterance.rate = 0.88;
    utterance.onend = () => {
      if (sequence) finishPlayback();
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function playEntry(word, options) {
    const opts = options || {};
    clearActiveMedia();
    const card = typeof opts.cardIndex === "number" ? setPlayingCard(opts.cardIndex) : null;
    state.sequenceMode = Boolean(opts.sequence);
    state.sequenceIndex = typeof opts.cardIndex === "number" ? opts.cardIndex : state.sequenceIndex;

    if (word.ukAudio) {
      if (card) setCardStatus(card, "正在播放 British English 词条音频");
      const source = new URL(word.ukAudio, document.baseURI).href;
      els.audio.src = source;
      els.audio.addEventListener("loadedmetadata", () => {
        els.audio.play().catch(() => setCardStatus(card, "音频暂时无法播放，请再点一次"));
      }, { once: true });
      els.audio.load();
      return;
    }

    setCardStatus(card, "浏览器英音兜底");
    speakFallback(word, Boolean(opts.sequence));
  }

  function playListWord(index) {
    const word = state.filteredWords[index];
    if (!word) return;
    state.sequenceIndex = index;
    playEntry(word, { cardIndex: index, sequence: state.sequenceMode });
  }

  function shuffle(words) {
    const copy = words.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function renderHome() {
    stopAudio();
    state.book = null;
    state.unit = null;
    els.homeView.hidden = false;
    els.unitView.hidden = true;
    els.unitPicker.hidden = true;
    els.pageTitle.textContent = data.title || "Vocabulary Reader";
    els.introTotalWords.textContent = formatNumber(TOTAL_WORDS);
    els.overviewDays.textContent = books.length;
    els.overviewPages.textContent = books.reduce((sum, book) => sum + (book.units || []).length, 0);
    els.bookGrid.innerHTML = "";
    books.forEach((book, index) => {
      const words = (book.units || []).reduce((sum, unit) => sum + (unit.words || []).length, 0);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "day-card";
      button.innerHTML = `<span class="day-label">${String(book.title).split("·")[0].trim()}</span><strong></strong><small>${book.units.length} 个词汇页 · ${formatNumber(words)} 个词</small><span class="arrow">→</span>`;
      button.querySelector("strong").textContent = String(book.title).split("·").slice(1).join("·").trim() || book.title;
      button.addEventListener("click", () => renderBook(book));
      els.bookGrid.appendChild(button);
    });
    updateHeaderMeta();
  }

  function renderBook(book) {
    state.book = book;
    els.unitPicker.hidden = false;
    els.selectedBookTitle.textContent = book.title;
    els.unitGrid.innerHTML = "";
    (book.units || []).forEach((unit) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "unit-card";
      card.innerHTML = `<strong></strong><small>${unit.words.length} 个词 · PDF 第 ${unit.sourcePage} 页</small><span class="unit-play">▶ 点读 / 听写</span>`;
      card.querySelector("strong").textContent = unit.title;
      card.addEventListener("click", () => renderUnit(book, unit));
      els.unitGrid.appendChild(card);
    });
    els.unitPicker.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderUnit(book, unit) {
    stopAudio();
    state.book = book;
    state.unit = unit;
    els.homeView.hidden = true;
    els.unitView.hidden = false;
    els.wordListView.hidden = false;
    els.typingView.hidden = true;
    els.wordListTab.classList.add("is-active");
    els.typingTab.classList.remove("is-active");
    els.pageTitle.textContent = unit.title;
    els.unitTitle.textContent = unit.title;
    const scenarioLabel = String(book.title || "场景").split("·")[0].trim();
    els.unitKicker.textContent = `${scenarioLabel} · PAGE UNIT`;
    els.unitDescription.textContent = unit.description;
    els.searchInput.value = "";
    updateHeaderMeta();
    renderWords();
  }

  function renderWords() {
    if (!state.unit) return;
    const query = els.searchInput.value.trim().toLowerCase();
    state.filteredWords = state.unit.words.filter((word) => {
      const text = [word.word, word.phonetic, word.meaning, word.partOfSpeech, word.example, word.exampleTranslation].join(" ").toLowerCase();
      return !query || text.includes(query);
    });
    els.wordGrid.innerHTML = "";
    if (!state.filteredWords.length) {
      els.wordGrid.innerHTML = '<div class="empty-state">没有找到匹配的单词</div>';
      return;
    }
    state.filteredWords.forEach((word, index) => {
      const card = document.createElement("article");
      card.className = "word-card";
      card.dataset.wordIndex = index;
      const play = document.createElement("button");
      play.type = "button";
      play.className = "play-button";
      play.title = "播放词条音频";
      play.textContent = "▶";
      const main = document.createElement("div");
      main.className = "word-main";
      const line = document.createElement("div");
      line.className = "word-line";
      const no = document.createElement("span");
      no.className = "word-no";
      no.textContent = String(word.no).padStart(2, "0");
      const wordButton = document.createElement("button");
      wordButton.type = "button";
      wordButton.className = "word-text";
      wordButton.textContent = word.word;
      const phonetic = document.createElement("span");
      phonetic.className = "phonetic";
      phonetic.textContent = word.phonetic || "";
      const star = document.createElement("button");
      star.type = "button";
      star.className = "star-button";
      star.title = "标记为不熟词";
      const meaning = document.createElement("p");
      meaning.className = "meaning chinese";
      meaning.textContent = `${word.partOfSpeech || ""} ${word.meaning || ""}`.trim();
      const example = document.createElement("p");
      example.className = "example chinese";
      example.textContent = word.example ? `${word.example} / ${word.exampleTranslation || ""}` : "";
      const status = document.createElement("p");
      status.className = "audio-status";

      function paintStar() {
        const active = isStarred(word);
        star.textContent = active ? "★" : "☆";
        star.setAttribute("aria-pressed", active ? "true" : "false");
        star.title = active ? "取消不熟词标记" : "标记为不熟词";
      }
      paintStar();
      star.addEventListener("click", () => {
        setStarred(word, !isStarred(word));
        paintStar();
        updateHeaderMeta();
      });
      const playOne = () => {
        state.sequenceMode = false;
        playEntry(word, { cardIndex: index, sequence: false });
      };
      play.addEventListener("click", playOne);
      wordButton.addEventListener("click", playOne);
      line.append(no, wordButton, phonetic, star);
      main.append(line, meaning, example, status);
      card.append(play, main);
      els.wordGrid.appendChild(card);
    });
  }

  function showListView() {
    stopAudio();
    els.wordListView.hidden = false;
    els.typingView.hidden = true;
    els.wordListTab.classList.add("is-active");
    els.typingTab.classList.remove("is-active");
    els.body.classList.remove("is-typing");
  }

  function showTypingView() {
    els.wordListView.hidden = true;
    els.typingView.hidden = false;
    els.wordListTab.classList.remove("is-active");
    els.typingTab.classList.add("is-active");
    els.body.classList.add("is-typing");
  }

  function currentTypingWord() {
    return state.typing.words[state.typing.index];
  }

  function updateTypingStats() {
    const t = state.typing;
    els.typingAnswered.textContent = t.answered;
    els.typingCorrect.textContent = t.correct;
    els.typingAccuracy.textContent = t.answered ? `${Math.round((t.correct / t.answered) * 100)}%` : "—";
    els.typingStarred.textContent = starredCount();
    updateHeaderMeta();
  }

  function updateTypingCard() {
    const t = state.typing;
    const word = currentTypingWord();
    if (!word) {
      els.typingProgress.textContent = "0 / 0";
      els.typingHint.textContent = "还没有星标词，请先在词汇点读中标记不熟词。";
      els.typingHint.hidden = false;
      els.typingHintToggleBtn.disabled = true;
      els.typingHintToggleBtn.textContent = "显示中文提示";
      els.typingHintToggleBtn.setAttribute("aria-pressed", "false");
      els.typingInput.value = "";
      els.typingInput.disabled = true;
      els.typingSubmitBtn.disabled = true;
      els.typingReplayBtn.disabled = true;
      els.typingResult.textContent = "";
      els.typingAnswer.hidden = false;
      els.typingAnswer.textContent = "星标盲听需要至少一个星标词。";
      els.typingNextBtn.disabled = true;
      return;
    }
    els.typingInput.disabled = false;
    els.typingSubmitBtn.disabled = false;
    els.typingReplayBtn.disabled = false;
    els.typingNextBtn.disabled = false;
    els.typingProgress.textContent = `${t.index + 1} / ${t.words.length}`;
    els.typingHint.hidden = !t.showHint;
    els.typingHint.textContent = `中文提示：${word.meaning || ""}`;
    els.typingHintToggleBtn.disabled = false;
    els.typingHintToggleBtn.textContent = t.showHint ? "隐藏中文提示" : "显示中文提示";
    els.typingHintToggleBtn.setAttribute("aria-pressed", t.showHint ? "true" : "false");
    els.typingInput.value = "";
    els.typingInput.placeholder = word.word.includes(" ") ? "输入英文短语" : "输入英文单词";
    els.typingInput.focus();
    els.typingResult.className = "typing-result";
    els.typingResult.textContent = "";
    els.typingAnswer.hidden = true;
    els.typingAnswer.textContent = "";
    els.typingShowAnswerBtn.textContent = "显示答案";
    const starred = isStarred(word);
    els.typingMarkBtn.textContent = starred ? (t.mode === "starred" ? "★ 取消星标并下一题" : "★ 取消星标") : "☆ 加入星标";
    els.typingNextBtn.textContent = "下一题 →";
  }

  function playTypingWord() {
    const word = currentTypingWord();
    if (word) playEntry(word, { sequence: false });
  }

  function startTyping(mode) {
    if (!state.unit) return;
    stopAudio();
    state.typing.mode = mode;
    state.typing.words = shuffle(mode === "starred" ? state.unit.words.filter(isStarred) : state.unit.words);
    state.typing.index = 0;
    state.typing.checked = false;
    state.typing.revealed = false;
    state.typing.correct = 0;
    state.typing.answered = 0;
    els.typingModeLabel.textContent = mode === "starred" ? "STARRED BLIND LISTENING" : "ALL BLIND LISTENING";
    showTypingView();
    updateTypingStats();
    updateTypingCard();
    if (currentTypingWord()) window.setTimeout(playTypingWord, 80);
  }

  function submitTyping() {
    const word = currentTypingWord();
    const t = state.typing;
    if (!word) return;
    if (t.checked) {
      advanceTyping();
      return;
    }
    const correct = answerMatches(word, els.typingInput.value);
    t.checked = true;
    t.revealed = false;
    t.answered += 1;
    if (correct) t.correct += 1;
    els.typingResult.className = `typing-result ${correct ? "correct" : "wrong"}`;
    els.typingResult.textContent = correct ? "正确 ✓" : "再听一遍，拼写需要再确认";
    els.typingAnswer.hidden = false;
    els.typingAnswer.textContent = `正确答案：${word.word}  ${word.phonetic || ""}`;
    els.typingShowAnswerBtn.textContent = "已显示答案";
    els.typingNextBtn.textContent = "下一题 →";
    updateTypingStats();
  }

  function showTypingAnswer() {
    const word = currentTypingWord();
    if (!word) return;
    const t = state.typing;
    if (!t.checked) t.revealed = true;
    t.checked = true;
    els.typingAnswer.hidden = false;
    els.typingAnswer.textContent = `正确答案：${word.word}  ${word.phonetic || ""}`;
    els.typingShowAnswerBtn.textContent = "已显示答案";
    els.typingResult.className = "typing-result";
    els.typingResult.textContent = "答案已展开，本题不计入正确率";
  }

  function advanceTyping() {
    if (!state.typing.words.length) return;
    state.typing.index = (state.typing.index + 1) % state.typing.words.length;
    state.typing.checked = false;
    state.typing.revealed = false;
    updateTypingCard();
    window.setTimeout(playTypingWord, 80);
  }

  function toggleTypingStar() {
    const word = currentTypingWord();
    if (!word) return;
    const wasStarred = isStarred(word);
    setStarred(word, !wasStarred);
    updateTypingStats();
    if (state.typing.mode === "starred" && wasStarred) {
      state.typing.words.splice(state.typing.index, 1);
      if (state.typing.index >= state.typing.words.length) state.typing.index = 0;
      state.typing.checked = false;
      updateTypingCard();
      if (currentTypingWord()) window.setTimeout(playTypingWord, 80);
    } else {
      updateTypingCard();
    }
  }

  els.homeBtn.addEventListener("click", renderHome);
  els.backToDaysBtn.addEventListener("click", () => {
    els.unitPicker.hidden = true;
    state.book = null;
  });
  els.backToDaysInlineBtn.addEventListener("click", renderHome);
  els.searchInput.addEventListener("input", renderWords);
  els.startAllTypingBtn.addEventListener("click", () => startTyping("all"));
  els.startStarTypingBtn.addEventListener("click", () => startTyping("starred"));
  els.wordListTab.addEventListener("click", showListView);
  els.typingTab.addEventListener("click", () => startTyping("all"));
  els.playAllBtn.addEventListener("click", () => {
    if (!state.filteredWords.length) return;
    stopAudio();
    state.sequenceMode = true;
    state.sequenceIndex = 0;
    playListWord(0);
  });
  els.stopBtn.addEventListener("click", stopAudio);
  els.toggleChineseBtn.addEventListener("click", () => {
    els.body.classList.toggle("hide-chinese");
    const hidden = els.body.classList.contains("hide-chinese");
    els.toggleChineseBtn.textContent = hidden ? "显示中文" : "隐藏中文";
    els.toggleChineseBtn.setAttribute("aria-pressed", hidden ? "true" : "false");
  });
  els.typingReplayBtn.addEventListener("click", playTypingWord);
  els.typingHintToggleBtn.addEventListener("click", () => {
    state.typing.showHint = !state.typing.showHint;
    const currentValue = els.typingInput.value;
    const inputWasFocused = document.activeElement === els.typingInput;
    updateTypingCard();
    els.typingInput.value = currentValue;
    if (inputWasFocused) els.typingInput.focus();
  });
  els.typingForm.addEventListener("submit", (event) => { event.preventDefault(); submitTyping(); });
  els.typingShowAnswerBtn.addEventListener("click", showTypingAnswer);
  els.typingMarkBtn.addEventListener("click", toggleTypingStar);
  els.typingNextBtn.addEventListener("click", advanceTyping);
  els.typingBackToListBtn.addEventListener("click", showListView);
  els.audio.addEventListener("ended", () => {
    if (state.sequenceMode) finishPlayback();
  });
  window.addEventListener("keydown", (event) => {
    if (els.typingView.hidden) return;
    if (event.key.toLowerCase() === "r" && document.activeElement !== els.typingInput) {
      event.preventDefault();
      playTypingWord();
    }
  });

  renderHome();
})();
