const _ = require('lodash')
const fs = require('fs')
const Queue = require('queue-fifo')
const MAX_BRIGHTNESS = 10
const playGame = (input, numberOfSteps) => {
    let step = 0
    let total = 0
    
    while(step++ < numberOfSteps){
        input = input.map((row) => {
            //console.log(row)
            return row.map(addOne)
        })
        let [stepSum, isSync] = turnTheLight(input, input.length, input[0].length)
        //console.log('turnTheLight output', {step,stepSum, input})
        total += stepSum
        if(isSync) {
            return step
        }
    }

    return total
    
    
}
const isShineBright = (value) => {
    return value === MAX_BRIGHTNESS
}
const turnTheLight = (input, rows, cols)=> {
    let queue = new Queue()
    let stepSum = 0
    for(let row = 0; row < rows; ++row) {
        for(let col =0; col < cols; ++col) {
            if(isShineBright(input[row][col])) {
                queue.enqueue({row, col})
            }
        }
    }
    while(!queue.isEmpty())
    {
        let {row, col} = queue.dequeue()
        stepSum++
        input[row][col] = -20 // Number.MIN_SAFE_INTEGER
        switch(true) {
            case (col === 0 && row === 0): //top left corner
                    if(isShineBright(++input[row][col+1])){
                        queue.enqueue({row,col: col+1})
                    }
                    if(isShineBright(++input[row+1][col+1])) {
                        queue.enqueue({row:row+1, col:col+1})
                    }
                    if(isShineBright(++input[row+1][col])) {
                        queue.enqueue({row: row+1, col})
                    }
                    break
                case (col === 0 && (row+1) === rows): // bottom left corner
                    if(isShineBright(++input[row-1][col])) {
                        queue.enqueue({row: row-1, col})
                    }
                    if(isShineBright(++input[row][col+1])) {
                        queue.enqueue({row, col: col+1})
                    }
                    if(isShineBright(++input[row-1][col+1])) {
                        queue.enqueue({row: row-1, col: col+1})
                    }
                    break
                case ((col+1) === cols && row === 0): // top right corner
                    if(isShineBright(++input[row][col-1])) {
                        queue.enqueue({row, col: col-1})
                    }
                    if(isShineBright(++input[row+1][col])) {
                        queue.enqueue({row: row+1, col})
                    }
                    if(isShineBright(++input[row+1][col-1])) {
                        queue.enqueue({row: row+1, col: col-1})
                    }
                    break
                case ((col+1) === cols && (row+1) === rows): // bottom right corner
                    if(isShineBright(++input[row][col-1])) {
                        queue.enqueue({row, col: col-1})
                    }
                    if(isShineBright(++input[row-1][col-1])) {
                        queue.enqueue({row:row-1, col: col-1})
                    }
                    if(isShineBright(++input[row-1][col-1])) {
                        queue.enqueue({row: row-1, col: col-1})
                    }
                    break
                case (row === 0 && col > 0 && col < cols): // top edge not corner
                    if(isShineBright(++input[row][col-1])) {
                        queue.enqueue({row, col: col-1})
                    }
                    if(isShineBright(++input[row][col+1])) {
                        queue.enqueue({row, col: col+1})
                    }
                    if(isShineBright(++input[row+1][col])) {
                        queue.enqueue({row: row+1, col})
                    }
                    if(isShineBright(++input[row+1][col-1])) {
                        queue.enqueue({row: row+1, col: col-1})
                    }
                    if(isShineBright(++input[row+1][col+1])) {
                        queue.enqueue({row: row+1, col: col+1})
                    }
                    break
                case (row >0 && row < rows && col === 0): // left edge not corner
                    if(isShineBright(++input[row-1][col])) {
                        queue.enqueue({row: row-1, col})
                    }
                    if(isShineBright(++input[row+1][col])) {
                        queue.enqueue({row: row+1, col})
                    }
                    if(isShineBright(++input[row][col+1])) {
                        queue.enqueue({row, col: col+1})
                    }
                    if(isShineBright(++input[row-1][col+1])) {
                        queue.enqueue({row: row-1, col: col+1})
                    }
                    if(isShineBright(++input[row+1][col+1])) {
                        queue.enqueue({row: row+1, col: col+1})
                    }
                    break
                case ((row+1) === rows && col > 0 && col < cols): // bottom edge not corner
                    if(isShineBright(++input[row][col-1])) {
                        queue.enqueue({row, col: col-1})
                    }
                    if(isShineBright(++input[row][col+1])) {
                        queue.enqueue({row, col: col+1})
                    }
                    if(isShineBright(++input[row-1][col])) {
                        queue.enqueue({row: row-1, col})
                    }
                    if(isShineBright(++input[row-1][col-1])) {
                        queue.enqueue({row: row-1, col: col-1})
                    }
                    if(isShineBright(++input[row-1][col+1])) {
                        queue.enqueue({row: row-1, col: col+1})
                    }
                    break
                case ((col+1) === cols && row > 0 && row < rows): // right edge not corner
                    if(isShineBright(++input[row-1][col])) {
                        queue.enqueue({row: row-1, col})
                    }
                    if(isShineBright(++input[row+1][col])) {
                        queue.enqueue({row: row+1, col: col})
                    }
                    if(isShineBright(++input[row][col-1])) {
                        queue.enqueue({row, col: col-1})
                    }

                    if(isShineBright(++input[row-1][col-1])) {
                        queue.enqueue({row: row-1, col: col-1})
                    }
                    if(isShineBright(++input[row+1][col-1])) {
                        queue.enqueue({row: row+1, col: col-1})
                    }
                    
                    break
                default:
                    if(isShineBright(++input[row][col-1])) {
                        queue.enqueue({row, col: col-1})
                    }
                    if(isShineBright(++input[row][col+1])) {
                        queue.enqueue({row, col: col+1})
                    }
                    if(isShineBright(++input[row-1][col])) {
                        queue.enqueue({row: row-1, col})
                    }
                    if(isShineBright(++input[row+1][col])) {
                        queue.enqueue({row: row+1, col})
                    }

                    if(isShineBright(++input[row-1][col+1])) {
                        queue.enqueue({row: row-1, col: col+1})
                    }
                    if(isShineBright(++input[row-1][col-1])) {
                        queue.enqueue({row: row-1, col: col-1})
                    }

                    if(isShineBright(++input[row+1][col-1])) {
                        queue.enqueue({row: row+1, col: col-1})
                    }
                    if(isShineBright(++input[row+1][col+1])) {
                        queue.enqueue({row: row+1, col: col+1})
                    }
        }
    }
    let isSync = true
    for(let row = 0; row < rows; ++row) {
        for(let col =0; col < cols; ++col) {
            if(input[row][col] < 0) {
                input[row][col] = 0
            } else {
                isSync = false
            }
        }
    }
    return [stepSum, isSync]
}

const addOne = (value) => {
    return value+1
}

const playGamePartII = (input) => {
    return playGame(input, Number.MAX_SAFE_INTEGER)
}

const readInput = (fileName) => {
    const data = fs.readFileSync(fileName, 'utf-8').split('\n').map((row)=> row.split('').map((number)=> {
        return parseInt(number)
    }))
    return data
}

console.log('start....')

//let gameInput = readInput('/Users/nirziv/dev/sandbox/node/adventOfCode/day11/input.test.txt')
let gameInput = readInput('/Users/nirziv/dev/sandbox/node/adventOfCode/day11/input.txt')
//console.log(gameInput)
console.log(playGame(gameInput, 100))
console.log(playGamePartII(gameInput))