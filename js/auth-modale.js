document.addEventListener("DOMContentLoaded", () => {
    const modalPlaceholder = document.getElementById("modal-placeholder");//contenitore per il modale
    const transparentLayer = document.getElementById("transparent-layer");//livello trasparente, per cliccare fuori e chiudere il modale
    const loginBtns = document.querySelectorAll("#login-btn");//in index.html e catalogo.html
    /*
    loginbtns è una NodeList,
    querySelectorAll cerca tutti gli elementi con id="login-btn" presenti nella pagina corrente
    in loginBtns ci sarà un solo elemento, perchè non stai mai caricando due pagine HTML nello stesso DOM: 
    ogni volta il browser carica solo una.
    querySelectorAll può essere utile se in futuro se dovessimo avere più bottoni di login nella stessa pagina.
    */

    console.log(loginBtns);//stampa di debug
    loginBtns.forEach(
        function (btn) {
            btn.addEventListener("click", apriModaleLogin);
        }
    );

    // Aggiungo un listener per il click sul livello trasparente
    // Se clicco sul livello trasparente, chiudo il modale
    transparentLayer.addEventListener("click",
        () => {
            //seleziona il modale aperto (il primo che ha display: block)
            const modaleAperto = modalPlaceholder.querySelector(".modal[style*='display: block']");
            if (modaleAperto) {
                chiudiModale(modaleAperto);
            }
        })

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
                //onclick è una proprietà dell'elemento, cui assegno una funzione                                     
                closeBtn.onclick = () => { chiudiModale(modal) };

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
                    closeBtn.onclick = () => { chiudiModale(signupModal) };

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


