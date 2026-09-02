// Computum — autenticação

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const buttonLabel = loginButton.querySelector(".button-label");
const buttonLoading = loginButton.querySelector(".button-loading");
const errorBox = document.getElementById("auth-error");
const successBox = document.getElementById("auth-success");
const forgotButton = document.getElementById("forgot-password");
const togglePassword = document.getElementById("toggle-password");

function showMessage(box, message) {
  box.textContent = message;
  box.hidden = false;
}

function hideMessages() {
  errorBox.hidden = true;
  successBox.hidden = true;
}

function setLoading(loading) {
  loginButton.disabled = loading;
  buttonLabel.hidden = loading;
  buttonLoading.hidden = !loading;
}

function translateError(error) {
  const message = (error?.message || "").toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "E-mail ou senha inválidos.";
  }

  if (message.includes("email not confirmed")) {
    return "O e-mail desta conta ainda não foi confirmado.";
  }

  if (message.includes("too many requests")) {
    return "Muitas tentativas. Aguarde alguns instantes e tente novamente.";
  }

  if (message.includes("network")) {
    return "Não foi possível conectar ao serviço de autenticação.";
  }

  return error?.message || "Não foi possível realizar o login.";
}

async function checkSession() {
  const { data } = await COMPUTUM.supabase.auth.getSession();

  if (data.session) {
    window.location.replace("painel.html");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideMessages();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showMessage(errorBox, "Informe o e-mail e a senha.");
    return;
  }

  setLoading(true);

  const { error } = await COMPUTUM.supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    showMessage(errorBox, translateError(error));
    setLoading(false);
    return;
  }

  window.location.replace("painel.html");
});

forgotButton.addEventListener("click", async () => {
  hideMessages();

  const email = emailInput.value.trim();

  if (!email) {
    showMessage(errorBox, "Informe seu e-mail para receber o link de recuperação.");
    emailInput.focus();
    return;
  }

  const { error } = await COMPUTUM.supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + window.location.pathname
  });

  if (error) {
    showMessage(errorBox, translateError(error));
    return;
  }

  showMessage(successBox, "Se a conta existir, enviaremos as instruções de recuperação para o e-mail informado.");
});

togglePassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  togglePassword.setAttribute("aria-label", showing ? "Mostrar senha" : "Ocultar senha");
  togglePassword.title = showing ? "Mostrar senha" : "Ocultar senha";
  togglePassword.textContent = showing ? "◉" : "◌";
});

COMPUTUM.supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN" && session) {
    window.location.replace("painel.html");
  }
});

checkSession();
