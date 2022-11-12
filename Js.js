// objects
let t = 800
let score = 0
let adder = 100
let lines = 0
let level = 0
let field = []
let block = []
let main = document.querySelector("#main")
let scoreH = document.querySelector("#score")
let linesH = document.querySelector("#lines")
const blocksList = {
    line: {
        yx: [[4, 3], [4, 4], [4, 5], [4, 6]],
        rotate: function () {
            if (this.yx[0][0] == this.yx[1][0]) {
                this.yx[0][0] -= 3
                this.yx[0][1] += 3
                this.yx[1][0] -= 2
                this.yx[1][1] += 2
                this.yx[2][0] -= 1
                this.yx[2][1] += 1
            } else {
                this.yx[0][0] += 3
                this.yx[0][1] -= 3
                this.yx[1][0] += 2
                this.yx[1][1] -= 2
                this.yx[2][0] += 1
                this.yx[2][1] -= 1
            }
        },
        resetyx: function () {
            this.yx = [[4, 3], [4, 4], [4, 5], [4, 6]]
        }
    },
    square: {
        yx: [[3, 4], [3, 5], [4, 4], [4, 5]],
        resetyx: function () {
            this.yx = [[3, 4], [3, 5], [4, 4], [4, 5]]
        }
    },
    triple: {
        yx: [[4, 3], [3, 4], [4, 4], [4, 5]],
        rotate: function () {
            if (this.yx[2][0] == this.yx[3][0]) {
                if (this.yx[2][1] < this.yx[3][1]) {
                    this.yx[3] = [...this.yx[2]]
                    this.yx[2] = [...this.yx[1]]
                    this.yx[0][0] -= 2; this.yx[0][1] += 1
                    this.yx[1][1] += 1
                } else {
                    this.yx[0] = [...this.yx[1]]
                    this.yx[1] = [...this.yx[3]]
                    this.yx[3][0]--; this.yx[3][1]++;
                }
            } else {
                if (this.yx[2][0] < this.yx[3][0]) {
                    this.yx[0] = [...this.yx[1]]
                    this.yx[1] = [...this.yx[3]]
                    this.yx[3][0] -= 1; this.yx[3][1] -= 1;
                } else {
                    this.yx[1] = [...this.yx[2]]
                    this.yx[2] = [...this.yx[0]]
                    this.yx[0][1] -= 1
                    this.yx[3][0] += 2; this.yx[3][1] += 1;
                }
            }
        },
        resetyx: function () {
            this.yx = [[4, 3], [3, 4], [4, 4], [4, 5]]
        }
    },
    z: {
        yx: [[3, 4], [3, 5], [4, 5], [4, 6]],
        rotate: function () {
            tozero()
            if (this.yx[2][0] == this.yx[3][0]) {
                this.yx[2][0] -= 2
                this.yx[3][1] -= 2
            } else {
                this.yx[2][0] += 2
                this.yx[3][1] += 2
            }
        },
        resetyx: function () {
            this.yx = [[3, 4], [3, 5], [4, 4], [4, 5]]
        }
    },
    backz: {
        yx: [[4, 4], [4, 5], [3, 5], [3, 6]],
        rotate: function () {
            if (this.yx[1][0] == this.yx[0][0]) {
                this.yx[1][0] -= 2
                this.yx[0][1] += 2
            } else {
                this.yx[1][0] += 2
                this.yx[0][1] -= 2
            }
        },
        resetyx: function () {
            this.yx = [[4, 4], [4, 5], [3, 5], [3, 6]]
        }
    },
    l: {
        yx: [[3, 3], [4, 3], [4, 4], [4, 5]],
        rotate: function () {
            if (this.yx[0][0] != this.yx[1][0]) {
                if (this.yx[0][0] < this.yx[1][0]) {
                    this.yx[0][0]--; this.yx[0][1] += 2
                    this.yx[1][0] -= 2; this.yx[1][1]++
                    this.yx[2][0]--
                    this.yx[3][1]--
                } else {
                    this.yx[0][1] -=2
                    this.yx[1][0]++; this.yx[1][1]--
                    this.yx[3][0]--; this.yx[3][1]++
                }
            } else {
                if (this.yx[0][1] > this.yx[1][1]) {
                    this.yx[0][0] += 2
                    this.yx[1][0]++; this.yx[1][1]++
                    this.yx[3][0]--; this.yx[3][1]--
                } else {
                    this.yx[0][0]--
                    this.yx[1][1]--
                    this.yx[2][0]++
                    this.yx[3][0] += 2; this.yx[3][1]++
                }
            }
        },
        resetyx: function () {
            this.yx = [[3, 3], [4, 3], [4, 4], [4, 5]]
        }
    },
    backl: {
        yx: [[4, 3], [4, 4], [4, 5], [3, 5]],
        rotate: function () {
            if (this.yx[0][0] == this.yx[1][0]) {
                if (this.yx[0][1] < this.yx[1][1]) {
                    this.yx[0][0] -= 2; this.yx[0][1]++
                    this.yx[1][0]--
                    this.yx[2][1]--
                    this.yx[3][0]++
                } else {
                    this.yx[0][0]++; this.yx[0][1]--
                    this.yx[2][0]--; this.yx[2][1]++
                    this.yx[3][0] -= 2
                }
            } else {
                if (this.yx[0][0] < this.yx[1][0]) {
                    this.yx[0][0]++; this.yx[0][1]++
                    this.yx[2][0]--; this.yx[2][1]--
                    this.yx[3][1] -= 2
                } else {
                    this.yx[0][1]--
                    this.yx[1][0]++
                    this.yx[2][0] += 2; this.yx[2][1]++
                    this.yx[3][0]++; this.yx[3][1] += 2
                }
            }
        },
        resetyx: function () {
            this.yx = [[4, 3], [4, 4], [4, 5], [3, 5]]
        }
    }
}

function display() {
    let disp = []
    for (let i = 5; i < 25; i++) {
        disp[i-5] = field[i].join("-")
    }
    disp = disp.join("<br>")
    
    main.innerHTML = disp

    scoreH.textContent = score
    linesH.textContent = lines
}

function newblock() {
    switch (Math.floor(Math.random() * 7)) {
        case 0:
            block = blocksList.line
            break
        case 1:
            block = blocksList.square
            break
        case 2:
            block = blocksList.triple
            break
        case 3:
            block = blocksList.z
            break
        case 4:
            block = blocksList.backz
            break
        case 5:
            block = blocksList.l
            break
        case 6:
            block = blocksList.backl
            break
    }
}

function tozero() {
    field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] = field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 0
}

function toone() {
    field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] = field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 1
}

function totwo() {
    field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] = field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 2
}

function down() {
    if (block.yx.every(x => x[0] < 24) && block.yx.every(x => field[x[0] + 1][x[1]] != 2)) {
        tozero()
        block.yx.forEach(x => x[0]++)
        toone()
        
    } else if (block.yx.some(x => x[0] == 24) || block.yx.some(x => field[x[0] + 1][x[1]] == 2)) {
        totwo()
        block.yx.forEach(x => {
            if (field[x[0]].every(y => y == 2)) {
                for (let j = x[0]; j > 0; j--) {
                    field[j] = field[j - 1]
                }
                score += adder
                lines++
                level = Math.floor(lines / 10)
                t = 800 - (Math.floor(lines / 10) * 50)
                clearInterval(iterator)
                iterator = setInterval(tick, t)
                console.log(t)
            }
        })
        // for (let i = 0; i < field.length; i++) {
        //     if (field[i].every(x => x == 2)) {
        //         for (let j = i; j > 0; j--) {
        //             field[j] = field[j - 1]
        //         }
        //         score += adder
        //         lines++
        //         level = floor(lines / 10)
        //         t = 800 - (Math.floor(lines / 10) * 2)
        //         iterator = setInterval(tick, t)
        //         console.log(t)
        //     }
        // }
        block.resetyx()
        newblock()
    }
    display()
    if (field[5].some(x => x == 2)) {
        main.innerHTML = "Game Over"
        clearInterval(iterator)
    }
}

for (let i = 0; i < 25; i++) {
    field.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
}

newblock()
display()

document.addEventListener("keydown", function() {
    switch (event.key) {
        case "ArrowLeft":
            if (block.yx.every(x => field[x[0]][x[1] - 1] != 2 && x[1] > 0)) {
                tozero()
                block.yx = block.yx.map(x => [x[0], x[1] - 1])
                toone()
                display()
            }
            break
        case "ArrowRight":
            if (block.yx.every(x => field[x[0]][x[1] + 1] != 2 && x[1] < 9)) {
                tozero()
                block.yx = block.yx.map(x => [x[0], x[1] + 1])
                toone()
                display()
            }
            break
        case "ArrowUp":
            tozero()
            block.rotate()
            if (!block.yx.every(x => field[x[0]][x[1]] != 2)) {
                block.rotate(); block.rotate(); block.rotate()
            }
            toone()
            display()
            break
        case "ArrowDown":
            down()
            break
    }
})

let iterator = setInterval(tick, t)

function tick() {
    down()
}