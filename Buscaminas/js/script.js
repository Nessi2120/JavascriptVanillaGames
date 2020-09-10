document.addEventListener('contextmenu', function (ev) {
    alert("click derecho")
    ev.preventDefault();

})

function Squard() {
    this._value = 0
    this._isHidden = true
}

Squard.prototype.Show = function () {
    this._isHidden = false
}

Squard.prototype.isBomb = function () {
    return this._value === -1
}

Squard.prototype.getValue = function () {
    return this._value
}

Squard.prototype.setValue = function (value) {

    this._value = value
}

Squard.prototype.ConvertToBomb = function () {
    this._isBomb = true
    this._value = -1
}

function Desboard(rowsNumber, bombNumber) {

    this._rowsNumber = rowsNumber
    this._bombNumber = bombNumber
    this._desboardGame = []

}

Desboard.prototype.initialize = function () {
    for (var i = 0; i < this._rowsNumber; i++) {
        this._desboardGame.push([])
        for (var j = 0; j < this._rowsNumber; j++) {
            this._desboardGame[i].push(new Squard())
        }
    }

    for (var c = 0; c < this._bombNumber; c++) {
        let x = Math.floor(Math.random() * this._rowsNumber)
        let y = Math.floor(Math.random() * this._rowsNumber)
        this._desboardGame[x][y].ConvertToBomb()
        this._numbers(x, y)
    }
}




Desboard.prototype._numbers = function (x, y) {
    const lowerX = (x - 1) < 0 ? 0 : (x - 1)
    const lowerY = (y - 1) < 0 ? 0 : (y - 1)

    const upperX = (x + 1) >= this._rowsNumber ? (this._rowsNumber - 1) : (x + 1)
    const upperY = (y + 1) >= this._rowsNumber ? (this._rowsNumber - 1) : (y + 1)

    for (var i = lowerX; i <= upperX; i++) {
        for (var j = lowerY; j <= upperY; j++) {
            if (i != x || j != y) {
                if (this._desboardGame[i][j].getValue() != -1 && this._desboardGame[i][j]._isHidden == true) {
                    const newValue = this._desboardGame[i][j].getValue() + 1
                    this._desboardGame[i][j].setValue(newValue)
                }
            }
        }
    }

    this._print()
}


Desboard.prototype.ShowSquard = function (x, y) {

    this._desboardGame[x][y].Show()

    if (this._desboardGame[x][y].isBomb()) {
        console.log("perdiste")
    } else if (this._desboardGame[x][y].getValue() != 0) {
        console.log("numero")
        console.log(`${this._desboardGame[x][y].getValue()}`)
    } else {
        this._desboardGame[x][y].Show()
        const lowerX = (x - 1) < 0 ? 0 : (x - 1)
        const lowerY = (y - 1) < 0 ? 0 : (y - 1)

        const upperX = (x + 1) >= this._rowsNumber ? (this._rowsNumber - 1) : (x + 1)
        const upperY = (y + 1) >= this._rowsNumber ? (this._rowsNumber - 1) : (y + 1)

        for (var i = lowerX; i <= upperX; i++) {
            for (var j = lowerY; j <= upperY; j++) {
                if (i != x || j != y) {
                    if (this._desboardGame[i][j].getValue() != -1) {
                        this.ShowSquard(i, j)
                    }
                }
            }
        }

    }
    this._print()
}

Desboard.prototype._print = function () {
    const matrix = []
    for (var i = 0; i < this._rowsNumber; i++) {
        matrix.push([])
        for (var j = 0; j < this._rowsNumber; j++) {
            const value = this._desboardGame[i][j].getValue()
            const isHidden = this._desboardGame[i][j]._isHidden
            matrix[i].push(`(${value} , ${isHidden})`)
        }
    }
    console.table(matrix)
}

const ModelView = function(Model, View){
    this._model = Model
    this._view = View
}

ModelView.prototype.Draw = function(){
    
}