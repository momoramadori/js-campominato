// Il computer deve generare 16 numeri casuali tra 1 e 100, che saranno le "mine".
// In seguito deve chiedere all'utente di inserire un numero alla volta, sempre compreso tra 1 e 100, che sarà la sua giocata.
// Se il numero è presente nella lista delle mine, la partita termina, altrimenti il gioco continua chiedendo all'utente un altro numero (continua a giocare).
// La partita termina quando il giocatore becca una mina, ossia inserisce un numero "vietato", oppure se raggiunge il numero massimo possibile di numeri consentiti, ossia ha inserito tutti i numeri possibili che non sono mine!
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha inserito un numero consentito; in altre parole, deve comunicare all'utente quante giocate ha fatto prima di perdere.
// BONUS: all'inizio della partita, il software richiede anche un livello di difficoltà all'utente che cambia il range di numeri totali (le mine saranno sempre 16):
// con difficoltà 0=> si gioca con numeri che vanno da 1 a 100
// con difficoltà 1 => si gioca con numeri che vanno da 1 a 80
// con difficoltà 2=> si gioca con numeri che vanno da 1 a 50

//DA FARE IL BONUS!!!!!!!!!!!!!

// var difficolta = prompt('Scegli un livello di difficoltà 0,1 o 2');
// //Difficoltà 0
// if (difficolta == "0") {
//  var bomba = randomGenerator(1,100);
// } else if (difficolta == "1") {
//     bomba = randomGenerator(1,80);
// } else if (difficolta == "2") {
//     bomba = randomGenerator(1,50);
// }

//Generare 16 numeri casuali tra 1 e 100 (le mine)
var numeroCasuale = [];
while (numeroCasuale.length < 16) {
    var bomba = randomGenerator(1,100);
    if (numeroCasuale.includes(bomba) == false) {
        numeroCasuale.push(bomba);
    }
}
console.log(numeroCasuale);

//In seguito deve chiedere all'utente di inserire un numero alla volta, sempre compreso tra 1 e 100, che sarà la sua giocata.
var numeriUtente = [];
do {
    var giocataUtente = parseInt(prompt('Inserisci un numero tra 1 e 100'));
    numeriUtente.push(giocataUtente);
} while ( numeroCasuale.includes(giocataUtente) == false && numeriUtente.length < 84 );

if (numeriUtente.length == 84) {
    console.log('Complimenti, non hai preso nessuna bomba ed hai vinto!');
} else {
    console.log('Hai preso una bomba! il tuo punteggio è: ' + (numeriUtente.length - 1));
}

function randomGenerator(min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
