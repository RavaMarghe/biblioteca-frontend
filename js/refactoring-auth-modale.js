document.addEventListener("DOMContentLoaded", () => {
    const modalPlaceholder = document.getElementById("modal-placeholder");//contenitore per il modale
    const transparentLayer = document.getElementById("transparent-layer");//livello trasparente, per cliccare fuori e chiudere il modale
    const loginBtns = document.querySelectorAll("#login-btn, .login-btn");//in index.html è un id, in catalogo.html è una classe
    
    loginBtns.forEach(
        function (btn) {
            btn.addEventListener("click", apriModaleLogin);
        }
    );

    function apriModaleLogin() {
        fetch("/html/modale-login.html")
            .then((res) => {//res è un'oggetto Response
                if (!res.ok) {
                    throw new Error("Html del modale di login non trovato");
                }
                return res.text();//ritorna una stringa
            })
            .then((html) => {
                console.log("Contenuto caricato: ", html);
                modalPlaceholder.innerHTML = html;//Inserisce nel div #modal-placeholder il codice HTML del modale

                const modal = document.getElementById("auth-modal");//modale effettivo nel div #modal-placeholder
                if (!modal) {
                    console.error("Modale non trovato");
                    return;
                }

                // Visualizzo il modale di accesso
                modal.style.display = "block";
                transparentLayer.style.display = "block";

                // Chiudo il modale con il bottone di chiusura
                const closeBtn = document.getElementById("close-modal");
                closeBtn.addEventListener("click", () => { chiudiModale(modal) });

                // Chiudo il modale cliccando al di fuori
                transparentLayer.addEventListener("click", () => {chiudiModale(modal)})
                /*
                window.addEventListener("click", (e) => {
                    if (e.target === transparentLayer) { chiudiModale(modal) }
                });
                */


                const switchToSignup = document.getElementById("switch-to-signup");//span in modale-login
                // Switch al form di registrazione
                apriModaleSignup(switchToSignup);

            })
    }

    function apriModaleSignup(switchToSignup) {
        switchToSignup.addEventListener("click", () => {
            fetch("/html/modale-signup.html")
                .then((res) => {//controllo Response
                    if (!res.ok) {
                        throw new Error("Html del modale di login non trovato");
                    }
                    return res.text();
                })
                .then((signupHtml) => {//caricamento pagina di signup nel placeholder
                    console.log("Contenuto caricato: ", signupHtml);
                    modalPlaceholder.innerHTML = signupHtml;


                    const signupModal = document.getElementById("signup-modal");
                    if (!signupModal) {
                        console.error("Modale non trovato");
                        return;
                    }
                    // Mostro il modale di registrazione
                    signupModal.style.display = "block";

                    // Chiudo il modale con il bottone di chiusura
                    const closeBtn = document.getElementById("close-modal");
                    closeBtn.addEventListener("click", () => { chiudiModale(signupModal) });

                    // Chiudo il modale cliccando al di fuori
                    //window.addEventListener("click", () => {chiudiModale(signupModal)});
                     transparentLayer.addEventListener("click", () => {chiudiModale(signupModal)});

                    // Torno al form di accesso
                    const switchToLogin = document.getElementById("switch-to-login");//span in modale-signup
                    switchToLogin.addEventListener("click", () => {
                        apriModaleLogin(); //ricarica il login
                    });
                });
        });
    }

    function chiudiModale(modal) {
        modal.style.display = "none";
        transparentLayer.style.display = "none";
        console.log("Chiusura modale");
    }

})


