// =============== Плавная прокрутка по якорным ссылкам ===============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 50;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const langButton = document.getElementById("selected-lang");
    const options = document.querySelectorAll(".language-options li");

    options.forEach(option => {
        option.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");
            langButton.textContent = selectedLang.toUpperCase();
            
            if (selectedLang === "ua") {
                window.location.href = "/ua/index.html";
            } else {
                window.location.href = "/";
            }
        });
    });
});


// =============== После загрузки DOM ===============
document.addEventListener("DOMContentLoaded", function () {
  // Бургер-меню
  const toggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (toggle && navMenu) {
    toggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      toggle.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        toggle.classList.remove("active");
      });
    });
  }

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("show");
      burger.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("show");
        burger.classList.remove("active");
      });
    });
  }

  // FAQ-аккордеон
  document.querySelectorAll(".faq-question").forEach(item => {
    item.addEventListener("click", () => {
      const parent = item.parentElement;
      const answer = parent.querySelector(".faq-answer");

      if (parent.classList.contains("active")) {
        answer.style.maxHeight = "0";
        parent.classList.remove("active");
      } else {
        document.querySelectorAll(".faq-item").forEach(i => {
          i.classList.remove("active");
          i.querySelector(".faq-answer").style.maxHeight = "0";
        });

        parent.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Анимация появления при прокрутке
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});

