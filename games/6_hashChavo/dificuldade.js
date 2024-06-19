    function nivelDois(){

        //JOGADAS DE ATAQUE
        
        //LINHA 1

        if((square.a1=="")&&(square.a2=="kiko")&&(square.a3=="kiko")){
            square.a1="kiko"
        } else if ((square.a1=="kiko")&&(square.a2=="")&&(square.a3=="kiko")){
            square.a2="kiko"
        } else if ((square.a1=="kiko")&&(square.a2=="kiko")&&(square.a3=="")){
            square.a3="kiko"
        } else
        
        //LINHA 2
        
        if((square.b1=="")&&(square.b2=="kiko")&&(square.b3=="kiko")){
            square.b1="kiko"
        } else if ((square.b1=="kiko")&&(square.b2=="")&&(square.b3=="kiko")){
            square.b2="kiko"
        } else if ((square.b1=="kiko")&&(square.b2=="kiko")&&(square.b3=="")){
            square.b3="kiko"
        } else

        //LINHA 3

        if((square.c1=="")&&(square.c2=="kiko")&&(square.c3=="kiko")){
            square.c1="kiko"
        } else if ((square.c1=="kiko")&&(square.c2=="")&&(square.c3=="kiko")){
            square.c2="kiko"
        } else if ((square.c1=="kiko")&&(square.c2=="kiko")&&(square.c3=="")){
            square.c3="kiko"
        } else

        //COLUNA 1

        if((square.a1=="")&&(square.b1=="kiko")&&(square.c1=="kiko")){
            square.a1="kiko"
        } else if ((square.a1=="kiko")&&(square.b1=="")&&(square.c1=="kiko")){
            square.b1="kiko"
        } else if ((square.a1=="kiko")&&(square.b1=="kiko")&&(square.c1=="")){
            square.c1="kiko"
        } else

        //COLUNA 2

        if((square.a2=="")&&(square.b2=="kiko")&&(square.c2=="kiko")){
            square.a2="kiko"
        } else if ((square.a2=="kiko")&&(square.b2=="")&&(square.c2=="kiko")){
            square.b2="kiko"
        } else if ((square.a2=="kiko")&&(square.b2=="kiko")&&(square.c2=="")){
            square.c2="kiko"
        } else

        //COLUNA 3

        if((square.a3=="")&&(square.b3=="kiko")&&(square.c3=="kiko")){
            square.a3="kiko"
        } else if ((square.a3=="kiko")&&(square.b3=="")&&(square.c3=="kiko")){
            square.b3="kiko"
        } else if ((square.a3=="kiko")&&(square.b3=="kiko")&&(square.c3=="")){
            square.c3="kiko"
        } else

        //DIAGONAL 1

        if((square.a1=="")&&(square.b2=="kiko")&&(square.c3=="kiko")){
            square.a1="kiko"
        } else if ((square.a1=="kiko")&&(square.b2=="")&&(square.c3=="kiko")){
            square.b2="kiko"
        } else if ((square.a1=="kiko")&&(square.b2=="kiko")&&(square.c3=="")){
            square.c3="kiko"
        } else 

        //DIAGONAL 2

        if((square.a3=="")&&(square.b2=="kiko")&&(square.c1=="kiko")){
            square.a3="kiko"
        } else if ((square.a3=="kiko")&&(square.b2=="")&&(square.c1=="kiko")){
            square.b2="kiko"
        } else if ((square.a3=="kiko")&&(square.b2=="kiko")&&(square.c1=="")){
            square.c1="kiko"
        }

        else {
            var posCPU = ['a1','a2','a3','b1','b2','b3','c1','c2','c3']
            do{
                var elemento = posCPU[Math.floor(Math.random() * posCPU.length)]
            } while (square[elemento]!="")
            square[elemento] = "kiko"
        }

        player = 'chavo'
        renderSquare()
        renderInfo()

    }

    function nivelTres(){
        
        //JOGADAS DE ATAQUE
        
        //LINHA 1

        if((square.a1=="")&&(square.a2=="kiko")&&(square.a3=="kiko")){
            square.a1="kiko"
        } else if ((square.a1=="kiko")&&(square.a2=="")&&(square.a3=="kiko")){
            square.a2="kiko"
        } else if ((square.a1=="kiko")&&(square.a2=="kiko")&&(square.a3=="")){
            square.a3="kiko"
        } else
        
        //LINHA 2
        
        if((square.b1=="")&&(square.b2=="kiko")&&(square.b3=="kiko")){
            square.b1="kiko"
        } else if ((square.b1=="kiko")&&(square.b2=="")&&(square.b3=="kiko")){
            square.b2="kiko"
        } else if ((square.b1=="kiko")&&(square.b2=="kiko")&&(square.b3=="")){
            square.b3="kiko"
        } else

        //LINHA 3

        if((square.c1=="")&&(square.c2=="kiko")&&(square.c3=="kiko")){
            square.c1="kiko"
        } else if ((square.c1=="kiko")&&(square.c2=="")&&(square.c3=="kiko")){
            square.c2="kiko"
        } else if ((square.c1=="kiko")&&(square.c2=="kiko")&&(square.c3=="")){
            square.c3="kiko"
        } else

        //COLUNA 1

        if((square.a1=="")&&(square.b1=="kiko")&&(square.c1=="kiko")){
            square.a1="kiko"
        } else if ((square.a1=="kiko")&&(square.b1=="")&&(square.c1=="kiko")){
            square.b1="kiko"
        } else if ((square.a1=="kiko")&&(square.b1=="kiko")&&(square.c1=="")){
            square.c1="kiko"
        } else

        //COLUNA 2

        if((square.a2=="")&&(square.b2=="kiko")&&(square.c2=="kiko")){
            square.a2="kiko"
        } else if ((square.a2=="kiko")&&(square.b2=="")&&(square.c2=="kiko")){
            square.b2="kiko"
        } else if ((square.a2=="kiko")&&(square.b2=="kiko")&&(square.c2=="")){
            square.c2="kiko"
        } else

        //COLUNA 3

        if((square.a3=="")&&(square.b3=="kiko")&&(square.c3=="kiko")){
            square.a3="kiko"
        } else if ((square.a3=="kiko")&&(square.b3=="")&&(square.c3=="kiko")){
            square.b3="kiko"
        } else if ((square.a3=="kiko")&&(square.b3=="kiko")&&(square.c3=="")){
            square.c3="kiko"
        } else

        //DIAGONAL 1

        if((square.a1=="")&&(square.b2=="kiko")&&(square.c3=="kiko")){
            square.a1="kiko"
        } else if ((square.a1=="kiko")&&(square.b2=="")&&(square.c3=="kiko")){
            square.b2="kiko"
        } else if ((square.a1=="kiko")&&(square.b2=="kiko")&&(square.c3=="")){
            square.c3="kiko"
        } else 

        //DIAGONAL 2

        if((square.a3=="")&&(square.b2=="kiko")&&(square.c1=="kiko")){
            square.a3="kiko"
        } else if ((square.a3=="kiko")&&(square.b2=="")&&(square.c1=="kiko")){
            square.b2="kiko"
        } else if ((square.a3=="kiko")&&(square.b2=="kiko")&&(square.c1=="")){
            square.c1="kiko"
        } else

        //JOGADAS DE DEFESA
        
        //LINHA 1

        if((square.a1=="")&&(square.a2=="chavo")&&(square.a3=="chavo")){
            square.a1="kiko"
        } else if ((square.a1=="chavo")&&(square.a2=="")&&(square.a3=="chavo")){
            square.a2="kiko"
        } else if ((square.a1=="chavo")&&(square.a2=="chavo")&&(square.a3=="")){
            square.a3="kiko"
        } else
        
        //LINHA 2
        
        if((square.b1=="")&&(square.b2=="chavo")&&(square.b3=="chavo")){
            square.b1="kiko"
        } else if ((square.b1=="chavo")&&(square.b2=="")&&(square.b3=="chavo")){
            square.b2="kiko"
        } else if ((square.b1=="chavo")&&(square.b2=="chavo")&&(square.b3=="")){
            square.b3="kiko"
        } else
        
        //LINHA 3
        
        if((square.c1=="")&&(square.c2=="chavo")&&(square.c3=="chavo")){
            square.c1="kiko"
        } else if ((square.c1=="chavo")&&(square.c2=="")&&(square.c3=="chavo")){
            square.c2="kiko"
        } else if ((square.c1=="chavo")&&(square.c2=="chavo")&&(square.c3=="")){
            square.c3="kiko"
        } else
        
        //COLUNA 1
        
        if((square.a1=="")&&(square.b1=="chavo")&&(square.c1=="chavo")){
            square.a1="kiko"
        } else if ((square.a1=="chavo")&&(square.b1=="")&&(square.c1=="chavo")){
            square.b1="kiko"
        } else if ((square.a1=="chavo")&&(square.b1=="chavo")&&(square.c1=="")){
            square.c1="kiko"
        } else
        
        //COLUNA 2
        
        if((square.a2=="")&&(square.b2=="chavo")&&(square.c2=="chavo")){
            square.a2="kiko"
        } else if ((square.a2=="chavo")&&(square.b2=="")&&(square.c2=="chavo")){
            square.b2="kiko"
        } else if ((square.a2=="chavo")&&(square.b2=="chavo")&&(square.c2=="")){
            square.c2="kiko"
        } else
        
        //COLUNA 3
        
        if((square.a3=="")&&(square.b3=="chavo")&&(square.c3=="chavo")){
            square.a3="kiko"
        } else if ((square.a3=="chavo")&&(square.b3=="")&&(square.c3=="chavo")){
            square.b3="kiko"
        } else if ((square.a3=="chavo")&&(square.b3=="chavo")&&(square.c3=="")){
            square.c3="kiko"
        } else
        
        //DIAGONAL 1
        
        if((square.a1=="")&&(square.b2=="chavo")&&(square.c3=="chavo")){
            square.a1="kiko"
        } else if ((square.a1=="chavo")&&(square.b2=="")&&(square.c3=="chavo")){
            square.b2="kiko"
        } else if ((square.a1=="chavo")&&(square.b2=="chavo")&&(square.c3=="")){
            square.c3="kiko"
        } else 
        
        //DIAGONAL 2
        
        if((square.a3=="")&&(square.b2=="chavo")&&(square.c1=="chavo")){
            square.a3="kiko"
        } else if ((square.a3=="chavo")&&(square.b2=="")&&(square.c1=="chavo")){
            square.b2="kiko"
        } else if ((square.a3=="chavo")&&(square.b2=="chavo")&&(square.c1=="")){
            square.c1="kiko"
        }

        else {
            var posCPU = ['a1','a2','a3','b1','b2','b3','c1','c2','c3']
            do{
                var elemento = posCPU[Math.floor(Math.random() * posCPU.length)]
            } while (square[elemento]!="")
            square[elemento] = "kiko"
        }

        player = 'chavo'
        renderSquare()
        renderInfo()
    }