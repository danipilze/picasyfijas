var data;
var digit = [];
var won = 0;
var valida;


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
