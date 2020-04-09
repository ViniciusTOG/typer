var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
var frase = $(".frase").text(); 

$(function(){
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaMarcadores();
  reiniciaJogo();
  atualizaPlacar();
  });

function atualizaTempoInicial(tempo){
  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}


function inicializaContadores() {
  campo.on("input", function() {
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    var contadorPalavras = $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    var contadorCaracteres = $("#contador-caracteres").text(qtdCaracteres);
  })
}


function inicializaCronometro(){
  campo.one("focus", function() {
    var tempoRestante = $("#tempo-digitacao").text();
    var cronometroId = setInterval(function() {
      tempoRestante--;
      console.log(tempoRestante);
      $("#tempo-digitacao").text(tempoRestante);
      if(tempoRestante < 1) {
        clearInterval(cronometroId);
        finalizaJogo();
      }
    },1000);
  })

}
function finalizaJogo() {
    campo.attr("disabled",true);
    campo.addClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
    campo.on("input", function () {
    var frase = $(".frase").text(); 
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);
    if(digitado.length > 0) {
      if(digitado == comparavel) {
        campo.addClass("campo-verde");
        campo.removeClass("campo-vermelho");
      }else{
        campo.addClass("campo-vermelho");
      }
  }else{
    campo.removeClass("campo-verde");
    campo.removeClass("campo-vermelho");
  }
  })

}

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var numPalavras = $("#contador-palavras").text();
  var usuario = "Douglas";
  
  var linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);
  $(".placar").slideDown(500); 
  scrollPlacar();
  console.log($(".placar").offset().top);

}

function scrollPlacar() {
  var posicaoPlacar = $(".placar").offset().top;
  $("html, body").animate(
  {
    scrollTop: posicaoPlacar+"px"
  },1000);
}

function novaLinha(usuario,palavras) {
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");
  var link = $("<a>").addClass("botao-remover").attr("href","#");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;

}

function removeLinha() {
  event.preventDefault();
  var linha = $(this).parent().parent();
  linha.fadeOut();
  setTimeout(function() {
    linha.remove();
  },1000)
}


function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("campo-verde");
    campo.removeClass("campo-vermelho");
}

function mostraPlacar() {
  $(".placar").stop().slideToggle();
}

$("#botao-reiniciar").click(reiniciaJogo);

$("#botao-placar").click(mostraPlacar);