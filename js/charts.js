document.addEventListener("DOMContentLoaded", () => {
  if (typeof Chart === "undefined") return;

  const chartTextColor = "#e0fbe6";
  const chartGridColor = "rgba(224, 251, 230, 0.12)";

  const cryptoData = {
    btc: {
      title: "Bitcoin / BTC",
      badge: "BTC",
      descriptionRu: "Помесячная динамика цены Bitcoin за текущий год.",
      descriptionUa: "Помісячна динаміка ціни Bitcoin за поточний рік.",
      color: "#3efca2",
      background: "rgba(62, 252, 162, 0.12)",
      yearly: [7200, 29000, 47000, 16500, 43000, 68000, 81000],
      monthly: [43000, 47000, 52000, 61000, 64000]
    },
    eth: {
      title: "Ethereum / ETH",
      badge: "ETH",
      descriptionRu: "Помесячная динамика цены Ethereum за текущий год.",
      descriptionUa: "Помісячна динаміка ціни Ethereum за поточний рік.",
      color: "#38bdf8",
      background: "rgba(56, 189, 248, 0.12)",
      yearly: [130, 730, 3700, 1200, 2300, 3600, 2400],
      monthly: [2300, 2450, 2700, 3100, 3350]
    },
    bnb: {
      title: "BNB",
      badge: "BNB",
      descriptionRu: "Помесячная динамика цены BNB за текущий год.",
      descriptionUa: "Помісячна динаміка ціни BNB за поточний рік.",
      color: "#ffcc66",
      background: "rgba(255, 204, 102, 0.12)",
      yearly: [15, 38, 520, 245, 315, 580, 650],
      monthly: [315, 340, 390, 470, 530]
    }
  };

  const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];
  const monthsByLang = {
    ru: ["Янв", "Фев", "Мар", "Апр", "Май"],
    ua: ["Січ", "Лют", "Бер", "Кві", "Тра"]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: chartTextColor
        }
      }
    },
    scales: {
      x: {
        ticks: { color: chartTextColor },
        grid: { color: chartGridColor }
      },
      y: {
        ticks: { color: chartTextColor },
        grid: { color: chartGridColor }
      }
    }
  };

  function createSmallChart(canvasId, cryptoKey) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const item = cryptoData[cryptoKey];

    new Chart(canvas, {
      type: "line",
      data: {
        labels: years,
        datasets: [{
          label: item.badge,
          data: item.yearly,
          borderColor: item.color,
          backgroundColor: item.background,
          fill: true,
          tension: 0.35,
          pointRadius: 4
        }]
      },
      options: commonOptions
    });
  }

  createSmallChart("btcChart", "btc");
  createSmallChart("ethChart", "eth");
  createSmallChart("bnbChart", "bnb");

  const selectedCanvas = document.getElementById("selectedCryptoChart");
  const selectedTitle = document.getElementById("selectedCryptoTitle");
  const selectedDescription = document.getElementById("selectedCryptoDescription");
  const selectedBadge = document.getElementById("selectedCryptoBadge");
  const cryptoCards = document.querySelectorAll(".crypto-chart-card");

  let selectedChart = null;

  function renderSelectedChart(cryptoKey) {
    const item = cryptoData[cryptoKey];

    if (!selectedCanvas || !item) return;

    if (selectedChart) {
      selectedChart.destroy();
    }

    if (selectedTitle) selectedTitle.textContent = item.title;
    const currentLang = localStorage.getItem("siteLanguage") || "ru";

      if (selectedDescription) {
        selectedDescription.textContent =
          currentLang === "ua" ? item.descriptionUa : item.descriptionRu;
      }
    if (selectedBadge) selectedBadge.textContent = item.badge;

    selectedChart = new Chart(selectedCanvas, {
      type: "line",
      data: {
        labels: monthsByLang[currentLang],
        datasets: [{
          label: `${item.badge} price, USD`,
          data: item.monthly,
          borderColor: item.color,
          backgroundColor: item.background,
          fill: true,
          tension: 0.35,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: commonOptions
    });

    cryptoCards.forEach(card => {
      card.classList.toggle(
        "active-crypto-card",
        card.dataset.crypto === cryptoKey
      );
    });
  }

  cryptoCards.forEach(card => {
    card.addEventListener("click", () => {
      renderSelectedChart(card.dataset.crypto);
    });
  });
  window.addEventListener("languageChanged", () => {
    const activeCard = document.querySelector(".crypto-chart-card.active-crypto-card");

    if (!activeCard) return;

    renderSelectedChart(activeCard.dataset.crypto);
  });

  renderSelectedChart("btc");
});