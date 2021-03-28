var data;
var digit = [];
var random_number = '';
var won = 0;
var valida;

random();

$('#number').keypress(enter);
$('.replay a').on('click', replay);

function enter(e) {
  var code = e.keyCode ? e.keyCode : e.which;
  if (code == 13) {
    var numero = $('#number').val();
    valida = validateplayerNumber(numero);
    if (valida == 1) {
      $('#err').removeClass('error');
      picasFijas(numero, random_number);
      obtenerDatos(numero);
      addResult();
    } else {
      $('#err').addClass('error');
    }
  }
}

function random() {
  // Hecho por KarlanKas en el 2004
  //No me quites el crédito
  for (i = 0; i < 4; i++) {
    digit[i] = parseInt(Math.random() * 10);
    for (j = 0; j < i; j++) {
      if (digit[i] == digit[j]) {
        i -= 1;
        break;
      }
    }
  }
  for (i = 0; i < 4; i++) {
    random_number += digit[i];
  }
  return random_number;
}

function validateplayerNumber(playerNumber) {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < i; j++) {
      if (playerNumber[i] == playerNumber[j] || playerNumber.length != 4) {
        i = 4;
        j = 4;
        validate = 0;
        break;
      } else {
        validate = 1;
      }
    }
  }
  return validate;
}

function picasFijas(playerNumber, randomNumber) {
  fijas = 0;
  picas = 0;
  for (var i = 0; i < playerNumber.length; i++) {
    for (var j = 0; j < playerNumber.length; j++) {
      if (playerNumber[i] === randomNumber[j] && i == j) {
        fijas++;
      } else if (playerNumber[i] === randomNumber[j]) {
        picas++;
      }
    }
  }
  if (fijas == 4) {
    won = 1;
    wonPlay();
  }
}

function obtenerDatos(number) {
  data = {
    numero: number,
    picas: picas,
    fijas: fijas,
  };

  $('#number').val('');
}

function addResult() {
  var source = $('#result_template').html();
  var template = Handlebars.compile(source);
  var html = template(data);

  $('tbody').append(html);
}

function wonPlay() {
  $('.won').show();
}

function replay() {
  $('.won').hide();
  random_number = '';
  random();
  $('tbody tr').remove();
}
