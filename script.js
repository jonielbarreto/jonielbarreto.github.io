(function () {
  "use strict";

  // ---- Language toggle -----------------------------------------------
  var body = document.body;
  var langButtons = document.querySelectorAll("[data-set-lang]");

  function setLang(lang) {
    body.classList.remove("lang-en", "lang-pt");
    body.classList.add("lang-" + lang);
    document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    langButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-set-lang") === lang);
    });
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-set-lang"));
    });
  });

  (function initLang() {
    var saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) {}
    if (saved === "en" || saved === "pt") {
      setLang(saved);
      return;
    }
    var browserLang = (navigator.language || "en").toLowerCase();
    setLang(browserLang.indexOf("pt") === 0 ? "pt" : "en");
  })();

  // ---- Projects --------------------------------------------------------
  var projects = [
    {
      name: "drone_ReID_track",
      descEn: "Drone-based object re-identification and tracking pipeline.",
      descPt: "Pipeline de re-identificação e rastreamento de objetos a partir de drones.",
      tags: ["Python", "Tracking"],
      url: "https://github.com/jonielbarreto/drone_ReID_track"
    },
    {
      name: "paper_lars",
      descEn: "Code accompanying a research paper.",
      descPt: "Código de apoio a um artigo de pesquisa.",
      tags: ["Python", "Research"],
      url: "https://github.com/jonielbarreto/paper_lars"
    },
    {
      name: "dataVisualization",
      descEn: "Data visualization in Python — core libraries and plotting patterns.",
      descPt: "Visualização de dados em Python — bibliotecas e padrões de gráficos.",
      tags: ["Python", "Jupyter"],
      url: "https://github.com/jonielbarreto/dataVisualization"
    },
    {
      name: "dataVisualizationR",
      descEn: "Data visualization in R — core libraries and plotting patterns.",
      descPt: "Visualização de dados em R — bibliotecas e padrões de gráficos.",
      tags: ["R"],
      url: "https://github.com/jonielbarreto/dataVisualizationR"
    }
  ];

  var grid = document.getElementById("projectGrid");
  if (grid) {
    projects.forEach(function (p) {
      var card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML =
        '<h3><a href="' + p.url + '" target="_blank" rel="noopener">' + p.name + "</a></h3>" +
        '<p><span class="lang-en">' + p.descEn + '</span><span class="lang-pt">' + p.descPt + "</span></p>" +
        '<div class="project-tags">' + p.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("") + "</div>" +
        '<a class="project-link" href="' + p.url + '" target="_blank" rel="noopener">' +
        '<span class="lang-en">View on GitHub ↗</span><span class="lang-pt">Ver no GitHub ↗</span></a>';
      grid.appendChild(card);
    });
  }

  // ---- Live repo count ---------------------------------------------
  var repoCountEl = document.getElementById("repoCount");
  if (repoCountEl) {
    fetch("https://api.github.com/users/jonielbarreto")
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (data) {
        if (data && typeof data.public_repos === "number") {
          repoCountEl.textContent = data.public_repos;
        }
      })
      .catch(function () {});
  }
})();
