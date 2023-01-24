import "./style.css"

require('dotenv').config({path: './env'})

let GOOGLE_KEY = (process.env.GOOGLE_KEY)
let GOOGLE_SOURCE_KEY = (process.env.GOOGLE_SOURCE_KEY)

let paraEl = document.getElementById("para-el")
let nopeBtn = document.getElementById("nope-btn")
let descriptEl = document.getElementById("descript-el")
let wikipediaEl = document.getElementById("wikipedia-el")
let signOff = document.getElementById("sign-off-el")
let wikiImg = document.getElementById("wiki-img")
let googleEl = document.getElementById("google-el")
let recipesEl = document.getElementById("recipes-el")

let extraL = document.getElementById("extraL")
let extraR = document.getElementById("extraR")
let leftBtn = document.getElementById("left-btn")
let rightBtn = document.getElementById("right-btn")

let datalistOne = document.getElementById("one")
let datalistTwo = document.getElementById("two")
let datalistThree = document.getElementById("three")

let commentEl = document.getElementById("comment-el")
let recipeCreate = document.getElementById("recipe-create")
let confirmBtn = document.getElementById("confirm-name")

let submitBtn = document.getElementById("submit-btn")

let inputOne = document.getElementById("input-one")
let inputTwo = document.getElementById("input-two")
let inputThree = document.getElementById("input-three")

let inputOneT = document.getElementById("input-oneT")
let inputTwoT = document.getElementById("input-twoT")
let inputThreeT = document.getElementById("input-threeT")

let bigEl = document.getElementById("big")
let wordsEl = document.getElementById("words")
let darkenEl = document.getElementById("darken-el")
let returnBtn = document.getElementById("return-btn")

let instance = 0
let keyNum = 0
let doneTutorial = false

let history = localStorage.getItem("doneTutorial")
let historyIng = localStorage.getItem("ingredientsList")
let historyRecipes = localStorage.getItem("recipesList")
let keyNumHis = JSON.parse(localStorage.getItem("keyNumHis"))

let numOne
let numTwo
let numThree
let recipe
let newSection



/////// SET-UP ///////


let recipes = {
    "0": "omelete",
    "012": "pasta",
    "123": "pasta with sauce",
    "016": "custard",
    "01": "fritatta",
    "07": "fried rice",
    "09": "fried vegetables",
    "126": "pancakes",
    "015": "french toast",
    "024": "potato pancakes",
    "05": "egg sandwich",
    "4": "boiled potatoes",
    "478": "bean soup",
    "5": "toast",
    "58": "beans on toast",
    "9": "salad",
}

let myIngredients = {
    eggs: {
        type: "breakfast",
        ID: "0"
    },
    milk: {
        type: "drink",
        ID: "1"
    },
    flour: {
        type: "ingredient",
        ID: "2"
    },
    pasta: {
        type: "dinner",
        ID: "3"
    },
    potatoes: {
        type: "dinner",
        ID: "4"
    },
    bread: {
        type: "breakfast",
        ID: "5"
    },
    sugar: {
        type: "sweet",
        ID: "6"
    },
    rice: {
        type: "dinner",
        ID: "7"
    },
    beans: {
        type: "dinner",
        ID: "8"
    },
    vegetables: {
        type: "ingredient",
        ID: 9
    }
}

function newSourceGen() {
    let newSource = document.createElement('script')
    newSource.src = `https://cse.google.com/cse.js?cx=${GOOGLE_SOURCE_KEY}`
    newSource.setAttribute("type", "text/javascript");
    newSource.async = true
    document.head.appendChild(newSource);
}

newSourceGen()

function checkVisited() {
    if (historyIng) {
        datalistOne = historyIng
        datalistTwo = historyIng
        datalistThree = historyIng
    }
    if (historyRecipes) {
        recipes = historyRecipes
    }
    if (keyNumHis) {
        keyNum = keyNumHis
    } else {
        keyNum = 0
    }
}

checkVisited()


/////// MAIN CONTENT ///////


leftBtn.addEventListener("click", function() {
    let option = document.createElement('option');
    option.value = document.getElementById("add-ingredient").value
    datalistOne.appendChild(option)

    let optionTwo = document.createElement('option');
    optionTwo.value = document.getElementById("add-ingredient").value
    datalistTwo.appendChild(optionTwo)

    let optionThree = document.createElement('option');
    optionThree.value = document.getElementById("add-ingredient").value
    datalistThree.appendChild(optionThree)

    localStorage.setItem("ingredientsList", datalistOne)

    ingredientList()
})

rightBtn.addEventListener("click", function() {
    darkenEl.style.display = "block"
    recipeCreate.style.display = "flex"
})

window.onclick = function(event) {
    if (event.target == darkenEl) {
      darkenEl.style.display = "none";
    }
}

returnBtn.addEventListener("click", function() {
    darkenEl.style.display = "none"
    recipeCreate.style.display = "none"
})

confirmBtn.addEventListener("click", function() {
    addRecipe()
    recipeCreate.style.display = "none"
    localStorage.setItem("recipesList", recipes)
})

function addRecipe() {
    let newRecipe
    let newOne
    let newTwo
    let newThree
    for (let i = 0; i < document.getElementById("one").options.length; i++){
        if (inputOneT.value === document.getElementById("one").options[i].value) {
            newOne = i
            newOne = newOne.toString()
        }
        if (inputTwoT.value === document.getElementById("two").options[i].value) {
            newTwo = i
            newTwo = newTwo.toString()
        }
        if (inputThreeT.value === document.getElementById("three").options[i].value) {
            newThree = i
            newThree = newThree.toString()
        }}
    if ((typeof newOne === 'string') && (typeof(newTwo) === 'string') && (typeof(newThree) === 'string')) {
            newRecipe = newOne + newTwo + newThree
    } else if ((typeof(newOne) !== 'string') && (typeof(newOne) !== 'string') && (typeof(newOne) === 'string')) {
            newRecipe = newThree
    } else if ((typeof(newOne) !== 'string') && (typeof(newOne) === 'string') && (typeof(newOne) === 'string')) {
            newRecipe = newTwo + newThree
    } else if ((typeof(newOne) === 'string') && (typeof(newOne) !== 'string') && (typeof(newOne) === 'string')) {
            newRecipe = newOne + newThree
    }  else if ((typeof(newOne) === 'string') && (typeof(newOne) !== 'string') && (typeof(newOne) !== 'string')) {
            newRecipe = newOne
    } else if ((typeof(newOne) !== 'string') && (typeof(newOne) === 'string') && (typeof(newOne) !== 'string')) {
            newRecipe = newTwo
    } else if ((typeof(newOne) === 'string') && (typeof(newOne) === 'string') && (typeof(newOne) !== 'string')) {
            newRecipe = newOne + newTwo
    }
    
    recipes[`${newRecipe}`] = document.getElementById("recipe-name").value
    recipeList()
}

function ingredientList() {
    if (extraL.firstChild) {
         for (let i = 0; i < (document.getElementById("one").options.length) - 1; i++) {
             extraL.removeChild(extraL.lastChild)
         }
    }

    for (let i = 0; i < document.getElementById("one").options.length; i++) {
        newSection = document.createElement("div")
        newSection.innerText = document.getElementById("one").options[i].value
        newSection.style.display = "flex"
        newSection.style.background = "burlywood"
        newSection.style.color = "black"
        extraL.append(newSection)
    }
}

function ingredientListStartUp() {
   for (let i = 0; i < document.getElementById("one").options.length; i++) {
       newSection = document.createElement("div")
       newSection.innerText = document.getElementById("one").options[i].value
       newSection.style.display = "flex"
       newSection.style.background = "burlywood"
       newSection.style.color = "black"
       extraL.append(newSection)
   }
}

function recipeList() {
     if (extraR.firstChild) {
         for (let i = 0; i < Object.keys(recipes).length; i++) {
             extraR.removeChild(extraR.lastChild)
         }    
    }

    for (let i = 0; i < Object.keys(recipes).length; i++) {
        newSection = document.createElement("div")
        newSection.innerText = recipes[Object.keys(recipes)[i]]
        newSection.style.display = "flex"
        newSection.style.background = "burlywood"
        newSection.style.color = "black"
        extraR.append(newSection)
    }
}

function recipeListStartUp() {
   for (let i = 0; i < Object.keys(recipes).length; i++) {
       newSection = document.createElement("div")
       newSection.innerText = recipes[Object.keys(recipes)[i]]
       newSection.style.display = "flex"
       newSection.style.background = "burlywood"
       newSection.style.color = "black"
       extraR.append(newSection)
   }
}

ingredientListStartUp()
recipeListStartUp()

/////// API RESPONSES ///////


function getDinner() {
    descriptEl.innerText = "What is"
    for (let i = 0; i < document.getElementById("one").options.length; i++){
        if (inputOne.value === document.getElementById("one").options[i].value) {
            numOne = i
            numOne = numOne.toString()
        }
        if (inputTwo.value === document.getElementById("two").options[i].value) {
            numTwo = i
            numTwo = numTwo.toString()
        }
        if (inputThree.value === document.getElementById("three").options[i].value) {
            numThree = i
            numThree = numThree.toString()
        }
    }
    if ((typeof numOne === 'string') && (typeof(numTwo) === 'string') && (typeof(numThree) === 'string')) {
        recipe = numOne + numTwo + numThree
        descriptEl.innerText += " " + recipes[recipe] + "?"
    } else if ((typeof(numOne) !== 'string') && (typeof(numOne) !== 'string') && (typeof(numOne) === 'string')) {
        recipe = numThree
        descriptEl.innerText += " " + recipes[recipe] + "?"
    } else if ((typeof(numOne) !== 'string') && (typeof(numOne) === 'string') && (typeof(numOne) === 'string')) {
        recipe = numTwo + numThree
        descriptEl.innerText += " " + recipes[recipe] + "?"
    } else if ((typeof(numOne) === 'string') && (typeof(numOne) !== 'string') && (typeof(numOne) === 'string')) {
        recipe = numOne + numThree
        descriptEl.innerText += " " + recipes[recipe] + "?"
    }  else if ((typeof(numOne) === 'string') && (typeof(numOne) !== 'string') && (typeof(numOne) !== 'string')) {
        recipe = numOne
        descriptEl.innerText += " " + recipes[recipe] + "?"
    } else if ((typeof(numOne) !== 'string') && (typeof(numOne) === 'string') && (typeof(numOne) !== 'string')) {
        recipe = numTwo
        descriptEl.innerText += " " + recipes[recipe] + "?"
    } else if ((typeof(numOne) === 'string') && (typeof(numOne) === 'string') && (typeof(numOne) !== 'string')) {
        recipe = numOne + numTwo
        descriptEl.innerText += " " + recipes[recipe] + "?"
    }
}

function dinnerComment() {
    for (let i = 0; i < Object.keys(myIngredients).length; i++) {
        if (Object.values(myIngredients)[i]['ID'] === numOne || Object.values(myIngredients)[i]['ID'] === numTwo || Object.values(myIngredients)[i]['ID'] === numThree) {
            if (Object.values(myIngredients)[i]['type'] === "dinner") {
                commentEl.innerText = "A hearty meal."
            } else if (Object.values(myIngredients)[i]['type'] === "breakfast") {
                commentEl.innerText = "A morning meal."
            } else if (Object.values(myIngredients)[i]['type']=== "sweet") {
                commentEl.innerText = "Sweet tooth!"
            } else if (Object.values(myIngredients)[i]['type'] === "drink") {
                commentEl.innerText = "Take it with you!"
            } else if (Object.values(myIngredients)[i]['type'] === "ingredient") {
                commentEl.innerText = "What does it make?"
            }
            commentEl.style.display = "flex"
        }
    }
}

let url

function getDescription() {
    keyNum += 1
    console.log(keyNum)
    localStorage.setItem("keyNumHis", keyNum)
     if (keyNum >= 100) {
         console.log("keys exceeded")
     } else {
        function loadJSON(url) {
            fetch(url)
            .then(
              function(response) {
                response.json().then(function(data) {
                  logData(data)
                });
              }
            )
            .catch(function(err) {
              console.log('Fetch Error :-S', err);
            });
          }
        function logData(data) {
            let pageId = Object.keys(data.query.pages)[0]
            let description = data.query.pages[pageId].extract
            console.log(description)
            wikipediaEl.innerText = description
            if ((typeof(input) !== 'undefined') && data) {
                descriptEl.style.display = "block"
                signOff.style.display = "block"
                wikipediaEl.style.display = "block"
            }
        }
        let input = recipes[recipe]
        if (typeof(input) !== 'undefined') {
            url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${input}`
            loadJSON(url, logData,'jsonp')
        }

    }
}

let urlImg

function getImage() {
    keyNum += 1
    localStorage.setItem("keyNumHis", keyNum)
     if (keyNum >= 100) {
         console.log("keys exceeded")
     } else {
        function loadJSON(urlImg) {
            fetch(urlImg)
            .then(
              function(response) {
                response.json().then(function(data) {
                  logData(data)
                });
              }
            )
            .catch(function(err) {
              console.log('Fetch Error :-S', err);
            });
          }
        function logData(data) {
            let pageId = Object.keys(data.query.pages)[0]
            let imgFinal= data.query.pages[pageId].original.source
            console.log(imgFinal)
            wikiImg.src = imgFinal
        }
        let input = recipes[recipe]
        if (typeof(input) !== 'undefined') {
            urlImg = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&origin=*&titles=${input}`
            loadJSON(urlImg, logData,'jsonp')
        }
    }
}


function addScript() {
    let input = recipes[recipe] + "_recipe"
    let newScript = document.createElement('script')
    newScript.src = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_KEY}&cx=${GOOGLE_SOURCE_KEY}&omuauf_lfve&q=${input}&callback=hndlr`
    document.head.appendChild(newScript)
}



function hndlr(response) {
    for (let i = 0; i < 3; i++) {
        let item = response.items[i]
        googleEl.append(
            document.createElement("div"),
            document.createTextNode(item.title),
            document.createTextNode(item.snippet),
            document.createTextNode(item.link)
            )
        }
    if ((typeof(recipes[recipe]) !== "undefined") && response) {
        recipesEl.style.display = "flex"
    }
}

window.hndlr = hndlr



submitBtn.addEventListener("click", function() {
    if (googleEl.firstChild) {
        for (let i = 0; i < 12; i++) {
            googleEl.removeChild(googleEl.lastChild)
        }    
   }
   keyNum = 0
    getDinner()
    addScript()
    dinnerComment()
    getImage()
    getDescription()
    hndlr()
})

