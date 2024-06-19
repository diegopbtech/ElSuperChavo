class Player {
    constructor(stick) {
      this.winning = 0 // NÚMERO DE VITÓRIA
      this.stick = stick; // TACO SELECIONADO
      this.point = 0; // NÚMERO DE BOLAS DERRUBADAS
      this.playTurn = 0; // QUAL BOLAS ELE DEVE MATAR (PAR ou IMPAR) // 0 - PAR | 1 - IMPAR
      this.collide = 0; // NÚMERO DE VEZ QUE A BOLA COLIDIU
      this.adversary = 0; // NOTIFICA QUE O JOGADOR BATEU EM UMA BOLA DO ADVERSÁRIO PRIMEIRO
      this.kill = 0; // NÚMERO DE BOLAS DERRUBADAS NO MOMENTO DA TACADA
    }
}

//CAMINHO DO JOGADOR
let chaves = "img/chavo.png"
let kiko = "img/kiko.png"
let ch, ki;