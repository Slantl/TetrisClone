let t = 1500
let key = 0
let field = []
let i = 1
let j = 0
let block = []
let main = document.querySelector("#main")
const blockList = {
    line: [[0, 3], [0, 4], [0, 5], [0, 6]],
    square: [[0, 4], [0, 5], [1, 4], [1, 5]],
    z: [[0, 4], [0, 5], [1, 5], [1, 6]],
    backZ: [[1, 4], [1, 5], [0, 5], [0, 6]],
    triple: [[1, 3], [0, 4], [1, 4], [1, 5]],
    l: [[0, 3], [1, 3], [1, 4], [1, 5]],
    backL: [[1, 3], [1, 4], [1, 5], [0, 5]]
}

for (let i = 0; i <= 19; i++) {
    field.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
}

main.innerHTML = field.map(x => x.join("-")).join("<br>")

block = blockList.backL

//let iterator = setInterval(tick, t)

document.addEventListener("keydown", function() {
    switch (event.key) {
        case "ArrowLeft":
            if (block[0][1] && block[1][1] && block[2][1] && block[3][1] > 0) {
                field[block[0][0]][block[0][1]] = field[block[1][0]][block[1][1]] =
                field[block[2][0]][block[2][1]] = field[block[3][0]][block[3][1]] = 0

                block[0][1] -= 1; block[1][1] -= 1; block[2][1] -= 1; block[3][1] -= 1

                field[block[0][0]][block[0][1]] = field[block[1][0]][block[1][1]] =
                field[block[2][0]][block[2][1]] = field[block[3][0]][block[3][1]] = 1
                
                main.innerHTML = field.map(x => x.join("-")).join("<br>")
            }
            break
        case "ArrowRight":
            if (block[0][1] < 9 && block[1][1] < 9 && block[2][1] < 9 && block[3][1] < 9) {
                field[block[0][0]][block[0][1]] = field[block[1][0]][block[1][1]] =
                field[block[2][0]][block[2][1]] = field[block[3][0]][block[3][1]] = 0

                block[0][1] += 1; block[1][1] += 1; block[2][1] += 1; block[3][1] += 1

                field[block[0][0]][block[0][1]] = field[block[1][0]][block[1][1]] =
                field[block[2][0]][block[2][1]] = field[block[3][0]][block[3][1]] = 1
                
                main.innerHTML = field.map(x => x.join("-")).join("<br>")
            }
            break
        case "ArrowUp":
            break
        case "ArrowDown":
            field[block[0][0]][block[0][1]] = field[block[1][0]][block[1][1]] =
            field[block[2][0]][block[2][1]] = field[block[3][0]][block[3][1]] = 0

            block.forEach(x => x[0]++)

            field[block[0][0]][block[0][1]] = field[block[1][0]][block[1][1]] =
            field[block[2][0]][block[2][1]] = field[block[3][0]][block[3][1]] = 1


            main.innerHTML = field.map(x => x.join("-")).join("<br>")
            break
    }
})

// function tick() {
//     field[block[0][0]][block[0][1]] = field[block[1][0]][block[1][1]] =
//     field[block[2][0]][block[2][1]] = field[block[3][0]][block[3][1]] = 1

//     field[block[0][0] - 1][block[0][1]] = field[block[1][0] - 1][block[1][1]] =
//     field[block[2][0] - 1][block[2][1]] = field[block[3][0] - 1][block[3][1]] = 0

//     block.forEach(x => x[0]++)

//     main.innerHTML = field.map(x => x.join("-")).join("<br>")

//     if (i >= 20) {
//         clearInterval(iterator)
//     }
// }