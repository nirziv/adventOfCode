const _ = require('lodash')
const fs = require('fs')
const Stack = require('stack-lifo')
const playGame = (input) => {
    let stack = new Stack()
    const score = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    }
    let total = 0
    for(let row=0; row < input.length; ++row) {
        let str = input[row]
        let isCorruptedLine = false
        for(let i=0; i < str.length && !isCorruptedLine; ++i) {
            let char = str[i]
            if(char === '<' || char === '[' || char === '{' || char === '(') {
                stack.push(char)
                continue
            }
            let dequeueValue = stack.pop()
            if(!isClosingChunk(dequeueValue, char)) {
                isCorruptedLine = true
                total+= score[char]
            }
        }
        stack.clear()
    }

    return total
    
}
isClosingChunk = (open, close) => {
    switch(close) {
        case ')':
            return open === '('
        case '}':
            return open === '{'
        case ']':
            return open === '['
        case '>':
            return open === '<'
        default:
            return false
    }
}

const playGamePartII = (input) => {
    let stack = new Stack()
    const score = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }
    let total = 0
    let scores = []
    for(let row=0; row < input.length; ++row) {
        let str = input[row]
        let isCorruptedLine = false
        for(let i=0; i < str.length && !isCorruptedLine; ++i) {
            let char = str[i]
            if(char === '<' || char === '[' || char === '{' || char === '(') {
                stack.push(char)
                continue
            }
            let dequeueValue = stack.pop()
            if(!isClosingChunk(dequeueValue, char)) {
                isCorruptedLine = true
            }
        }
        if(!isCorruptedLine) {
            while(!stack.isEmpty()) {
                total = total * 5 + score[getClosingCharacter(stack.pop())]
            }
            scores.push(total)
        }
        stack.clear()
        
        total = 0
    }
    return scores.sort((a,b)=> a-b)[Math.floor(scores.length/2)]

}
getClosingCharacter = (char) => {
    switch(char) {
        case '(':
            return ')'
        case '{':
            return '}'
        case '[':
            return ']'
        case '<':
            return '>'
        default:
            throw `wrong character: ${char}`
    }
}

const readInput = (fileName) => {
    const data = fs.readFileSync(fileName, 'utf-8').split('\n').map((row)=> row.split(''))
    return data
}

console.log('start....')

//let gameInput = readInput('/Users/nirziv/dev/sandbox/node/adventOfCode/day10/input.test.txt')
let gameInput = readInput('./input.txt')
//console.log(gameInput)
console.log(playGame(gameInput))
console.log(playGamePartII(gameInput))