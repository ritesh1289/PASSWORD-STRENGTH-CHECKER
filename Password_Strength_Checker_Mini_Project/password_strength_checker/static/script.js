const passwordInput = document.getElementById("password");
const toggleButton = document.getElementById("toggle-password");
const generateButton = document.getElementById("generate");
const clearButton = document.getElementById("clear");
const strengthLabel = document.getElementById("strength-label");
const strengthMessage = document.getElementById("strength-message");
const meter = document.getElementById("meter");
const meterFill = document.getElementById("meter-fill");
const suggestionsList = document.getElementById("suggestions");
const statusMessage = document.getElementById("status");

let requestNumber = 0;
let debounceTimer;

const levelColors = {
  "Very Weak": "#ff6f7d",
  "Weak": "#ff6f7d",
  "Medium": "#ffc76b",
  "Strong": "#46d6a0",
  "Very Strong": "#46d6a0"
};

toggleButton.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleButton.textContent = isHidden ? "Hide" : "Show";
});

passwordInput.addEventListener("input", () => {
  statusMessage.textContent = "";
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(checkPassword, 180);
});

async function checkPassword() {
  const password = passwordInput.value;
  const thisRequest = ++requestNumber;

  if (!password) {
    resetResults();
    return;
  }

  try {
    const response = await fetch("/api/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const result = await response.json();
    if (thisRequest !== requestNumber) return;
    if (!response.ok) throw new Error(result.error || "Could not check this input.");
    renderResults(result);
  } catch (error) {
    if (thisRequest !== requestNumber) return;
    statusMessage.textContent = "Could not reach the local checker. Make sure Flask is running.";
  }
}

function renderResults(result) {
  strengthLabel.textContent = result.level;
  strengthLabel.className = "level " + result.level.toLowerCase().replaceAll(" ", "-");
  strengthMessage.textContent = result.message;
  meterFill.style.width = (result.score / result.max_score * 100) + "%";
  meterFill.style.background = levelColors[result.level] || "#59a8ff";
  meter.setAttribute("aria-valuenow", result.score);

  document.querySelectorAll("#checklist li").forEach((item) => {
    const key = item.dataset.check;
    const passed = Boolean(result.checks[key]);
    item.classList.toggle("passed", passed);
    item.querySelector(".check-icon").textContent = passed ? "✓" : "○";
  });

  suggestionsList.replaceChildren();
  result.suggestions.forEach((suggestion) => {
    const li = document.createElement("li");
    li.textContent = suggestion;
    suggestionsList.appendChild(li);
  });
}

function resetResults() {
  strengthLabel.textContent = "Not checked";
  strengthLabel.className = "level neutral";
  strengthMessage.textContent = "Enter a sample password to begin.";
  meterFill.style.width = "0";
  meter.setAttribute("aria-valuenow", "0");
  document.querySelectorAll("#checklist li").forEach((item) => {
    item.classList.remove("passed");
    item.querySelector(".check-icon").textContent = "○";
  });
  suggestionsList.replaceChildren();
  const li = document.createElement("li");
  li.textContent = "Use a long, unique passphrase and avoid personal information.";
  suggestionsList.appendChild(li);
}

function randomIndex(max) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % max;
}

function generatePassword() {
  const groups = [
    "ABCDEFGHJKLMNPQRSTUVWXYZ",
    "abcdefghijkmnopqrstuvwxyz",
    "23456789",
    "!@#$%&*+-_?"
  ];
  const all = groups.join("");
  const chars = groups.map(group => group[randomIndex(group.length)]);
  while (chars.length < 16) chars.push(all[randomIndex(all.length)]);

  // Fisher–Yates shuffle using browser cryptographic random values.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  passwordInput.value = chars.join("");
  passwordInput.type = "text";
  toggleButton.textContent = "Hide";
  statusMessage.textContent = "A sample password was generated. Copy it only if you need it for a demonstration.";
  checkPassword();
}

generateButton.addEventListener("click", generatePassword);
clearButton.addEventListener("click", () => {
  requestNumber++;
  passwordInput.value = "";
  passwordInput.type = "password";
  toggleButton.textContent = "Show";
  statusMessage.textContent = "";
  resetResults();
  passwordInput.focus();
});
