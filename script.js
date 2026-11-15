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
      name: "frame-sequence-classification",
      descEn: "3D CNN, CNN-LSTM, and CNN-Transformer models for frame-sequence classification.",
      descPt: "Modelos CNN 3D, CNN-LSTM e CNN-Transformer para classificação de sequências de frames.",
      tags: ["Python", "PyTorch"],
      url: "https://github.com/jonielbarreto/frame-sequence-classification"
    },
    {
      name: "VISAPP",
      descEn: "Native YOLO vs. SAHI vs. temporal-consistency object detection benchmark.",
      descPt: "Benchmark de detecção: YOLO nativo vs. SAHI vs. consistência temporal.",
      tags: ["Python", "YOLO", "SAHI"],
      url: "https://github.com/jonielbarreto/VISAPP"
    },
    {
      name: "mmos_benchmark",
      descEn: "YOLOv8s vs. RT-DETR-l vs. Faster R-CNN benchmark on the MMOS dataset.",
      descPt: "Benchmark YOLOv8s vs. RT-DETR-l vs. Faster R-CNN no dataset MMOS.",
      tags: ["Python", "Detection"],
      url: "https://github.com/jonielbarreto/mmos_benchmark"
    },
    {
      name: "Paper_SBSR",
      descEn: "SAHI slice size x overlap vs. object pixel scale in maritime UAV imagery.",
      descPt: "Tamanho de slice x sobreposição do SAHI vs. escala de pixels em imagens marítimas de UAV.",
      tags: ["Python", "SAHI"],
      url: "https://github.com/jonielbarreto/Paper_SBSR"
    },
    {
      name: "class_fusion",
      descEn: "Early, mid, and late fusion of RGB and thermal imagery for binary classification.",
      descPt: "Fusão early, mid e late de imagens RGB e térmicas para classificação binária.",
      tags: ["Python", "PyTorch"],
      url: "https://github.com/jonielbarreto/class_fusion"
    },
    {
      name: "paper_lars",
      descEn: "Code accompanying a research paper.",
      descPt: "Código de apoio a um artigo de pesquisa.",
      tags: ["Python", "Research"],
      url: "https://github.com/jonielbarreto/paper_lars"
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
