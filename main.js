// Il computer deve generare 16 numeri casuali tra 1 e 100, che saranno le "mine".
// In seguito deve chiedere all'utente di inserire un numero alla volta, sempre compreso tra 1 e 100, che sarà la sua giocata.
// Se il numero è presente nella lista delle mine, la partita termina, altrimenti il gioco continua chiedendo all'utente un altro numero (continua a giocare).
// La partita termina quando il giocatore becca una mina, ossia inserisce un numero "vietato", oppure se raggiunge il numero massimo possibile di numeri consentiti, ossia ha inserito tutti i numeri possibili che non sono mine!
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha inserito un numero consentito; in altre parole, deve comunicare all'utente quante giocate ha fatto prima di perdere.
// BONUS: all'inizio della partita, il software richiede anche un livello di difficoltà all'utente che cambia il range di numeri totali (le mine saranno sempre 16):
// con difficoltà 0 => si gioca con numeri che vanno da 1 a 100
// con difficoltà 1 => si gioca con numeri che vanno da 1 a 80
// con difficoltà 2 => si gioca con numeri che vanno da 1 a 50


//Creo una variabile per poter variare il numero
var numeroMine = 16;
//Instanzio l'array dei numeri casuali fuori così da poterlo riutilizza lo stesso nei due click
numeroCasuale = [];

$('button').click(function(){
    $('.description').addClass('hidden');

    $('.grid').empty();
    $('.grid').removeClass('hidden');
    $('.grid').append('<div class="layer-loser hidden"></div>');
    $('.grid').addClass('active');
    $('.message').addClass('hidden');

    // Prendo la difficoltà scelta dall'utente e creo il relativo campo minato
    var difficolta = $('select').val();
    if (difficolta == "0") {
        var numeriPossibili = 100;
       } else if (difficolta == "1") {
           numeriPossibili = 80;
       } else if (difficolta == "2") {
           numeriPossibili = 50;
       }

    //Generare 16 numeri casuali tra 1 e max (le mine)
    while (numeroCasuale.length < numeroMine) {
        var bomba = randomGenerator(1,numeriPossibili);
        if (numeroCasuale.includes(bomba) == false) {
            numeroCasuale.push(bomba);
        }
    }
    console.log(numeroCasuale);

    //creo un array con numeri da 1 a numeriPossibili
    var rangeNumbers = [];
    for (let index = 1; index <= numeriPossibili; index++) {
        rangeNumbers.push(index);
    }
    var source   = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    for (let index = 0; index < numeriPossibili; index++) {
        var context = {
            number: rangeNumbers[index],
            bomb: '<i class="fas fa-bomb hidden"></i>'
        };
        var html = template(context);
        $('.grid').append(html);
    }


    //In seguito deve chiedere all'utente di inserire un numero alla volta, sempre compreso tra 1 e 100, che sarà la sua giocata.
    // var numeriUtente = [];
    // do {
    //     var giocataUtente = parseInt(prompt('Inserisci un numero tra 1 e ' + numeriPossibili));
    //     numeriUtente.push(giocataUtente);
    // } while ( numeroCasuale.includes(giocataUtente) == false && numeriUtente.length < numeriPossibili - numeroMine );

    // if (numeriUtente.length == numeriPossibili - numeroMine) {
    //     console.log('Complimenti, non hai preso nessuna bomba ed hai vinto!');
    // } else {
    //     console.log('Hai preso una bomba! il tuo punteggio è: ' + (numeriUtente.length - 1));
    // }

    
})

$('body').on('click','.entry', function(){
    console.log(numeroCasuale);
    //se l'utente ha preso una bomba
       if (numeroCasuale.includes(parseInt($(this).data('number')))) {
            //faccio apparire la bomba
            $(this).find('i').removeClass('hidden');
            //non posso più cliccare nulla sulla griglia
            $('.grid').removeClass('active');
            //la griglia viene oscurata
            $('.layer-loser').removeClass('hidden');
            $('.message').removeClass('hidden');
            $('.score').text($('.alive').length);
            numeroCasuale = [];
       } else {
            $(this).addClass('alive');
       }
    })



function randomGenerator(min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}