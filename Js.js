// objects
let t = 1000
let key = 0
let field = []
let i = 1
let j = 0
let block = []
let main = document.querySelector("#main")
const blockList = {
    line: {
        points: [[0, 3], [0, 4], [0, 5], [0, 6]],
        rotate: function () {
            field[block.points[0][0]][block.points[0][1]] = field[block.points[1][0]][block.points[1][1]] = field[block.points[3][0]][block.points[3][1]] = 0
            this.points[0][0] -= 2
            this.points[0][1] += 2
            this.points[1][0] -= 1
            this.points[1][1] += 1
            this.points[3][0] += 1
            this.points[3][1] -= 1
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

for (let i = 0; i <= 19; i++) {
    field.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
}

main.innerHTML = field.map(x => x.join("-")).join("<br>")

block = blockList.line

let iterator = setInterval(tick, t)

document.addEventListener("keydown", function() {
    switch (event.key) {
        case "ArrowLeft":
            if (block.points[0][1] && block.points[1][1] && block.points[2][1] && block.points[3][1] > 0) {
                field[block.points[0][0]][block.points[0][1]] = field[block.points[1][0]][block.points[1][1]] =
                field[block.points[2][0]][block.points[2][1]] = field[block.points[3][0]][block.points[3][1]] = 0

                block.points[0][1] -= 1; block.points[1][1] -= 1; block.points[2][1] -= 1; block.points[3][1] -= 1

                field[block.points[0][0]][block.points[0][1]] = field[block.points[1][0]][block.points[1][1]] =
                field[block.points[2][0]][block.points[2][1]] = field[block.points[3][0]][block.points[3][1]] = 1
                
                main.innerHTML = field.map(x => x.join("-")).join("<br>")
            }
            break
        case "ArrowRight":
            if (block.points[0][1] < 9 && block.points[1][1] < 9 && block.points[2][1] < 9 && block.points[3][1] < 9) {
                field[block.points[0][0]][block.points[0][1]] = field[block.points[1][0]][block.points[1][1]] =
                field[block.points[2][0]][block.points[2][1]] = field[block.points[3][0]][block.points[3][1]] = 0

                block.points[0][1] += 1; block.points[1][1] += 1; block.points[2][1] += 1; block.points[3][1] += 1

                field[block.points[0][0]][block.points[0][1]] = field[block.points[1][0]][block.points[1][1]] =
                field[block.points[2][0]][block.points[2][1]] = field[block.points[3][0]][block.points[3][1]] = 1
                
                main.innerHTML = field.map(x => x.join("-")).join("<br>")
            }
            break
        case "ArrowUp":
            if (1 == 1) {
                block.rotate()
            }
            break
        case "ArrowDown":
            if (block.points.every(x => x[0] < 19)) {
                field[block.points[0][0]][block.points[0][1]] = field[block.points[1][0]][block.points[1][1]] =
                field[block.points[2][0]][block.points[2][1]] = field[block.points[3][0]][block.points[3][1]] = 0
    
                block.points.forEach(x => x[0]++)
    
                field[block.points[0][0]][block.points[0][1]] = field[block.points[1][0]][block.points[1][1]] =
                field[block.points[2][0]][block.points[2][1]] = field[block.points[3][0]][block.points[3][1]] = 1
    
    
                main.innerHTML = field.map(x => x.join("-")).join("<br>")
            }
            break
    }
})

function tick() {
    field[block.points[0][0]][block.points[0][1]] = field[block.points[1][0]][block.points[1][1]] =
    field[block.points[2][0]][block.points[2][1]] = field[block.points[3][0]][block.points[3][1]] = 0

    block.points.forEach(x => x[0]++)

    field[block.points[0][0]][block.points[0][1]] = field[block.points[1][0]][block.points[1][1]] =
    field[block.points[2][0]][block.points[2][1]] = field[block.points[3][0]][block.points[3][1]] = 1

    main.innerHTML = field.map(x => x.join("-")).join("<br>")

    if (block.points.some(x => x[0] >= 19)) clearInterval(iterator)
}