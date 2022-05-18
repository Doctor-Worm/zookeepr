const fs = require("fs");
const path = require("path");


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // If personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            // If has multiple personality traits, use array of those.
            personalityTraitsArray = [query.personalityTraits];
        } else {
            // If has only 1 personality trait, use string.
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the perosnailtyTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array. For each trait being targeted by the filter, the filteredResults array will then contain only the entries that contain the trait, so at the end we'll have an array of animals that have every one of the traits when the .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
        );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};


function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, '../../data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
};

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
};


module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};