// objects
let t = 1000
let key = 0
let field = []
let i = 1
let j = 0
let block = []
let main = document.querySelector("#main")
const blocksList = {
    line: {
        yx: [[3, 3], [3, 4], [3, 5], [3, 6]],
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
            main.innerHTML = field.map(x => x.join("-")).join("<br>")
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

for (let i = 0; i <= 24; i++) {
    field.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
}

main.innerHTML = field.map(x => x.join("-")).join("<br>")

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
                
                main.innerHTML = field.map(x => x.join("-")).join("<br>")
            }
            break
        case "ArrowRight":
            if (block.yx[0][1] < 9 && block.yx[1][1] < 9 && block.yx[2][1] < 9 && block.yx[3][1] < 9) {
                field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
                field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 0

                block.yx[0][1] += 1; block.yx[1][1] += 1; block.yx[2][1] += 1; block.yx[3][1] += 1

                field[block.yx[0][0]][block.yx[0][1]] = field[block.yx[1][0]][block.yx[1][1]] =
                field[block.yx[2][0]][block.yx[2][1]] = field[block.yx[3][0]][block.yx[3][1]] = 1
                
                main.innerHTML = field.map(x => x.join("-")).join("<br>")
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
    
    
                main.innerHTML = field.map(x => x.join("-")).join("<br>")
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

    main.innerHTML = field.map(x => x.join("-")).join("<br>")

    if (block.yx.some(x => x[0] >= 24)) clearInterval(iterator)
}