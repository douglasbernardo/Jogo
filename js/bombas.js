
function colisaoTiroBomba(tiro){
    let tam = bombasTotal.length;
    for(i=0;i<tam;i++){
        if(bombasTotal[i]){
            if(
                (
                    (tiro.offsetTop<=(bombasTotal[i].offsetTop+40))&& //parte cima do tiro
                    ((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop)) //parte de baixo do tiro
                )
                &&
                (
                    (tiro.offsetLeft<=(bombasTotal[i].offsetLeft+24))&&//esquerda tiro com a parte direita da bomba
                    ((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft)) //direita tiro com a parte esquerda da bomba
                )

            ){
                criarExplosao(1,bombasTotal[i].offsetLeft-25,bombasTotal[i].offsetTop)
                bombasTotal[i].remove();
                tiro.remove();
            }
        }
    }
}
function criarBombas(){
    if(jogo){
        let y = 0;
        let x = Math.random() * tamanhoTelaW;
        let bomba = document.createElement("div");
        let att1 = document.createAttribute("class");
        let att2 = document.createAttribute("style");
        att1.value = "bomba";
        att2.value = "top:"+y+"px;left:"+x+"px;";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.body.appendChild(bomba);
        contBombas--;
    }
}

function controlarBombas(){
    bombasTotal = document.getElementsByClassName("bomba");
    let tamanho = bombasTotal.length; //retorna o valor de bombas definidas
    for(i=0;i<tamanho;i++){
        if(bombasTotal[i]){
            let pi = bombasTotal[i].offsetTop;
            pi+=velBomba;
            bombasTotal[i].style.top=pi+"px";
            if(pi>tamanhoTelaH){
                vidaPlaneta-=10;
                criarExplosao(2,bombasTotal[i].offsetLeft,null)
                bombasTotal[i].remove();
            }
        }
    }
}