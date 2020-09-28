function StartGame(elementList){
    const sodokuDesboard = [[],[],[]]
    let index = 0
    
    for(var i = 0 ; i < 3 ; i++){
        for(var j = 0 ; j < 3 ; j++){
            sodokuDesboard[i][j] =  { value : 0, element : elementList[index], disable : false}
            index++
        }
    }

    let c = 0
    while(c < 3){
        const value = Math.floor(Math.random() * 3)
        const x = Math.floor(Math.random() * 3)
        const y = Math.floor(Math.random() * 3)

        sodokuDesboard[x][y].value = value
        console.log("antes")
        print(sodokuDesboard)

        if (RepeatedValuesInRows(sodokuDesboard) && RepeatedValuesInColumns(sodokuDesboard) && value != 0) {
            c++
            sodokuDesboard[x][y].disable = true
            console.log("ESTA OKEY")
        }else{
            console.log("no esta okey")
            sodokuDesboard[x][y].value = 0
            sodokuDesboard[x][y].disable = false
        }
        console.log("desoues")
        print(sodokuDesboard)

        
    }

    BindStructureToView(sodokuDesboard)

    BindViewToStructure(sodokuDesboard)
}

function BindStructureToView(sodokuDesboard) {
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (sodokuDesboard[i][j].value !== 0) {
                sodokuDesboard[i][j].element.textContent = sodokuDesboard[i][j].value
                if (sodokuDesboard[i][j].disable === true) {
                    sodokuDesboard[i][j].element.classList.add("disable")
                }
            }
        }
    }
}

function print(sodokuDesboard){
    const table = [[],[],[]]
    for(var i = 0 ; i < 3 ; i++){
        for(var j = 0 ; j < 3 ; j++){
            table[i][j] = `${sodokuDesboard[i][j].value} - ${sodokuDesboard[i][j].disable}`
        }
    }
    console.table(table)
}

function BindViewToStructure(sodokuDesboard){
    document.getElementById("desboard").addEventListener("click", function(event){
        const x = event.target.getAttribute("data-x")
        const y = event.target.getAttribute("data-y")
        IncrementeValueInBox(x, y, sodokuDesboard)
    })
}

function IncrementeValueInBox(x, y, sodokuDesboard) {
    if (sodokuDesboard[x][y].disable == false) {
        if (sodokuDesboard[x][y].value < 3) {
            sodokuDesboard[x][y].value++
        } else {
            sodokuDesboard[x][y].value = 1
        }
        sodokuDesboard[x][y].element.textContent = sodokuDesboard[x][y].value
        EndGame(sodokuDesboard)
    }
}

function ShowWinner() {
    const desboard = document.getElementById("desboard")
    desboard.classList.add("green")
}

function ShowLoser() {
    const desboard = document.getElementById("desboard")
    desboard.classList.add("red")
}

function EmptyBox(sodokuDesboard) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (sodokuDesboard[i][j].value === 0) {
                return true
            }
        }
    }
    return false
}

function ThereAreDifferentAndNotNull(firstValue, secondValue){
    return (firstValue === secondValue && firstValue != 0 && secondValue != 0)
}

function RepeatedValuesInRows(sodokuDesboard) {

    for (var i = 0; i < 3; i++) {

        const fisrtBoxValue = sodokuDesboard[i][0].value
        const secondBoxValue = sodokuDesboard[i][1].value
        const thirdBoxValue = sodokuDesboard[i][2].value

        if(ThereAreDifferentAndNotNull(fisrtBoxValue, secondBoxValue) || 
            ThereAreDifferentAndNotNull(fisrtBoxValue, thirdBoxValue) || 
            ThereAreDifferentAndNotNull(secondBoxValue, thirdBoxValue)){
        return false
        }
    }
    return true
}

function RepeatedValuesInColumns(sodokuDesboard) {
    for (var j = 0; j < 3; j++) {

        const fisrtBoxValue = sodokuDesboard[0][j].value
        const secondBoxValue = sodokuDesboard[1][j].value
        const thirdBoxValue = sodokuDesboard[2][j].value

        if(ThereAreDifferentAndNotNull(fisrtBoxValue, secondBoxValue) || 
        ThereAreDifferentAndNotNull(fisrtBoxValue, thirdBoxValue) || 
        ThereAreDifferentAndNotNull(secondBoxValue, thirdBoxValue)){
            return false
        }
    }
    return true
}

function EndGame(sodokuDesboard) {
    if (!EmptyBox(sodokuDesboard)) {
        if (RepeatedValuesInRows(sodokuDesboard) && RepeatedValuesInColumns(sodokuDesboard)) {
            ShowWinner()
        } else {
            ShowLoser()
        }
    }
}
