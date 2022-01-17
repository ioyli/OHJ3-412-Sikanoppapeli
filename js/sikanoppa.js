// sikanoppapeli

let maxPisteet = 0;
let nopat = 0;
let pelaajaMaara = 0;
let pelaajaLista = [];

function setup() {

    // määritä max pisteet
    maxPisteet = document.getElementById("maxPisteet").value;
    
    // määritä noppien määrä
    const selections = document.querySelectorAll('input[name="noppaMaara"]')
    for (const selection of selections) {
        if (selection.checked) {
            nopat = selection.value;
            break;
        }
    }

    // määritä pelaajien määrä ja nimet
    pelaajaMaara = document.getElementById("pelaajaMaara").value;
    let text = "";

    for (let i = 0; i < pelaajaMaara; i++) {
        text = text + `<label for="pelaajaNimi${i + 1}">Pelaajan ${i + 1} nimi:</label> <input type="text" id="pelaajaNimi${i + 1}" name="pelaajaNimi${i + 1}"><br>`;
    }

    if (pelaajaMaara > 1) {
        document.getElementById("pelaajienNimet").innerHTML = `${text}`;
        document.getElementById("valmis").style.display = "block";
    } else {
        document.getElementById("pelaajienNimet").innerHTML = "Ei tarpeeksi pelaajia!";
    }
}

// luo lista pelaajista
function Pelaaja(nimi, pisteet, vuoro) {
    this.nimi = nimi;
    this.pisteet = pisteet;
    this.vuoro = vuoro;
}

function finalize() {
    for (let i = 0; i < pelaajaMaara; i++) {
        let pelaaja = document.getElementById(`pelaajaNimi${i + 1}`).value;
        pelaajaLista.push(new Pelaaja(pelaaja, 0, i));
    }

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";

    refreshPlayer(0);
}

// SIKANOPPA
let vuoro = 0;
let pisteet = 0;
let tuplatPerakkain = 0;

function heita() {
    if (vuoro == pelaajaMaara) {
        vuoro = 0;
    }
    refreshPlayer(vuoro);

    let noppa = Math.floor(Math.random() * 6) + 1;
    let noppaB = Math.floor(Math.random() * 6) + 1;

    // YHDELLÄ NOPALLA
    if (nopat == 1) {
        if (!(noppa == 1)) {
            pisteet += noppa;
        }
    
        refreshPlayer(vuoro);
        document.getElementById("huom").innerHTML = `Heitit ${noppa}!`;
    
        // vuoro loppuu ja pisteet menetetään jos heitto on 1
        if (noppa == 1) {
            document.getElementById("huom").innerHTML = `Heitit ${noppa}! Menetit heittämäsi pisteet ja vuoro vaihtuu.`;
            pisteet = 0;
            vuoro++;
        }
    }

    // KAHDELLA NOPALLA
    if (nopat == 2) {

        // Kun heität tuplat, saat tuplapisteet
        if (noppa == noppaB) {
            if (pisteet == 0) {
                pisteet = (noppa + noppaB) * 2;
            } else {
                pisteet = pisteet * 2;
            }

            if (tuplatPerakkain == 3) {
                document.getElementById("huom").innerHTML = `Heitit tuplat peräkkäin kolmesti! Menetit heittämäsi pisteet ja vuoro vaihtuu.`;
                refreshPlayer(vuoro);
                pisteet = 0;
                vuoro++;
            } else {
                document.getElementById("huom").innerHTML = `Heitit ${noppa} ja ${noppaB}! Saat tuplapisteet.`;
                refreshPlayer(vuoro);
            }
        } else if (noppa == 1 || noppaB == 1) {
            document.getElementById("huom").innerHTML = `Heitit ${noppa} ja ${noppaB}! Vain toinen on 1, joten menetit heittämäsi pisteet ja vuoro vaihtuu.`;
            refreshPlayer(vuoro);
            pisteet = 0;
            vuoro++;
        } else {
            document.getElementById("huom").innerHTML = `Heitit ${noppa} ja ${noppaB}!`;
            pisteet += noppa + noppaB;
            refreshPlayer(vuoro);
        }
    }
}

function refreshPlayer(vuoro) {
    document.getElementById("vuoro").innerHTML = `${pelaajaLista[vuoro].nimi}`;
    document.getElementById("vuoroPisteet").innerHTML = `${pisteet}`;
    document.getElementById("pelaajanPisteet").innerHTML = `${pelaajaLista[vuoro].pisteet}`;
}

// vuoro loppuu ja pisteet lisätään kun itse niin päättää
function lopetaVuoro() {
    pelaajaLista[vuoro].pisteet += pisteet;

    if (pelaajaLista[vuoro].pisteet >= maxPisteet) {
        let winner = `Onneksi olkoon, ${pelaajaLista[vuoro].nimi}! Keräsit eniten pisteitä, ja voitit pelin!`
        document.getElementById("game").innerHTML = winner + `<br> <button onclick="window.location.reload(true)">Uusi peli</button>`;
    } else {
        pisteet = 0;
        vuoro++;

        if (vuoro == pelaajaMaara) {
            vuoro = 0;
        }
        document.getElementById("huom").innerHTML = "";
        refreshPlayer(vuoro);
    }
}