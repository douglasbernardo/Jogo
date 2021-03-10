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

function gerenciaPlaneta(){
    barraPlaneta.style.width=vidaPlaneta+"px";
    if(contBombas<=0){
        jogo = false;
        clearInterval(intervaloBombas);
        telaMsg.style.backgroundImage = "url(imgs/vitoria.jpg)";
    }
    if(vidaPlaneta<=0){
        jogo = false;
        bombasTotal = document.getElementsByClassName("bomba");
        for(i=0;i<bombasTotal.length;i++){
            if(bombasTotal[i]){
                bombasTotal[i].remove();//remover as bombas
            }
        }
        jogador.style.display="none";
        clearInterval(intervaloBombas);
        telaMsg.style.backgroundImage = "url(imgs/derrota.jpg)";
        telaMsg.style.display = "block";
    }
}

function criarExplosao(tipo,x,y){

    if(document.getElementById("explosao"+(indiceExplosao-4))){
        document.getElementById("explosao"+(indiceExplosao-4)).remove();
    }
    var explosao=document.createElement("div");
	var img=document.createElement("img");
	var som=document.createElement("audio");
	//Atributos para div
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	var att3=document.createAttribute("id");
	//Atributo para imagem
	var att4=document.createAttribute("src");
	//Atributos para audio
	var att5=document.createAttribute("src");
	var att6=document.createAttribute("id");

	att3.value="explosao"+indiceExplosao;
	if(tipo==1){
		att1.value="explosaoAr";
		att2.value="top:"+y+"px;left:"+x+"px;";
		att4.value="gifs/explosao_ar.gif?"+new Date();
	}else{
		att1.value="explosaoChao";
		att2.value="top:"+(tamanhoTelaH-57)+"px;left:"+(x-17)+"px;";
		att4.value="gifs/explosao_chao.gif?"+new Date();
	}
	att5.value="sons/exp1.mp3?"+new Date();
	att6.value="som"+indiceSom;
	explosao.setAttributeNode(att1);
	explosao.setAttributeNode(att2);
	explosao.setAttributeNode(att3);
	img.setAttributeNode(att4);
	som.setAttributeNode(att5);
	som.setAttributeNode(att6);
	explosao.appendChild(img);
	explosao.appendChild(som);
	document.body.appendChild(explosao);
	document.getElementById("som"+indiceSom).play();
	indiceExplosao++;
	indiceSom++;
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
    vidaPlaneta=100;
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
    vidaPlaneta=100;
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
