

var input = document.getElementById('tela'),
    numero = document.querySelectorAll('.numeros div'),
    conta = document.querySelectorAll('.contas div'),
    resultado = document.getElementById('resultado'),
    limpar = document.getElementById('limpar'),
    resultadoEstaMostrado = false;

let fonte = "normal";
   



for (var i = 0; i < numero.length; i++) {
    
	numero[i].addEventListener("click", function(e) {

		var textoNaTela = input.innerHTML;
		var ultimoChar = textoNaTela[textoNaTela.length - 1];

        if (resultadoEstaMostrado === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultadoEstaMostrado === true && ultimoChar === "+" || ultimoChar === "-" || ultimoChar === "x" || ultimoChar === "/") {
            // se o resultado ja foi mostrado e o usuario aperta um bot�o de conta continuam adicionando na tela para a pr�xima opera��o
            resultadoEstaMostrado = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            //se o resultado ja foi mostrado e o usuario apertar um numero limpa a tela e come�a uma nova opera��o
            resultadoEstaMostrado = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }


    });

}

// adiconando evento de clique nos bot�es das contas
for (var i = 0; i < conta.length; i++) {
    conta[i].addEventListener("click", function (e) {

        // variaveis do texto na tela e o ultimo caractere 
        var textoNaTela = input.innerHTML;
        var ultimoChar = textoNaTela[textoNaTela.length - 1];

        // se o ultimo caractere mostrado for uma conta, substitui pela que foi clicada
        if (ultimoChar === "+" || ultimoChar === "-" || ultimoChar === "x" || ultimoChar === "/") {
            var newString = textoNaTela.substring(0, textoNaTela.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (textoNaTela.length == 0) {
            //se a primeira tecla pressionada for uma conta, avisa o usuario para colocar um numero primeiro

            var apenasNumero = "Digite Um Numero!";
            input.innerHTML = `<span class="${fonte}">${apenasNumero}</span>`;
            

            setTimeout(function () {

                input.innerHTML = "";

            }, 700);
                

            
        } else {
            //sen�o apenas adiciona a conta pressionada na tela
            input.innerHTML += e.target.innerHTML;
        }

    });
}

// adiconando evento de clique no bot�o igual
resultado.addEventListener("click", function () {

    // texto que ser� processado
    var inputString = input.innerHTML;

    // fazendo uma lista dos numeros que ser�o processados
    var numeros = inputString.split(/\+|\-|\x|\//g);

    // fazendo uma lista das contas que ser�o processadas
    var contas = inputString.replace(/[0-9]|\./g, "").split("");

    // fazendo as contas uma de cada vez em ordem, primeiro divis�o depois multiplica��o, subtra��o e adi��o
    var divide = contas.indexOf("/");
    while (divide != -1) {
        numeros.splice(divide, 2, numeros[divide] / numeros[divide + 1]);
        contas.splice(divide, 1);
        divide = contas.indexOf("/");
    }

    var multiply = contas.indexOf("x");
    while (multiply != -1) {
        numeros.splice(multiply, 2, numeros[multiply] * numeros[multiply + 1]);
        contas.splice(multiply, 1);
        multiply = contas.indexOf("x");
    }

    var subtract = contas.indexOf("-");
    while (subtract != -1) {
        numeros.splice(subtract, 2, numeros[subtract] - numeros[subtract + 1]);
        contas.splice(subtract, 1);
        subtract = contas.indexOf("-");
    }

    var add = contas.indexOf("+");
    while (add != -1) {
        numeros.splice(add, 2, parseFloat(numeros[add]) + parseFloat(numeros[add + 1]));
        contas.splice(add, 1);
        add = contas.indexOf("+");
    }

    input.innerHTML = numeros[0]; // mostrando resultado na tela

    resultadoEstaMostrado = true; // dizendo que o resultado est� sendo mostrado
});

// adiconando evento de clique no bot�o limpar
limpar.addEventListener("click", function () {
    input.innerHTML = "";
})

