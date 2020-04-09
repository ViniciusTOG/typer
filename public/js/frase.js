$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
$("#botao-sync").click(sincronizaPlacar);

function fraseAleatoria() {
	$("#spinner").toggle();
	$.get("http://localhost:3000/frases",trocaFraseAleatoria)
	.fail(function(){
		$("#erro").show();
		setTimeout(function(){
			$("#erro").hide();
		},2000)
	})
	.always(function(){
		$("#spinner").toggle();
	});
}



function trocaFraseAleatoria (data) {
	var frase = $(".frase");
	var numeroAleatorio = Math.floor(Math.random() * data.length);
	frase.text(data[numeroAleatorio].texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
	$("#spinner").toggle();
	var fraseId = $("#frase-id").val();
	var dados = {id: fraseId};
	$.get("http://localhost:3000/frases",dados,trocaFrase)
	.fail(function(){
		$("#erro").toggle();
		setTimeout(function(){
			$("#erro").toggle();
		},2000)
	})
	.always(function(){
		$("#spinner").toggle();
	 });
}

function trocaFrase(retorno) {
	$(".frase").text(retorno.texto);
}

function sincronizaPlacar() {
	var placar = [];
	var linhas = $("tbody tr");
	linhas.each(function(){
		var usuario = $(this).find("td:nth-child(1)").text();
		var palavras = $(this).find("td:nth-child(2)").text();
		var score = {
			usuario: usuario,
			pontos: palavras
		};
		placar.push(score);

	})
	var dados = {
		placar: placar
	};
	$.post("http://localhost:3000/placar",dados,function() {
		console.log("salvou o placar no servidor");
	});
}

function atualizaPlacar() {
	$.get("http://localhost:3000/placar", function(data){
		$(data).each(function(){
			var linha = novaLinha(this.usuario, this.pontos);
			linha.find(".botao-remover").click(removeLinha);
			$("tbody").append(linha);
		});
	});
}