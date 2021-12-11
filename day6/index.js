
const _ = require('lodash')
const startGame = () => {
    const input = [5,1,1,5,4,2,1,2,1,2,2,1,1,1,4,2,2,4,1,1,1,1,1,4,1,1,1,1,1,5,3,1,4,1,1,1,1,1,4,1,5,1,1,1,4,1,2,2,3,1,5,1,1,5,1,1,5,4,1,1,1,4,3,1,1,1,3,1,5,5,1,1,1,1,5,3,2,1,2,3,1,5,1,1,4,1,1,2,1,5,1,1,1,1,5,4,5,1,3,1,3,3,5,5,1,3,1,5,3,1,1,4,2,3,3,1,2,4,1,1,1,1,1,1,1,2,1,1,4,1,3,2,5,2,1,1,1,4,2,1,1,1,4,2,4,1,1,1,1,4,1,3,5,5,1,2,1,3,1,1,4,1,1,1,1,2,1,1,4,2,3,1,1,1,1,1,1,1,4,5,1,1,3,1,1,2,1,1,1,5,1,1,1,1,1,3,2,1,2,4,5,1,5,4,1,1,3,1,1,5,5,1,3,1,1,1,1,4,4,2,1,2,1,1,5,1,1,4,5,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,4,2,1,1,1,2,5,1,4,1,1,1,4,1,1,5,4,4,3,1,1,4,5,1,1,3,5,3,1,2,5,3,4,1,3,5,4,1,3,1,5,1,4,1,1,4,2,1,1,1,3,2,1,1,4]
    //const input = [3,4,3,1,2]
    let newChildrenNumber = 0;
    const newChild = 8
    const reset = 6
    const totalDays = 256
    let dayCounter = 0

    const populationControl = buildPopulation(input)
    //console.log({populationControl})
    while(++dayCounter <=totalDays) {
        newChildrenNumber = populationControl[0];
        populationControl[0] = 0
        for(let index=1; index < 9; ++index) {
            populationControl[index-1] = populationControl[index]
            populationControl[index] = 0;
        }
        populationControl[8] = newChildrenNumber
        populationControl[reset] += newChildrenNumber
        //population = input.length
        //console.log(`day:${dayCounter}, population: ${populationControl}`)
    }


    return populationControl
}

const buildPopulation = (input) => {
    const populationControl = [0,0,0,0,0,0,0,0,0]
    const inputLength = input.length;
    for(let index = 0; index < inputLength; ++index) {
        populationControl[input[index]]++
    }

    return populationControl

}


console.log('number of population', _.sum(startGame()))
