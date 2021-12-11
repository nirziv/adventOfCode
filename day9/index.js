const _ = require('lodash')
const fs = require('fs')
const Queue = require('queue-fifo')
const playGame = (input, rows, cols) => {
    let level = 0;
    let lowLevels = Array.from({length:rows}, () => Array.from({length:cols}, () => -1))
    while(level < 10){
        for(let row=0; row < rows; ++row) {
            for(let col=0; col<cols; ++col) {
                if(input[row][col] === level) {
                    if(level === 0) {// 0 is the lowest
                        lowLevels[row][col] = level
                        continue
                    }
                    switch(true) {
                        case (col === 0 && row === 0): //top left corner
                            if(input[row][col+1] > level && input[row+1][col] > level) {
                                lowLevels[row][col] = level
                            }
                            break
                        case (col === 0 && (row+1) === rows): // bottom left corner
                            if(input[row-1][col] > level && input[row][col+1] > level) {
                                lowLevels[row][col] = level
                            }
                            break
                        case ((col+1) === cols && row === 0): // top right corner
                            if(input[row][col-1] > level && input[row+1][col] > level) {
                                lowLevels[row][col] = level
                            }
                            break
                        case ((col+1) === cols && (row+1) === rows): // bottom right corner
                            if(input[row][col-1] > level && input[row-1][col-1] > level) {
                                lowLevels[row][col] = level
                            }
                            break
                        case (row === 0 && col > 0 && col < cols): // top edge not corner
                            if(input[row][col-1] > level && input[row][col+1] > level && input[row+1][col] > level) {
                                lowLevels[row][col] = level
                            }
                            break
                        case (row >0 && row < rows && col === 0): // left edge not corner
                            if(input[row-1][col] > level && input[row+1][col] > level && input[row][col+1] > level) {
                                lowLevels[row][col] = level
                            }
                            break
                        case ((row+1) === rows && col > 0 && col < cols): // bottom edge not corner
                            if(input[row][col-1] > level && input[row][col+1] > level && input[row-1][col] > level) {
                                lowLevels[row][col] = level
                            }
                            break
                        case ((col+1) === cols && row > 0 && row < rows): // right edge not corner
                            if(input[row-1][col] > level && input[row+1][col] > level && input[row][col-1] > level) {
                                lowLevels[row][col] = level
                            }
                            break
                        default:
                            if(input[row][col-1] > level && input[row][col+1] > level && input[row+1][col] > level && input[row-1][col] > level) {
                                lowLevels[row][col] = level
                            }
                    }
                }
            }
        }
        ++level
    }
    //console.log({lowLevels})
    return lowLevels
}

const playGamePartII = (lowLevels, input, rows, cols) => {
    let largestSize = new Array(3).fill(0), workingQueue = new Queue(), queue = new Queue(), total=0
    let clusters = Array.from({length:rows}, () => Array.from({length:cols}, () => -1))
    for(let row=0; row < rows; ++row) {
        for(let col=0; col < cols; ++col) {
            if(lowLevels[row][col] !== -1) {
                queue.enqueue({row, col})
            }
        }
    }
    while(!queue.isEmpty()){
        let val = queue.dequeue()
        workingQueue.enqueue(val)
        total=0
        while(!workingQueue.isEmpty()){
            let {row, col} = workingQueue.dequeue()
            let level = input[row][col]
            if(level === 9) {
                continue;
            }
            console.log(level)
            if( clusters[row][col] !== -1) {
                continue;
            }
            //console.log({size: queue.size()})
            clusters[row][col] = level
            ++total
            switch(true) {
                case (col === 0 && row === 0): //top left corner
                    if(clusters[row][col+1] === -1){
                        workingQueue.enqueue({row, col:col+1})
                    }
                    if(clusters[row+1][col] === -1) {
                        workingQueue.enqueue({row: row+1, col})
                    }
                    break
                case (col === 0 && (row+1) === rows): // bottom left corner
                    if(clusters[row-1][col] === -1) {
                        workingQueue.enqueue({row: row-1, col})
                    }
                    if(clusters[row][col+1] === -1) {
                        workingQueue.enqueue({row, col: col+1})
                    }
                    break
                case ((col+1) === cols && row === 0): // top right corner
                    if(clusters[row][col-1] === -1) {
                        workingQueue.enqueue({row, col: col-1})
                    }
                    if(clusters[row+1][col] === -1) {
                        workingQueue.enqueue({row: row+1, col})
                    }
                    break
                case ((col+1) === cols && (row+1) === rows): // bottom right corner
                    if(clusters[row][col-1] === -1) {
                        workingQueue.enqueue({row, col: col-1})
                    }
                    if(clusters[row-1][col-1] === -1) {
                        workingQueue.enqueue({row:row-1, col: col-1})
                    }
                    break
                case (row === 0 && col > 0 && col < cols):
                    if(clusters[row][col-1] === -1) {
                        workingQueue.enqueue({row, col: col-1})
                    }
                    if(clusters[row][col+1] === -1) {
                        workingQueue.enqueue({row, col: col+1})
                    }
                    if(clusters[row+1][col] === -1) {
                        workingQueue.enqueue({row: row+1, col})
                    }
                    // top edge not corner
                    break
                case (row >0 && row < rows && col === 0): // left edge not corner
                    if(clusters[row-1][col] === -1) {
                        workingQueue.enqueue({row: row-1, col})
                    }
                    if(clusters[row+1][col] === -1) {
                        workingQueue.enqueue({row: row+1, col})
                    }
                    if(clusters[row][col+1] === -1) {
                        workingQueue.enqueue({row, col: col+1})
                    }
                    break
                case ((row+1) === rows && col > 0 && col < cols): // bottom edge not corner
                    if(clusters[row][col-1] === -1) {
                        workingQueue.enqueue({row, col: col-1})
                    }
                    if(clusters[row][col+1] === -1) {
                        workingQueue.enqueue({row, col: col+1})
                    }
                    if(clusters[row-1][col] === -1) {
                        workingQueue.enqueue({row: row-1, col})
                    }
                    break
                case ((col+1) === cols && row > 0 && row < rows): // right edge not corner
                    if(clusters[row-1][col] === -1) {
                        workingQueue.enqueue({row: row-1, col})
                    }
                    if(clusters[row+1][col] === -1) {
                        workingQueue.enqueue({row: row+1, col: col})
                    }
                    if(clusters[row][col-1] === -1) {
                        workingQueue.enqueue({row, col: col-1})
                    }
                    
                    break
                default:
                    if(clusters[row][col-1] === -1) {
                        workingQueue.enqueue({row, col: col-1})
                    }
                    if(clusters[row][col+1] === -1) {
                        workingQueue.enqueue({row, col: col+1})
                    }
                    if(clusters[row-1][col] === -1) {
                        workingQueue.enqueue({row: row-1, col})
                    }
                    if(clusters[row+1][col+1] === -1) {
                        workingQueue.enqueue({row: row+1, col})
                    }
            }     
        }
        largestSize.push(total)
        console.log(largestSize)
        largestSize = largestSize.sort((a,b)=> a-b).slice(1)
        console.log(largestSize)
        
    }
    console.log(largestSize)
    return largestSize.reduce((sum, value)=> sum*=value, 1)
}

const readInput = (fileName) => {
    const data = fs.readFileSync(fileName, 'utf-8').split('\n').map((row)=> row.split('').map((number)=> {
        return parseInt(number)
    }))
    return (data)
}

console.log('start....')
ß
//let gameInput = readInput('/Users/nirziv/dev/sandbox/node/adventOfCode/day9/input.test.txt')
let gameInput = readInput('./input.txt')
const rows = gameInput.length, cols = gameInput[0].length
let lowLevels = playGame(gameInput,rows, cols)
let sum = 0
for(let row=0; row < rows; ++row) {
    for(let col =0; col < cols; ++col){
        sum += (lowLevels[row][col]+1)
    }
}

console.log(sum)
console.log(playGamePartII(lowLevels,gameInput, rows, cols))