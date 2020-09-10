function BindStructereToView(sodokuDesboard){
    for(i = 0 ; i < 3 ; i++){
        for(j = 0 ; j < 3 ; j++){
            if(sodokuDesboard[i][j].value !== 0){
                sodokuDesboard[i][j].element.textContent = sodokuDesboard[i][j].value
                if(sodokuDesboard[i][j].disable === true){
                    sodokuDesboard[i][j].element.classList.add("disable")
                }
            }
        }
    }
}

function Add(event, sodokuDesboard){
    
    const x = event.target.getAttribute("data-x")
    const y = event.target.getAttribute("data-y")
    
    if (sodokuDesboard[x][y].disable == false){
        if(sodokuDesboard[x][y].value < 3)
            sodokuDesboard[x][y].value++
        else
            sodokuDesboard[x][y].value = 1
        sodokuDesboard[x][y].element.textContent = sodokuDesboard[x][y].value    
        EndGame(sodokuDesboard)
    }
}

function ShowWinner(){

}

function ShowLoser(){
    const desboard = document.getElementById("desboard")
    desboard.classList.add("red")
}

function EndGame(sodokuDesboard){

    //Hay casillas vacias?
    for(var i = 0 ; i < 3 ; i++){
        for(var j = 0 ; j < 3 ; j++){
            if(sodokuDesboard[i][j].value === 0){
                console.log("casillas vacias")
            }
        }
    }

    //Hay repetidos en las filas?
    for(var i = 0 ; i < 3 ; i++){
        if(sodokuDesboard[i][0].value === sodokuDesboard[i][1].value 
            || sodokuDesboard[i][0].value === sodokuDesboard[i][2].value){
            console.log("Filas")
            ShowLoser()
        }
    }
    
    //Hay repetidos en las columnas?
    for(var j = 0 ; j < 3 ; j++){
        if(sodokuDesboard[0][j].value === sodokuDesboard[1][j].value 
            || sodokuDesboard[0][j].value === sodokuDesboard[2][j].value){
                console.log("columnas")
                ShowLoser()
        }
    }

    BindStructereToView2(true)
}
