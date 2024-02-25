self.addEventListener("fetch", function (event) {
    
});

self.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    const deferredPrompt = e;

    console.log('@@@@@@@@@@@')
    document.querySelector("install-div").style.display="block"
    installButton = document.querySelector("install-btn")

    installButton.addEventListener('click', () => {

        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('App installed');
            } else {
                console.log('App installation declined');
            }

            installButton.style.display = 'none';
        });
    });

    document.body.appendChild(installButton);
});
