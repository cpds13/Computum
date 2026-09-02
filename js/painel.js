// Computum — painel protegido

const userEmail = document.getElementById("user-email");
const logoutButton = document.getElementById("logout-button");

async function protectPanel() {
  const { data, error } = await COMPUTUM.supabase.auth.getSession();

  if (error || !data.session) {
    window.location.replace("index.html");
    return;
  }

  userEmail.textContent = data.session.user.email || "";
}

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;

  await COMPUTUM.supabase.auth.signOut();

  window.location.replace("index.html");
});

protectPanel();
