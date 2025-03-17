document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const offset = 20;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: top,
      behavior: "smooth"
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    toggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Закрытие меню при клике на ссылку
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
});


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


// Анимация при прокрутке (fade-in)
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

// Бургер-меню
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("show");
  burger.classList.toggle("active");
});

// Закрытие меню при клике на ссылку (моб. версия)
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    burger.classList.remove("active");
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    toggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
        toggle.classList.toggle("active");
    });

    // Закрытие меню при клике на ссылку
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            toggle.classList.remove("active");
        });
    });
});