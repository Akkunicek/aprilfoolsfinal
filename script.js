let noClickCount = 0;

const backgroundMusic = document.getElementById('backgroundMusic');
const yesMusic = document.getElementById('yesMusic');
const noMusic = document.getElementById('noMusic');

// Automatické prehrávanie hudby po otvorení stránky s kontrolou chyby
window.onload = () => {
    backgroundMusic.volume = 0.5;

    // Povolenie hudby po prvej interakcii používateľa
    document.body.addEventListener('click', enableSound, { once: true });
};

// Povolenie prehrávania po interakcii, ak automaticky neprehráva
function enableSound() {
    backgroundMusic.play().catch(err => {
        console.log("Hudba sa nespustila automaticky. Kliknutím povolte hudbu.");
    });
}

function selectOption(choice) {
    if (choice === "Ano") {
        backgroundMusic.pause();
        noMusic.pause();
        
        yesMusic.currentTime = 0;
        yesMusic.play().catch(err => console.error("Nepodarilo sa prehrať hudbu:", err));

        document.querySelector("img").src = "rawr.png";
        document.querySelector("h1").textContent = "Ja som to vedel 😎🤙";
        document.querySelector("h2").textContent = "Daj mi vedieť ako sa ti to páčilo a dúfam že potešilo a zdvihlo náladu";
        document.querySelector("h5").textContent = "Dúfam že SCIO testy sa podaria <3";
        document.querySelector(".tlacitko").style.display = "none";
    } else {
        noClickCount++;

        // Pozastaviť backgroundMusic iba pri prvom kliknutí na "Nie"
        if (noClickCount === 1) {
            backgroundMusic.pause();
        }

        // Spusti hudbu "Nie" len ak ešte nehrá
        if (noMusic.paused) {
            noMusic.play().catch(err => console.error("Nepodarilo sa prehrať hudbu:", err));
        }

        let image = document.querySelector("img");
        let heading1 = document.querySelector("h1");
        let heading2 = document.querySelector("h2");
        let heading3 = document.querySelector("h5");
        let buttonNo = document.getElementById("nie");

        if (noClickCount === 1) {
            image.src = "kittyswag.png";
            heading1.textContent = "Môžeš si to ešte rozmyslieť";
            heading2.textContent = "budem smutnučký";
            heading3.textContent = "😿(ked stlačíš nie ešte 2x taksa to zmení troška)😿";
        } else if (noClickCount === 3) {
            image.src = "confused.png";
            heading1.textContent = "PREČO STLÁČAŠ NIE?";
            heading2.textContent = "A to som si dal záležať";
            heading3.textContent = "😭(keď stlačíš nie ešte 3x tak sa to zmení troška)";
        } else if (noClickCount === 6) {
            image.src = "freak.png";
            heading1.innerHTML = "Mohla by si stlačiť áno 🤓 <br>  (nech tu neni táto hrozná fotka 😭)";
            heading2.textContent = "Ak budeš stláčať nadaľej nie tak chcem aby si vedeľa že";
            heading3.textContent = "Dúfam že SCIO testy sa podaria tentokŕat";
        }

        // 📌 Uistíme sa, že tlačidlo "Nie" je v absolútnej pozícii
        buttonNo.style.position = "absolute";

        // 🔀 Náhodná nová pozícia tlačidla
        let maxX = window.innerWidth - buttonNo.offsetWidth;
        let maxY = window.innerHeight - buttonNo.offsetHeight;
        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);
        buttonNo.style.left = randomX + "px";
        buttonNo.style.top = randomY + "px";
    }
}

