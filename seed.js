const axios = require('axios');
const {addOrUpdateCharacter} = require('./data/dynamo')

const data = [{
    "id": "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
    "name": "Harry Potter",
    "alternate_names": ["The Boy Who Lived", "The Chosen One"],
    "species": "human",
    "gender": "male",
    "house": "Gryffindor",
    "dateOfBirth": "31-07-1980",
    "yearOfBirth": 1980,
    "wizard": true,
    "ancestry": "half-blood",
    "eyeColour": "green",
    "hairColour": "black",
    "wand": {
        "wood": "holly",
        "core": "phoenix feather",
        "length": 11
    },
    "patronus": "stag",
    "hogwartsStudent": true,
    "hogwartsStaff": false,
    "actor": "Daniel Radcliffe",
    "alternate_actors": [],
    "alive": true,
    "image": "https://ik.imagekit.io/hpapi/harry.jpg"
}, {
    "id": "4c7e6819-a91a-45b2-a454-f931e4a7cce3",
    "name": "Hermione Granger",
    "alternate_names": [],
    "species": "human",
    "gender": "female",
    "house": "Gryffindor",
    "dateOfBirth": "19-09-1979",
    "yearOfBirth": 1979,
    "wizard": true,
    "ancestry": "muggleborn",
    "eyeColour": "brown",
    "hairColour": "brown",
    "wand": {
        "wood": "vine",
        "core": "dragon heartstring",
        "length": 10.75
    },
    "patronus": "otter",
    "hogwartsStudent": true,
    "hogwartsStaff": false,
    "actor": "Emma Watson",
    "alternate_actors": [],
    "alive": true,
    "image": "https://ik.imagekit.io/hpapi/hermione.jpeg"
}, {
    "id": "c3b1f9a5-b87b-48bf-b00d-95b093ea6390",
    "name": "Ron Weasley",
    "alternate_names": ["Dragomir Despard"],
    "species": "human",
    "gender": "male",
    "house": "Gryffindor",
    "dateOfBirth": "01-03-1980",
    "yearOfBirth": 1980,
    "wizard": true,
    "ancestry": "pure-blood",
    "eyeColour": "blue",
    "hairColour": "red",
    "wand": {
        "wood": "willow",
        "core": "unicorn tail-hair",
        "length": 14
    },
    "patronus": "Jack Russell terrier",
    "hogwartsStudent": true,
    "hogwartsStaff": false,
    "actor": "Rupert Grint",
    "alternate_actors": [],
    "alive": true,
    "image": "https://ik.imagekit.io/hpapi/ron.jpg"
}, {
    "id": "af95bd8a-dfae-45bb-bc69-533860d34129",
    "name": "Draco Malfoy",
    "alternate_names": [],
    "species": "human",
    "gender": "male",
    "house": "Slytherin",
    "dateOfBirth": "05-06-1980",
    "yearOfBirth": 1980,
    "wizard": true,
    "ancestry": "pure-blood",
    "eyeColour": "grey",
    "hairColour": "blonde",
    "wand": {
        "wood": "hawthorn",
        "core": "unicorn tail-hair",
        "length": 10
    },
    "patronus": "",
    "hogwartsStudent": true,
    "hogwartsStaff": false,
    "actor": "Tom Felton",
    "alternate_actors": [],
    "alive": true,
    "image": "https://ik.imagekit.io/hpapi/draco.jpg"
}, {
    "id": "ca3827f0-375a-4891-aaa5-f5e8a5bad225",
    "name": "Minerva McGonagall",
    "alternate_names": [],
    "species": "human",
    "gender": "female",
    "house": "Gryffindor",
    "dateOfBirth": "04-10-1925",
    "yearOfBirth": 1925,
    "wizard": true,
    "ancestry": "half-blood",
    "eyeColour": "",
    "hairColour": "black",
    "wand": {
        "wood": "fir",
        "core": "dragon heartstring",
        "length": 9.5
    },
    "patronus": "tabby cat",
    "hogwartsStudent": false,
    "hogwartsStaff": true,
    "actor": "Dame Maggie Smith",
    "alternate_actors": [],
    "alive": true,
    "image": "https://ik.imagekit.io/hpapi/mcgonagall.jpg"
}, {
    "id": "d5c4daa3-c726-426a-aa98-fb40f3fba816",
    "name": "Cedric Diggory",
    "alternate_names": [],
    "species": "human",
    "gender": "male",
    "house": "Hufflepuff",
    "dateOfBirth": null,
    "yearOfBirth": 1977,
    "wizard": true,
    "ancestry": "",
    "eyeColour": "grey",
    "hairColour": "brown",
    "wand": {
        "wood": "ash",
        "core": "unicorn hair",
        "length": 12.25
    },
    "patronus": "",
    "hogwartsStudent": true,
    "hogwartsStaff": false,
    "actor": "Robert Pattinson",
    "alternate_actors": [],
    "alive": false,
    "image": "https://ik.imagekit.io/hpapi/cedric.png"
}, {
    "id": "8f9aa40b-5d7c-441e-ad32-4564ecda3b70",
    "name": "Cho Chang",
    "alternate_names": [],
    "species": "human",
    "gender": "female",
    "house": "Ravenclaw",
    "dateOfBirth": "07-04-1979",
    "yearOfBirth": 1979,
    "wizard": true,
    "ancestry": "",
    "eyeColour": "brown",
    "hairColour": "black",
    "wand": {
        "wood": "",
        "core": "",
        "length": null
    },
    "patronus": "swan",
    "hogwartsStudent": true,
    "hogwartsStaff": false,
    "actor": "Katie Leung",
    "alternate_actors": [],
    "alive": true,
    "image": "https://ik.imagekit.io/hpapi/cho.jpg"
}]
const seedData = async () => {
    // const url = 'https://hp-api.onrender.com/api/characters';
    
    try {
        // const {data: characters} = await axios.get(url);
        const characterPromises = data.map((char, i) => 
            addOrUpdateCharacter({...char, id: i+''})
        )
        await Promise.all(characterPromises);
    } catch (error) {
        console.error(error);
    }
}

seedData()