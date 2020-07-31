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
var numeroCasuale = [];
//Instanzio a zero l'array delle mine
var numeriPossibili = 0;

$('button').click(function(){
    //al click per giocare compio queste azioni di "default"
    numeroCasuale = [];
    $('.description').addClass('hidden');
    $('.grid').empty();
    $('.grid').removeClass('hidden');
    $('.grid').append('<div class="layer-loser hidden"></div>');
    $('.grid').addClass('active');
    $('.message').addClass('hidden');
    // Prendo la difficoltà scelta dall'utente e creo il relativo campo minato
    creazioneCampo();
    //Generare 16 numeri casuali tra 1 e max (le mine)
    mineGenerator();
    //creo la griglia del campo minato utilizzando Handlebars
    handlebarsGridGenerator();
})

//gestisco la partita dell'utente
$('body').on('click','.entry', function(){
        //se l'utente ha preso una bomba
       if (numeroCasuale.includes(parseInt($(this).data('number')))) {
            //faccio apparire la bomba
            $(this).find('i').removeClass('hidden');
            //non posso più cliccare nulla sulla griglia
            $('.grid').removeClass('active');
            //la griglia viene oscurata
            $('.layer-loser').removeClass('hidden');
            $('.message h1').removeClass('green');
            $('.message h1').addClass('red');
            $('.message h1').text('HAI PERSO!');
            //compare il messaggio di sconfitta
            $('.message').removeClass('hidden');
       } else {
            $(this).addClass('alive');
            //se non prende nessuna mina allora ha vinto
            console.log($('.alive').length);
            console.log(numeriPossibili);
            console.log(numeroCasuale.length);
            if($('.alive').length == numeriPossibili - numeroCasuale.length) {
                $('.grid').removeClass('active');
                $('.layer-loser').removeClass('hidden');
                $('.message h1').addClass('green');
                $('.message h1').text('HAI VINTO!');
                $('.message').removeClass('hidden');
            }
       }
       //il numero delle caselle cliccate corrisponde al puunteggio
       $('.score').text($('.alive').length);
    })

function randomGenerator(min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function creazioneCampo() {
    var difficolta = $('select').val();
    if (difficolta == "0") {
        return numeriPossibili = 100;
    } else if (difficolta == "1") {
        return numeriPossibili = 80;
    } else if (difficolta == "2") {
        return numeriPossibili = 50;
    }
}

function mineGenerator() {
    while (numeroCasuale.length < numeroMine) {
        var bomba = randomGenerator(1,numeriPossibili);
        if (numeroCasuale.includes(bomba) == false) {
            numeroCasuale.push(bomba);
        }
    }
    return numeroCasuale;
}

function handlebarsGridGenerator(){
    //creo un array con numeri da 1 a numeriPossibili per generare tutte le caselle
    var rangeNumbers = [];
    for (let index = 1; index <= numeriPossibili; index++) {
        rangeNumbers.push(index);
    }
    //utilizzo la funzione base di handlebars per generare il template
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
}