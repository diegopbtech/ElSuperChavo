    var qtBiblioteca = biblioteca.length-1
    var pos
    var palavra
    var tam
    var jogador
    var espaco
    var cxLetras = []
    var errosLetras = []
    var acertos=0
    var errosMax = 7
    var erros = 0
    var desenho = []
    var maxDicas = 10

    desenho[1] = document.getElementById("cabeca")
    desenho[2] = document.getElementById("corpo")
    desenho[3] = document.getElementById("bracoE")
    desenho[4] = document.getElementById("bracoD")
    desenho[5] = document.getElementById("pernaE")
    desenho[6] = document.getElementById("pernaD")
    desenho[7] = document.getElementById("olhos")

    var pontos = 1
    var jogando = false
    var cabecalho = document.querySelector('#titulo')
    var botaoJogar = document.querySelector('#jogar')

    function defineLetras(){
        var obj
        var string = palavra.split('')

        for(let i in biblioteca){
            obj = document.getElementById("letra"+i).value = ''
            obj = document.getElementById("letra"+i).style.display = "none"
            obj = document.getElementById("letra"+i).style.backgroundColor = 'white'
        }

        for(let i in string){
            if(string[i]==' '){
                obj = document.getElementById("letra"+i).style.display = "inline-block"
                obj = document.getElementById("letra"+i).style.backgroundColor = 'transparent'
            } else {
                obj = document.getElementById("letra"+i).style.display = "inline-block"
            }
        }
    }

    function inicia(){
        pos = Math.round(Math.random()*qtBiblioteca)
        palavra = biblioteca[pos]
        cabecalho.style.display = 'none'
        botaoJogar.style.display = 'none'
        jogando=true
        acertos=0
        erros=0
        acertou=false
        maxDicas=10
        document.getElementById("pontos").innerHTML = "ACERTOS: "
        document.querySelector("button#dica").innerHTML = `Dicas [${maxDicas}]`
        document.getElementById("pontos").style.display = 'inline-block'
        document.getElementById("letrasDigitadas").style.display = "inline-block"
        document.getElementById("letrasDigitadas").innerHTML = "Letras Digitadas: "
        document.getElementById("reiniciar").style.display = 'inline-block'
        document.getElementById("dica").style.display = 'inline-block'
        document.getElementById("jogador").style.display = 'inline-block'
        document.getElementById("gameover").style.display = 'none'
        desenho[1].style.display = 'none'
        desenho[2].style.display = 'none'
        desenho[3].style.display = 'none'
        desenho[4].style.display = 'none'
        desenho[5].style.display = 'none'
        desenho[6].style.display = 'none'
        desenho[7].style.display = 'none'
        defineLetras()
    }

    document.body.addEventListener('keyup', (event)=>{
        console.log(event);
        if(jogando){
            if(event.keyCode >= 65 && event.keyCode <= 90){
                jogar(event.key)
            }
        }
    })

        function jogar(e){
            var nExist=0
            var ltPalavra = palavra.toUpperCase().split('')
            var tamanho = ltPalavra.length
            var qtespacos = 0

            for(let i in ltPalavra){
                if(ltPalavra[i]==' '){
                    qtespacos++
                }
            }

            if(cxLetras.indexOf(e)<0){
                cxLetras.push(e)
                for(let i in ltPalavra){
                    if(ltPalavra[i]==e.toUpperCase()){
                        document.getElementById("letra"+i).value = e.toUpperCase()
                        acertos++
                    }
                }
            }

            for(let c in ltPalavra){
                if(ltPalavra[c]!=e.toUpperCase()){
                    nExist++
                }
            }

            if(ltPalavra.length==nExist){
                erros++
                verificaErros(e)
            }

            if(acertos>=(tamanho-qtespacos)){
                novaPalavra()
                pontos++
                qtespacos = 0
            }

        }

        function verificaErros(e){
            if(errosLetras.indexOf(e)<0){
                errosLetras.push(e)
                
                document.getElementById("letrasDigitadas").innerHTML += e.toUpperCase()
                
                for(let i=1;i<=erros;i++){
                    desenho[i].style.display = 'block'
                }

                if(erros==errosMax){
                    jogando=false;
                    document.querySelector("#gameover").style.display = 'flex'
                    acertos=0
                }

            }

        }

        function novaPalavra(){
            document.getElementById("pontos").innerHTML = "ACERTOS: " + pontos
            document.getElementById("letrasDigitadas").innerHTML = "Letras Digitadas: "
            pos = Math.round(Math.random()*qtBiblioteca)
            palavra = biblioteca[pos]
            tam = palavra.length
            defineLetras()
            acertos=0
            errosLetras.length = 0
            cxLetras.length = 0
        }

        function dica(){
            if(maxDicas>0){
                document.querySelector("div#dica").innerHTML = dicas[pos]
                document.querySelector("div#dica").style.display = 'inline-block'
                setTimeout(() => {
                    document.querySelector("div#dica").style.display = 'none'
                }, 500);
                maxDicas--
            }
            document.querySelector("button#dica").innerHTML = `Dicas [${maxDicas}]`
        }