var filters = [
  "lol",
  "league",
  "laegue",
  "legue",
  "legueof",
  "leagueof",
  "laegueof",
  "league of",
  "laegue of",
  "leagueoflegends",
  "laegueoflegends",
  "legueoflegends",
  "leagueof legends",
  "league oflegends",
  "league of legends",
  "riot",
  "rito",
  "valo",
  "valorant",
];

const targetClasses = [
  "MjjYud",
  "y8Jpof",
  "pPLc9e",
  "kpQuGf",
  "jOAHU",
  "wLL07_0Xnd1QZpzpfR4W",
  "react-results--sidebar",
];

function applyFilter(element) {
  if (element.hasAttribute("filtered")) return;

  const divText = element.innerText.toLowerCase();

  const optionsIcons = element.querySelectorAll(".y1yadf");

  if (filters.some((filter) => divText.includes(filter))) {
    element.setAttribute("filtered", "true");
    element.style.position = "relative";

    optionsIcons.forEach((icon) => {
      icon.style.zIndex = "0";
    });

    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(40, 0, 0)";
    overlay.style.zIndex = "1";
    overlay.style.border = "solid 1px red";
    overlay.style.borderRadius = "8px";
    overlay.style.pointerEvents = "all";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.color = "red";
    overlay.style.fontWeight = "bold";
    overlay.innerText = "FILTERED CONTENT";

    element.appendChild(overlay);
  }
}

targetClasses.forEach((cls) => {
  document.querySelectorAll(`.${cls}`).forEach(applyFilter);
});

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          targetClasses.forEach((cls) => {
            if (node.classList.contains(cls)) applyFilter(node);
          });

          targetClasses.forEach((cls) => {
            node.querySelectorAll(`.${cls}`).forEach(applyFilter);
          });
        }
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
