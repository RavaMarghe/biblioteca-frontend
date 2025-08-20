document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementsByClassName("login-btn");
  const modalPlaceholder = document.getElementById("modal-placeholder");
  const signupModalPlaceholder = document.getElementById(
    "signup-modal-placeholder"
  );
  const transparentLayer = document.getElementById("transparent-layer");

  // Apertura modale con form di accesso
  loginBtn.addEventListener("click", () => {
    fetch("/html/modale-login.html")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Html del modale di login non trovato");
        }
        return res.text();
      })
      .then((html) => {
        console.log("Contenuto caricato: ", html);
        modalPlaceholder.innerHTML = html;

        const modal = document.getElementById("auth-modal");
        if (!modal) {
          console.error("Modale non trovato");
          return;
        }

        // Visualizzo il modale di accesso
        modal.style.display = "block";
        transparentLayer.style.display = "block";

        // Chiudo il modale con il bottone di chiusura
        const closeBtn = document.getElementById("close-modal");
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
          transparentLayer.style.display = "none";
        });

        // Chiudo il modale cliccando al di fuori
        window.addEventListener("click", (e) => {
          if (e.target === transparentLayer) {
            modal.style.display = "none";
            transparentLayer.style.display = "none";
          }
        });

        // Switch al form di registrazione
        const switchToSignup = document.getElementById("switch-to-signup");
        switchToSignup.addEventListener("click", () => {
          fetch("/html/modale-signup.html")
            .then((res) => {
              if (!res.ok) {
                throw new Error("Html del modale di login non trovato");
              }
              return res.text();
            })
            .then((signupHtml) => {
              console.log("Contenuto caricato: ", signupHtml);
              modalPlaceholder.innerHTML = signupHtml;

              // Mostro il di registrazione
              const signupModal = document.getElementById("signup-modal");
              if (!signupModal) {
                console.error("Modale non trovato");
                return;
              }

              signupModal.style.display = "block";

              // Chiudo il modale con il bottone di chiusura
              const closeBtn = document.getElementById("close-modal");
              closeBtn.addEventListener("click", () => {
                signupModal.style.display = "none";
                transparentLayer.style.display = "none";
              });

              // Chiudo il modale cliccando al di fuori
              window.addEventListener("click", (e) => {
                if (e.target === transparentLayer) {
                  signupModal.style.display = "none";
                  transparentLayer.style.display = "none";
                }
              });

              // Torno al form di accesso
              const switchToLogin = document.getElementById("switch-to-login");
              switchToLogin.addEventListener("click", () => {
                loginBtn.click();
              });
            });
        });
      });
  });
});
