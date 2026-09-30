// ============================================================
// OUTILS DE STYLE POUR LE TERMINAL
// ============================================================

// 1. Un dictionnaire des codes d'échappement ANSI
// Ces codes indiquent au terminal de changer la couleur du texte.
const couleurs = {
    reset: "\x1b[0m",     // Arrête la couleur, retour à la normale
    rouge: "\x1b[31m",    // Pour les erreurs
    vert: "\x1b[32m",     // Pour les succès
    jaune: "\x1b[33m",    // Pour les avertissements ou les menus
    bleu: "\x1b[34m",     // Pour les informations
    magenta: "\x1b[35m",  // Pour mettre en évidence un résultat
    cyan: "\x1b[36m",     // Pour les titres de section
    gras: "\x1b[1m",      // Rend le texte plus épais (bold)
};

// 2. La fonction d'aide (Helper function)
// Elle prend votre texte, ajoute la couleur au début, 
// et ajoute le code "reset" à la fin pour ne pas colorer la suite.
function colorer(texte, code) {
    return code + texte + couleurs.reset;
}



const prompt = require('prompt-sync')();

const candidats = [
    {
        cin: "A123",
        nom: "Ettazi",
        prenom: "Rayan",
        partiPolitique: "justice",
        age: 45,
        electeurs: ["E001", "E002", "E003", "E004"]
    },
    {
        cin: "A456",
        nom: "Almi",
        prenom: "Sara",
        partiPolitique: "justice",
        age: 38,
        electeurs: ["E005", "E006"]
    },
    {
        cin: "a789",
        nom: "Bennani",
        prenom: "Sami",
        partiPolitique: "espoir",
        age: 50,
        electeurs: ["E007", "E008", "E009"]
    },
    {
        cin: "Z123",
        nom: "Ettaqy",
        prenom: "Aya",
        partiPolitique: "dev",
        age: 42,
        electeurs: ["E010"]
    },
    {
        cin: "Z456",
        nom: "Alami",
        prenom: "Mehdi",
        partiPolitique: "espoir",
        age: 47,
        electeurs: ["E011", "E012", "E013", "E014", "E015"]
    }
];
while (true) {
    console.log(colorer(`    =========================================================
    == Gestion des Élections et Listes Électorales au Maroc =
    =========================================================
        1-ajouter un nouveau candidaat
        2-ajouter plusieurs candidat
        3-afficher la liste de candidats
        4-voter pour un candidat
        5-modifier les informations d un candidat
        6-supprimer un candidat
        7-recherche les candidtas
        8-statistique de election:
        0-quitter`,couleurs.bleu));
    let infos = Number(prompt("votre choix: "))
    if (infos === 1) {
        ajouterCandidat();

    } else if (infos === 2) {
        ajouterPlusieursC();

    } else if (infos === 3) {
        AffichagelisteCandidats();

    } else if (infos === 4) {
        vote();

    } else if (infos === 5) {
        modifierCandidat();

    } else if (infos === 6) {
        supprimerCandidat();

    } else if (infos === 7) {
        rechercheCandidat();

    } else if (infos === 8) {
        Statistiquesdélection()

    } else if (infos === 0) {
        console.log("Au revoir !");
        break
    } else {
        console.log("Choix invalide !");
    }
}
function ajouterCandidat() {

    const cinajout = prompt(colorer("Entrer CIN : ",couleurs.jaune));

    for (let i = 0; i < candidats.length; i++) {

        if (candidats[i].cin === cinajout) {
            console.log(colorer("CIN DEJA EXIST",couleurs.bleu));
            return;
        }
    }

    const nom = prompt(colorer("Entrer le nom : ",couleurs.jaune));
    const prenom = prompt(colorer("Entrer le prenom : ",couleurs.jaune));
    const age = parseInt(prompt(colorer("Entrer votre age : ",couleurs.jaune)));
    const partiPolitique = prompt(colorer("Entrer ton partiPolitique : ",couleurs.jaune));

    const candidat = {
        cin: cinajout,
        nom: nom,
        prenom: prenom,
        age: age,
        partiPolitique: partiPolitique,
        electeurs: []
    };

    candidats.push(candidat);

    console.log("Candidat bien ajouté", candidat);
}
function ajouterPlusieursC() {
    const nombre = parseInt(prompt('combien tu vous vouler :'));
    for (let i = 0; i < nombre; i++) {
        const cin = prompt('entrer CIN   :');
        const partiPolitique = prompt('entrer ton partiPolitique :')
        const nom = prompt('entrer le nom  ');
        const prenom = prompt('enter le prenom  : ');
        const age = parseInt(prompt('enter votre age : '));

        const candidat = {
            nom: nom,
            prenom: prenom,
            age: age,
            cin: cin,
            partiPolitique: partiPolitique,
            electeurs: [],

        };
        candidats.push(candidat);
        console.log(candidat);
    }
}
function AffichagelisteCandidats() {
    const choix = prompt(`
        1- Trier les candidats
        2- Filtrer et afficher uniquement les candidats d'un parti spécifique`);


    if (choix === "1") {

        for (let i = 0; i < candidats.length - 1; i++) {
            for (let j = i + 1; j < candidats.length; j++) {

                if (candidats[i].electeurs.length < candidats[j].electeurs.length) {
                    let swap = candidats[i];
                    candidats[i] = candidats[j];
                    candidats[j] = swap;
                }
            }
        }
        console.table(candidats);
    } else if (choix === "2") {

        const partipl = prompt("Entrer un parti politique: ");

        let trouve = false;

        for (let i = 0; i < candidats.length; i++) {

            if (candidats[i].partiPolitique === partipl) {

                console.log(`
CIN : ${candidats[i].cin}
Nom et Prenom : ${candidats[i].nom} ${candidats[i].prenom}
Age : ${candidats[i].age}
Parti Politique : ${candidats[i].partiPolitique}
Nombre de vote : ${candidats[i].electeurs.length}`);

                trouve = true;
            }
        }

        if (!trouve) {
            console.log("Aucun candidat de ce parti");
        }
    }
}
function modifierCandidat() {
    const choix = prompt(`
1-modifier le partipolitique :
2-modifer age d un candidat  :`)

    if (choix === "1") {
        const cincandidat = prompt('entrer le cin de candidat pour changer partipolitique');
        const nouveaupartipolitique = prompt('enter nououveau parti politique')
        for (i = 0; i < candidats.length; i++) {
            if (candidats[i].cin === cincandidat) {
                candidats[i].partiPolitique = nouveaupartipolitique;
                console.log("Parti politique modifie avec succes", candidats[i]);
                return;
            }
        }
    } else if (choix === "2") {
        const cincandidat1 = prompt('enter  enter un cin du candidat :')
        const agemodif = parseInt(prompt('entrer un age pour modifer :'));

        for (i = 0; i < candidats.length; i++) {
            if (candidats[i].age === agemodif) {
                candidats[i].age = agemodif;
                console.log('age modifer avec succes ', candidats[i]);
            }

        }
    }
}

function vote() {

    const proprecin = prompt("Entrer le CIN de l'électeur :");

    // bach n3rf wach le cin déja kin
    for (let i = 0; i < candidats.length; i++) {

        for (let j = 0; j < candidats[i].electeurs.length; j++) {

            if (proprecin === candidats[i].electeurs[j]) {

                console.log("CIN electeur  deja exist");
                return;
            }
        }
    }

    // ila makanch ntlb sin dyal candidat
    const cinducandidat = prompt("Entrer le CIN du candidat :");

    for (let i = 0; i < candidats.length; i++) {

        if (candidats[i].cin === cinducandidat) {

            candidats[i].electeurs.push(proprecin);

            console.log("Vote enregistre avec succes");
            return;
        }
    }

    console.log("Candidat introuvable");



}
function rechercheCandidat() {
    //   count=0;
    const nomcandidatRechercher = prompt('entrer le nom de candidat :')
    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].nom === nomcandidatRechercher) {
            console.log(candidats[i]);
            //   count++;
            //   if (count===2){
            //     break;
            //   }

        }
    }
}
function supprimerCandidat() {

    const cinCandidatSupp = prompt("Enter le CIN du candidat à supprimer : ");

    for (let i = 0; i < candidats.length; i++) {

        if (candidats[i].cin === cinCandidatSupp) {
            candidats.splice(i, 1);
            console.log("Candidat supprimé");
            break;
        }
    }
}
function Statistiquesdélection() {
    console.log(`
1.Afficher le nombre total de candidats. 
2.Afficher le nombre total de votes exprimés dans toute l'élection. 
3.Afficher le Top 3 des candidats ayant le plus de votes. 
4.Afficher le nombre de candidats par parti politique. `)
    let ssake = Number(prompt("your choix :"))
    if (ssake === 1) {
        let total = 0
        for (let i = 0; i < candidats.length; i++) {
            total += 1
        }
        console.log(`le number total est : ${total} candidats`)
    } else if (ssake === 2) {
        let tote = 0
        for (let g = 0; g < candidats.length; g++) {
            tote = tote + candidats[g].electeurs.length
        }
        console.log(`le number total des electeurs : ${tote}`)
    } else if (ssake === 3) {
        let soso = [...candidats]
        for (let i = 0; i < soso.length; i++) {
            for (let b = 0; b < soso.length - i - 1; b++) {
                if (soso[b].electeurs.length < soso[b + 1].electeurs.length) {
                    let temp = soso[b]
                    soso[b] = soso[b + 1]
                    soso[b + 1] = temp
                }
            }
        }
        let dd = 3
        if (soso.length < 3) {
            dd = soso.length
        }
        for (let f = 0; f < dd; f++) {
            console.log(`
CIN : ${soso[f].cin}
Nom et Prenom : ${soso[f].nom} ${soso[f].prenom}
Age : ${soso[f].age}
Parti Politique : ${soso[f].partiPolitique}
Nombre de vote : ${soso[f].electeurs.length}
`);
        }
    } else if (ssake === 4) {
        let partis = []
        for (let i = 0; i < candidats.length; i++) {
            let existe = false
            for (let x = 0; x < partis.length; x++) {

                if (partis[x] === candidats[i].partiPolitique) {
                    existe = true
                    break
                }
            }
            if (existe === false) {
                partis.push(candidats[i].partiPolitique)
            }
        }
        for (let i = 0; i < partis.length; i++) {
            let compteur = 0
            for (let x = 0; x < candidats.length; x++) {
                if (candidats[x].partiPolitique === partis[i]) {
                    compteur++
                }
            }
            console.log(colorer(`${partis[i]} : ${compteur} candidat(s)`, couleurs.vert))
        }
    } else {
        console.log(colorer("thats is not option ", couleurs.rouge))
    }
}
