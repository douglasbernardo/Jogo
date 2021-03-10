
function gerenciaPlaneta(){
    barraPlaneta.style.width=vidaPlaneta+"px";
    let bombas = document.getElementsByClassName("bomba").length;
    if(contBombas<=0){
        jogo = false;
        clearInterval(intervaloBombas);
        telaMsg.style.backgroundImage = "url(imgs/vitoria.jpg)";
        telaMsg.style.display = "block";
        for(i=0;i<bombas;i++){
            bombasTotal[i].style.display="none";
        }
        jogador.style.display="none";
    }
    if(vidaPlaneta<=0){
        jogo = false;
        clearInterval(intervaloBombas);
        telaMsg.style.backgroundImage = "url(imgs/derrota.jpg)";
        telaMsg.style.display = "block";
        for(i=0;i<bombas;i++){
            bombasTotal[i].style.display="none";
        }
        jogador.style.display="none";
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