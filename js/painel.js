// Computum — painel protegido e catálogo de ferramentas

const userEmail = document.getElementById("user-email");
const logoutButton = document.getElementById("logout-button");
const systemGrid = document.getElementById("system-grid");
const toolsCount = document.getElementById("tools-count");

// Catálogo central. Para adicionar uma ferramenta, inclua um novo objeto aqui.
// Não coloque regras ou motores de cálculo neste repositório.
const aplicativos = [
  {
    id: "abono",
    nome: "Abono de Permanência",
    categoria: "CÁLCULOS",
    descricao: "Cálculos e evolução relacionados ao abono de permanência.",
    url: "https://abono.computum.com.br/",
    status: "ativo",
    destaque: true
  },
  {
    id: "diferencas",
    nome: "Diferenças",
    categoria: "CÁLCULOS",
    descricao: "Sistema de cálculos de diferenças e liquidação.",
    url: "https://diferencas.computum.com.br/",
    status: "ativo",
    destaque: true
  },
  {
    id: "auditoria-planos-saude",
    nome: "Auditoria de Planos de Saúde",
    categoria: "ANÁLISE",
    descricao: "Ferramenta para análise e auditoria de planos de saúde.",
    url: "https://saude.computum.com.br/",
    status: "ativo",
    destaque: true
  },
  {
    id: "informa-laudo",
    nome: "Informa-Laudo",
    categoria: "ANÁLISE",
    descricao: "Ferramenta de apoio à organização e análise de laudos.",
    url: "https://informacalc.computum.com.br/",
    status: "ativo",
    destaque: true
  }
];

function criarCard(app) {
  const card = document.createElement(app.status === "ativo" ? "a" : "article");
  card.className = `system-card ${app.status === "breve" ? "is-soon" : ""}`;

  if (app.status === "ativo") {
    card.href = app.url;
    card.target = "_self";
    card.setAttribute("aria-label", `Abrir ${app.nome}`);
  }

  const initials = app.nome
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  card.innerHTML = `
    <div class="card-top">
      <span class="app-icon" aria-hidden="true">${initials}</span>
      <span class="system-tag">${app.categoria}</span>
      ${app.status === "breve" ? '<span class="coming-soon">EM BREVE</span>' : '<span class="available">DISPONÍVEL</span>'}
    </div>
    <div class="card-body">
      <h3>${app.nome}</h3>
      <p>${app.descricao}</p>
    </div>
    <span class="system-link">${app.status === "ativo" ? "Abrir ferramenta" : "Em preparação"}<span aria-hidden="true"> ${app.status === "ativo" ? "→" : ""}</span></span>
  `;

  return card;
}

function renderizarAplicativos() {
  systemGrid.replaceChildren(...aplicativos.map(criarCard));
  const disponiveis = aplicativos.filter((app) => app.status === "ativo").length;
  toolsCount.textContent = `${disponiveis} disponível${disponiveis === 1 ? "" : "eis"}`;
}

async function protectPanel() {
  const { data, error } = await COMPUTUM.supabase.auth.getSession();

  if (error || !data.session) {
    window.location.replace("index.html");
    return;
  }

  userEmail.textContent = data.session.user.email || "";
  renderizarAplicativos();
}

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  logoutButton.textContent = "Saindo...";

  await COMPUTUM.supabase.auth.signOut();
  window.location.replace("index.html");
});

protectPanel();
