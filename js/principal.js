var direcaoxJ,direcaoyJ,jogo;
var frame;
var velTiro;
var tamanhoTelaW,tamanhoTelaH;
var jogador,velJogador,PosicaoJogadorx,PosicaoJogadory;

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

function controlarTiros(){
    let tiros = document.getElementsByClassName("tiroJogador");
    let tamanho = tiros.length;
    for(i=0;i<tamanho;i++){
        if(tiros[i]){ //tiro existe aplica a rotina
            let pt = tiros[i].offsetTop;
            pt-=velTiro;
            tiros[i].style.top=pt+"px";
            if(tiros <0){
                tiros[i].remove();
            }
        }
    }
}
function atirar(x,y){
    let t = document.createElement("div");
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    att1.value = "tiroJogador"
    att2.value = "top:"+y+"px;left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t)

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
    }

    frame=requestAnimationFrame(gameLoop)// loop do game
}

function iniciar(){
    jogo = true;

    //iniTela
    tamanhoTelaH = window.innerHeight;
    tamanhoTelaW = window.innerWidth;
    //iniJogador
    direcaoxJ=direcaoyJ=0
    PosicaoJogadorx = tamanhoTelaW/2;
    PosicaoJogadory = tamanhoTelaH/2;
    velJogador=velTiro=5;
    jogador = document.getElementById("naveJog");
    jogador.style.top = PosicaoJogadory + "px";
    jogador.style.left = PosicaoJogadorx + "px";
    gameLoop();
}
window.addEventListener("load",iniciar);
document.addEventListener("keydown",teclaDown);
document.addEventListener("keyup",teclaUp);
