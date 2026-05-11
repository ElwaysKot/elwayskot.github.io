document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // МОБИЛЬНОЕ МЕНЮ
  // =========================
  const toggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".main-nav");

  if (toggle && navMenu) {
    toggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      toggle.classList.toggle("active");
    });
  }


// =========================
// ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ С АНИМАЦИЕЙ + СОХРАНЕНИЕ
// =========================
const pageLinks = document.querySelectorAll(".page-link");
const pages = document.querySelectorAll(".page");

let currentPageIndex = 0;

function switchPage(pageName, index = 0, save = true) {
  const targetPage = document.getElementById(`${pageName}-page`);

  if (!targetPage) return;

  const activePage = document.querySelector(".page.active-page");

  if (targetPage === activePage) return;

  pages.forEach(page => {
    page.classList.remove(
      "active-page",
      "slide-in-right",
      "slide-in-left"
    );
  });

  pageLinks.forEach(item => item.classList.remove("active"));

  const activeLink = document.querySelector(`.page-link[data-page="${pageName}"]`);

  if (activeLink) {
    activeLink.classList.add("active");
  }

  const animationClass = index > currentPageIndex
    ? "slide-in-right"
    : "slide-in-left";

  targetPage.classList.add("active-page", animationClass);

  currentPageIndex = index;

  if (save) {
    localStorage.setItem("activePage", pageName);
  }

  if (navMenu && toggle) {
    navMenu.classList.remove("active");
    toggle.classList.remove("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

pageLinks.forEach((link, index) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const pageName = this.dataset.page;

    switchPage(pageName, index, true);
  });
});
// =========================
// TEAM CARD EXPAND
// =========================
const modal = document.getElementById("personModal");
const modalClose = document.getElementById("personModalClose");
const modalName = document.getElementById("personModalName");
const modalRole = document.getElementById("personModalRole");
const modalInfo = document.getElementById("personModalInfo");

document.querySelectorAll(".about-person-btn").forEach(button => {
  button.addEventListener("click", e => {
    e.stopPropagation();

    modalName.textContent = button.dataset.name;
    modalRole.textContent = button.dataset.role;
    modalInfo.textContent = button.dataset.info;

    modal.classList.add("active");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
  // =========================
  // ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
  // =========================
  document.querySelectorAll(".submenu a[href^='#'], a.btn[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    // НАХОДИМ страницу, в которой находится этот блок
    const targetPage = target.closest(".page");

    if (!targetPage) return;

    const currentPage = document.querySelector(".page.active-page");

    // ЕСЛИ ЭТО ДРУГАЯ СТРАНИЦА — ПЕРЕКЛЮЧАЕМ
    if (targetPage !== currentPage) {

      const pageId = targetPage.id.replace("-page", "");

      // переключаем активную кнопку меню
      document.querySelectorAll(".page-link").forEach(link => {
        link.classList.remove("active");

        if (link.dataset.page === pageId) {
          link.classList.add("active");
        }
      });

      // переключаем страницу
      document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active-page");
      });

      targetPage.classList.add("active-page");
    }

    // СКРОЛЛ УЖЕ ПОСЛЕ ПЕРЕКЛЮЧЕНИЯ
    setTimeout(() => {
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth"
      });
    }, 50);

  });
});


  // =========================
  // DROPDOWN МЕНЮ НА МОБИЛКЕ
  // =========================
  document.querySelectorAll(".nav-item").forEach(item => {
    const pageLink = item.querySelector(".page-link");

    item.addEventListener("click", (e) => {
      if (window.innerWidth > 900) return;

      if (e.target === pageLink) return;

      item.classList.toggle("open");
    });
  });


  // =========================
  // FAQ АККОРДЕОН
  // =========================
  document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
      const parent = question.parentElement;
      const answer = parent.querySelector(".faq-answer");

      if (!answer) return;

      const isActive = parent.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("active");

        const itemAnswer = item.querySelector(".faq-answer");
        if (itemAnswer) {
          itemAnswer.style.maxHeight = "0";
        }
      });

      if (!isActive) {
        parent.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });


  // =========================
  // АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ
  // =========================
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.2
  });

  fadeElements.forEach(el => observer.observe(el));


  // =========================
  // ФОРМА КОНТАКТОВ ЧЕРЕЗ GMAIL
  // =========================
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector("[name='name']").value.trim();
      const email = form.querySelector("[name='email']").value.trim();
      const message = form.querySelector("[name='message']").value.trim();

      const subject = encodeURIComponent("Заявка WhiskerEdge Academy");
      const body = encodeURIComponent(
        `Имя: ${name}\nEmail: ${email}\n\n${message}`
      );

      const gmailURL = `https://mail.google.com/mail/?view=cm&to=elwayskot.ultimate@gmail.com&su=${subject}&body=${body}`;

      window.open(gmailURL, "_blank");

      const status = document.getElementById("statusMessage");

      if (status) {
        status.textContent = "Сообщение отправлено!";
        status.style.color = "#3efca2";
      }

      form.reset();
    });
  }
  // =========================
  // MODULE MODAL
  // =========================
  const moduleModal = document.getElementById("moduleModal");
  const moduleModalClose = document.getElementById("moduleModalClose");
  const moduleModalTitle = document.getElementById("moduleModalTitle");
  const moduleModalText = document.getElementById("moduleModalText");

  if (moduleModal && moduleModalClose && moduleModalTitle && moduleModalText) {
    document.querySelectorAll(".module-card").forEach(card => {
      card.addEventListener("click", () => {
        moduleModalTitle.textContent = card.dataset.title;
        moduleModalText.textContent = card.dataset.description;
        moduleModal.classList.add("active");
      });
    });

    moduleModalClose.addEventListener("click", () => {
      moduleModal.classList.remove("active");
    });

    moduleModal.addEventListener("click", e => {
      if (e.target === moduleModal) {
        moduleModal.classList.remove("active");
      }
    });
  }

const PASS_PERCENT = 60;

  // Открытие теста после просмотра видео
  document.querySelectorAll(".lesson-block video").forEach(video => {
    video.addEventListener("ended", () => {
      const lessonBlock = video.closest(".lesson-block");
      const lessonTest = lessonBlock.querySelector(".lesson-test");

      if (lessonTest) {
        lessonTest.classList.remove("locked-test");
      }

      const lessonNumber = lessonBlock.dataset.lesson;
      const watchedVideos = JSON.parse(localStorage.getItem("watchedVideos")) || [];

      if (!watchedVideos.includes(lessonNumber)) {
        watchedVideos.push(lessonNumber);
        localStorage.setItem("watchedVideos", JSON.stringify(watchedVideos));
      }
    });
  });

  document.querySelectorAll(".check-test-btn").forEach(button => {
    button.addEventListener("click", () => {
      const lessonNumber = Number(button.dataset.lesson);
      const lessonBlock = document.querySelector(`.lesson-block[data-lesson="${lessonNumber}"]`);
      const lessonTest = lessonBlock.querySelector(".lesson-test");
      const questions = lessonBlock.querySelectorAll(".test-question");
      const result = lessonBlock.querySelector(".test-result");

      if (lessonTest.classList.contains("locked-test")) {
        result.textContent = "Сначала досмотрите видеоурок до конца.";
        result.style.color = "#ffcc66";
        return;
      }

      let answeredCount = 0;
      let correctCount = 0;

      questions.forEach(question => {
        const selectedAnswer = question.querySelector("input[type='radio']:checked");

        if (selectedAnswer) {
          answeredCount++;

          if (selectedAnswer.value === "correct") {
            correctCount++;
          }
        }
      });

      if (answeredCount < questions.length) {
        result.textContent = `Ответьте на все вопросы. Выполнено: ${answeredCount}/${questions.length}`;
        result.style.color = "#ffcc66";
        return;
      }

      const percent = Math.round((correctCount / questions.length) * 100);

      if (percent >= PASS_PERCENT) {
        result.textContent = `Результат: ${percent}%. Урок засчитан, следующий урок открыт.`;
        result.style.color = "#3efca2";

        lessonBlock.classList.add("completed-lesson");

        const nextLesson = document.querySelector(`.lesson-block[data-lesson="${lessonNumber + 1}"]`);

        if (nextLesson) {
          nextLesson.classList.remove("locked-lesson");
          nextLesson.classList.add("active-lesson");
        }

        updateLearningProgress();
      } else {
        result.textContent = `Результат: ${percent}%. Нужно минимум ${PASS_PERCENT}%, попробуйте ещё раз.`;
        result.style.color = "#ff6b6b";
      }
    });
  });

  function updateLearningProgress() {
    const lessons = document.querySelectorAll(".lesson-block");
    const completedLessons = document.querySelectorAll(".lesson-block.completed-lesson");

    const progress = Math.round((completedLessons.length / lessons.length) * 100);

    const progressText = document.getElementById("learningProgressText");
    const progressFill = document.getElementById("learningProgressFill");

    if (progressText) progressText.textContent = `${progress}%`;
    if (progressFill) progressFill.style.width = `${progress}%`;

    localStorage.setItem("learningProgress", progress);
    localStorage.setItem("completedLessons", JSON.stringify(
      Array.from(completedLessons).map(lesson => lesson.dataset.lesson)
    ));
  }
  function loadLearningProgress() {
    const completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || [];
    const watchedVideos = JSON.parse(localStorage.getItem("watchedVideos")) || [];

    watchedVideos.forEach(lessonNumber => {
      const lesson = document.querySelector(`.lesson-block[data-lesson="${lessonNumber}"]`);
      const lessonTest = lesson?.querySelector(".lesson-test");

      if (lessonTest) {
        lessonTest.classList.remove("locked-test");
      }
    });

    completedLessons.forEach(lessonNumber => {
      const lesson = document.querySelector(`.lesson-block[data-lesson="${lessonNumber}"]`);

      if (lesson) {
        lesson.classList.add("completed-lesson");
        lesson.classList.remove("locked-lesson");
        lesson.classList.add("active-lesson");
      }

      const nextLesson = document.querySelector(`.lesson-block[data-lesson="${Number(lessonNumber) + 1}"]`);

      if (nextLesson) {
        nextLesson.classList.remove("locked-lesson");
        nextLesson.classList.add("active-lesson");
      }
    });

    updateLearningProgress();
  }
  const resetProgressBtn = document.getElementById("resetProgressBtn");

  if (resetProgressBtn) {
    resetProgressBtn.addEventListener("click", () => {

      const confirmReset = confirm(
        "Вы действительно хотите сбросить весь прогресс обучения?"
      );

      if (!confirmReset) return;

      localStorage.removeItem("learningProgress");
      localStorage.removeItem("completedLessons");
      localStorage.removeItem("watchedVideos");

      location.reload();
    });
  }
  const calculateRiskBtn = document.getElementById("calculateRiskBtn");

  if (calculateRiskBtn) {
    calculateRiskBtn.addEventListener("click", () => {
      const deposit = Number(document.getElementById("deposit").value);
      const riskPercent = Number(document.getElementById("riskPercent").value);
      const entryPrice = Number(document.getElementById("entryPrice").value);
      const stopLoss = Number(document.getElementById("stopLoss").value);
      const takeProfit = Number(document.getElementById("takeProfit").value);

      const riskMoneyEl = document.getElementById("riskMoney");
      const positionSizeEl = document.getElementById("positionSize");
      const potentialProfitEl = document.getElementById("potentialProfit");
      const riskRewardEl = document.getElementById("riskReward");
      const messageEl = document.getElementById("calculatorMessage");

      if (!deposit || !riskPercent || !entryPrice || !stopLoss || !takeProfit) {
        messageEl.textContent = "Заполните все поля для расчёта.";
        messageEl.style.color = "#ffcc66";
        return;
      }

      if (entryPrice === stopLoss) {
        messageEl.textContent = "Цена входа и стоп-лосс не должны быть одинаковыми.";
        messageEl.style.color = "#ff6b6b";
        return;
      }

      const riskMoney = deposit * (riskPercent / 100);
      const riskPerUnit = Math.abs(entryPrice - stopLoss);
      const positionSize = riskMoney / riskPerUnit;

      const profitPerUnit = Math.abs(takeProfit - entryPrice);
      const potentialProfit = profitPerUnit * positionSize;

      const riskReward = potentialProfit / riskMoney;

      riskMoneyEl.textContent = `$${riskMoney.toFixed(2)}`;
      positionSizeEl.textContent = positionSize.toFixed(4);
      potentialProfitEl.textContent = `$${potentialProfit.toFixed(2)}`;
      riskRewardEl.textContent = `1:${riskReward.toFixed(2)}`;

      if (riskReward >= 3) {
        messageEl.textContent = "Хорошее соотношение риска и прибыли.";
        messageEl.style.color = "#3efca2";
      } else if (riskReward >= 2) {
        messageEl.textContent = "Нормальное соотношение, но сделку стоит оценить осторожно.";
        messageEl.style.color = "#ffcc66";
      } else {
        messageEl.textContent = "Слабое соотношение риска и прибыли. Сделка может быть невыгодной.";
        messageEl.style.color = "#ff6b6b";
      }
    });
  }
  const guideSteps = [
    {
      target: '[data-guide="deposit"]',
      title: "Размер депозита",
      text: "Введите общий размер депозита. От этой суммы будет рассчитываться допустимый риск на сделку."
    },
    {
      target: '[data-guide="risk"]',
      title: "Риск на сделку",
      text: "Введите процент депозита, который готовы потерять в одной сделке. Обычно используют 1–2%."
    },
    {
      target: '[data-guide="entry"]',
      title: "Цена входа",
      text: "Введите цену, по которой планируется открыть сделку."
    },
    {
      target: '[data-guide="stop"]',
      title: "Стоп-лосс",
      text: "Введите цену стоп-лосса. Это точка, где сделка закрывается при неблагоприятном движении цены."
    },
    {
      target: '[data-guide="take"]',
      title: "Тейк-профит",
      text: "Введите цену тейк-профита. Это точка, где сделка закрывается при достижении цели."
    }
  ];

  let currentGuideStep = 0;

  const startGuideBtn = document.getElementById("startRiskGuideBtn");
  const guideOverlay = document.getElementById("guideOverlay");
  const guideTooltip = document.getElementById("guideTooltip");
  const guideClose = document.getElementById("guideClose");
  const guidePrev = document.getElementById("guidePrev");
  const guideNext = document.getElementById("guideNext");
  const guideStep = document.getElementById("guideStep");
  const guideTitle = document.getElementById("guideTitle");
  const guideText = document.getElementById("guideText");

  function clearGuideHighlight() {
    document.querySelectorAll(".guide-highlight").forEach(el => {
      el.classList.remove("guide-highlight");
    });
  }

  function closeGuide() {
    clearGuideHighlight();
    guideOverlay.classList.remove("active");
    guideTooltip.classList.remove("active");
  }

  function showGuideStep(index) {
    clearGuideHighlight();

    const step = guideSteps[index];
    const target = document.querySelector(step.target);

    if (!target) return;

    target.classList.add("guide-highlight");

    target.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    setTimeout(() => {
      const rect = target.getBoundingClientRect();

      guideStep.textContent = `${index + 1} / ${guideSteps.length}`;
      guideTitle.textContent = step.title;
      guideText.textContent = step.text;

      guidePrev.disabled = index === 0;
      guideNext.textContent = index === guideSteps.length - 1 ? "Готово" : "Далее";

      let top = rect.top + rect.height / 2 - guideTooltip.offsetHeight / 2;
      let left = rect.right + 20;

      if (left + guideTooltip.offsetWidth > window.innerWidth - 20) {
        left = rect.left - guideTooltip.offsetWidth - 20;
      }

      if (left < 20) {
        left = 20;
        top = rect.bottom + 16;
      }

      if (top < 20) top = 20;

      if (top + guideTooltip.offsetHeight > window.innerHeight - 20) {
        top = window.innerHeight - guideTooltip.offsetHeight - 20;
      }

      guideTooltip.style.top = `${top}px`;
      guideTooltip.style.left = `${left}px`;

      guideOverlay.classList.add("active");
      guideTooltip.classList.add("active");
    }, 190);
  }

  if (startGuideBtn && guideTooltip && guideOverlay) {
    startGuideBtn.addEventListener("click", () => {
      currentGuideStep = 0;
      showGuideStep(currentGuideStep);
    });

    guideClose.addEventListener("click", closeGuide);

    guidePrev.addEventListener("click", () => {
      if (currentGuideStep > 0) {
        currentGuideStep--;
        showGuideStep(currentGuideStep);
      }
    });

    guideNext.addEventListener("click", () => {
      if (currentGuideStep < guideSteps.length - 1) {
        currentGuideStep++;
        showGuideStep(currentGuideStep);
      } else {
        closeGuide();
      }
    });

    guideOverlay.addEventListener("click", closeGuide);

    window.addEventListener("resize", () => {
      if (guideTooltip.classList.contains("active")) {
        showGuideStep(currentGuideStep);
      }
    });
  }
  // восстановление вкладки после обновления страницы
  const savedPage = localStorage.getItem("activePage");

  if (savedPage) {
    const savedLink = document.querySelector(`.page-link[data-page="${savedPage}"]`);
    const savedIndex = Array.from(pageLinks).indexOf(savedLink);

    switchPage(savedPage, savedIndex >= 0 ? savedIndex : 0, false);
  }
  loadLearningProgress();
});