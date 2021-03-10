var direcaoxJ,direcaoyJ,jogo;
var frame;
var velTiro;
var tamanhoTelaW,tamanhoTelaH;
var jogador,velJogador,PosicaoJogadorx,PosicaoJogadory;
var contBombas,painelBombas,bombasTotal,velBomba;
var vidaPlaneta,barraPlaneta,intervaloBombas;
var indiceExplosao,indiceSom;
var telaMsg;

function teclaDown(){
    let tecla = event.keyCode;
    if(tecla == 38){ //para cima
        direcaoyJ=-1
    }else if(tecla == 40){ //para baixo
        direcaoyJ=1;
    }
    if(tecla == 37){ //para a esquerda 
        direcaoxJ=-1;
    }else if(tecla == 39){ // para a direita
        direcaoxJ=1;
    }
    if(tecla == 32){ //tiro
        atirar(PosicaoJogadorx+17,PosicaoJogadory);
    }
}

function teclaUp(){
    let tecla = event.keyCode;
    if((tecla == 38) || (tecla == 40)){
        direcaoyJ=0;
    }
    if((tecla == 37)|| (tecla==39)){
        direcaoxJ=0;
    }
}
function controlarJogador(){
    PosicaoJogadory+= direcaoyJ * velJogador; //sobe -5 pixels
    PosicaoJogadorx+= direcaoxJ * velJogador; //sobe -5 pixels
    jogador.style.top = PosicaoJogadory + "px";
    jogador.style.left = PosicaoJogadorx + "px";
}

function gameLoop(){
    if(jogo){
        //funcoes controles
        controlarJogador();
        controlarTiros();
        controlarBombas();
    }
    gerenciaPlaneta();

    frame=requestAnimationFrame(gameLoop)// loop do game
}

function reiniciar(){
    bombasTotal = document.getElementsByClassName("bomba");
    for(i=0;i<bombasTotal.length;i++){
        if(bombasTotal[i]){
            bombasTotal[i].remove();//remover as bombas
        }
    }
    telaMsg.style.display="none";
    clearInterval(intervaloBombas);
    cancelAnimationFrame(frame);
    vidaPlaneta=300;
    PosicaoJogadorx=tamanhoTelaW/2;
    PosicaoJogadory=tamanhoTelaH/2;
    jogador.style.top=PosicaoJogadory+"px";
    jogador.style.left=PosicaoJogadorx+"px";
    contBombas=10;
    jogo=true;
    intervaloBombas = setInterval(criarBombas,1700);
    gameLoop();  
}

function iniciar(){
    jogo = false;

    //iniTela
    tamanhoTelaH = window.innerHeight;
    tamanhoTelaW = window.innerWidth;
    //iniJogador
    direcaoxJ=direcaoyJ=0
    PosicaoJogadorx = tamanhoTelaW/2;
    PosicaoJogadory = tamanhoTelaH/2;
    velJogador=velTiro=7;
    jogador = document.getElementById("naveJog");
    jogador.style.top = PosicaoJogadory + "px";
    jogador.style.left = PosicaoJogadorx + "px";
    //controle bombas
    contBombas=10;
    velBomba=4;
    //controle planeta
    vidaPlaneta=300;
    barraPlaneta = document.getElementById("barraPlaneta");
    barraPlaneta.style.width = vidaPlaneta +"px";
    //controles explosao
    indiceExplosao=indiceSom=0;
    //telas
    telaMsg=document.getElementById("telaMsg");
    telaMsg.style.backgroundImage= "url(imgs/intro.jpg)";
    telaMsg.style.display="block";
    gameLoop();

    document.getElementById("btnJogar").addEventListener("click",reiniciar);
}
window.addEventListener("load",iniciar);
document.addEventListener("keydown",teclaDown);
document.addEventListener("keyup",teclaUp);
