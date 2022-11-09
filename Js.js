// objects
let t = 1000
let field = []
let block = []
let main = document.querySelector("#main")
const blocksList = {
    line: {
        yx: [[4, 3], [4, 4], [4, 5], [4, 6]],
        rotate: function () {
            field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] = field[block.yx[2][0]][block.yx[2][1]] = 0
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
            field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] = field[block.yx[2][0]][block.yx[2][1]] = 1
            display()
        },
        resetyx: function () {
            this.yx = [[4, 3], [4, 4], [4, 5], [4, 6]]
        }
    }
}
// line: [[0, 3], [0, 4], [0, 5], [0, 6]],
// square: [[0, 4], [0, 5], [1, 4], [1, 5]],
// z: [[0, 4], [0, 5], [1, 5], [1, 6]],
// backZ: [[1, 4], [1, 5], [0, 5], [0, 6]],
// triple: [[1, 3], [0, 4], [1, 4], [1, 5]],
// l: [[0, 3], [1, 3], [1, 4], [1, 5]],
// backL: [[1, 3], [1, 4], [1, 5], [0, 5]]

function display() {
    let disp = []
    for (let i = 5; i < 25; i++) {
        disp[i-5] = field[i].join("-")
    }
    disp = disp.join("<br>")
    
    main.innerHTML = disp
}

for (let i = 0; i < 25; i++) {
    field.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
}

display()

block = blocksList.line

//let iterator = setInterval(tick, t)

document.addEventListener("keydown", function() {
    switch (event.key) {
        case "ArrowLeft":
            if (block.yx[0][1] && block.yx[1][1] && block.yx[2][1] && block.yx[3][1] > 0) {
                field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
                field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 0

                block.yx[0][1] -= 1; block.yx[1][1] -= 1; block.yx[2][1] -= 1; block.yx[3][1] -= 1

                field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
                field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 1
                
                display()
            }
            break
        case "ArrowRight":
            if (block.yx[0][1] < 9 && block.yx[1][1] < 9 && block.yx[2][1] < 9 && block.yx[3][1] < 9) {
                field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
                field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 0

                block.yx[0][1] += 1; block.yx[1][1] += 1; block.yx[2][1] += 1; block.yx[3][1] += 1

                field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
                field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 1
                
                display()
            }
            break
        case "ArrowUp":
            if (1 == 1) {
                block.rotate()
            }
            break
        case "ArrowDown":
            if (block.yx.every(x => x[0] < 24)) {
                field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
                field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 0
    
                block.yx.forEach(x => x[0]++)
    
                field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
                field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 1
    
    
                
                if (block.yx.some(x => x[0] >= 24) || block.yx.some(x => field[x[0] + 1][x[1]] == 2)) {
                    field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
                    field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 2
                    
                    block.resetyx()
                    block = blocksList.line

                    for (let i = 0; i < field.length; i++) {
                        if (field[i].every(x => x == 2)) {
                            console.log("awe")
                            for (let j = i; j > 0; j--) {
                                field[j] = field[j - 1]
                            }
                        }
                    }
                }
                
                display()
            }
            break
    }
})

function tick() {
    field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
    field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 0

    block.yx.forEach(x => x[0]++)

    field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
    field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 1

    display()

    if (block.yx.some(x => x[0] >= 24) || block.yx.some(x => field[x[0] + 1][x[1]] != 0)) block = JSON.parse(JSON.stringify(blocksList.line))
}