//https://dev.to/sulaimonolaniran/building-a-simple-quiz-with-html-css-and-javascript-4elp
//the object shape for storing the questions  
 const questions = [
    {
        question: `"I'm serious. And don’t call me Shirley!"`,
        optionA: "The Naked Gun",
        optionB: "The Jerk, Too",
        optionC: "Bacl to The Future",
        optionD: "Airplane",
        correctOption: "optionD"
    },

    {
        question: `"Little pigs, little pigs, let me come in. Not by the hair on your chiny-chin-chin? Then I'll huff, and I'll puff, and I'll blow your house in."`,
        optionA: "A Nightmare on Elm Street",
        optionB: "The Shining",
        optionC: "The Entity",
        optionD: "Per Sematary",
        correctOption: "optionB"
    },

    {
        question: `"Hello. My name is Inigo Montoya. You killed my father. Prepare to die!"`,
        optionA: "Robin Hood: Men in Tights",
        optionB: "Predator",
        optionC: "The Dead Zone",
        optionD: "The Princess Bride",
        correctOption: "optionD"
    },

    {
        question: `"Tell me somethin', my friend. You ever danced with the devil in the pale moonlight?"`,
        optionA: "The Silence of The Lambs",
        optionB: "Re-Animator",
        optionC: "Batman",
        optionD: "Creepshow",
        correctOption: "optionC"
    },

    {
        question: `"Don't you have a dark side? I know, you're probably one of those cheerful people who dot their 'i's' with little hearts."`,
        optionA: "When Harry Met Sally",
        optionB: "An American Werewolf in London",
        optionC: "Heathers",
        optionD: "Gremlins",
        correctOption: "optionA"
    },

    {
        question: `"Nobody really thinks it will work, do they? You just described every great success story."`,
        optionA: "Say Anything",
        optionB: "Breakfast Club",
        optionC: "Teen Wolf",
        optionD: "Ferris Bueller's Day Off",
        correctOption: "optionA"
    },

    {
        question: `"Say 'hello' to my little friend!"`,
        optionA: "Once Upon a Time in America",
        optionB: "The Untouchables",
        optionC: "Scarface",
        optionD: "The Cotton Club",
        correctOption: "optionC"
    },

    {
        question: `"I feel the need, the need for speed"`,
        optionA: "Top Gun",
        optionB: "No Man's Land",
        optionC: "Licence to Drive",
        optionD: "Speed Zone",
        correctOption: "optionA"
    },

    {
        question: `"Life moves pretty fast. You don’t stop and look around once in a while, you could miss it."`,
        optionA: "St Elmo's Fire",
        optionB: "Say Anything",
        optionC: "The Breakfast Club",
        optionD: "Ferris Bueller's Day Off",
        correctOption: "optionD"
    },

    {
        question: `"Do or do not, there is no try. "`,
        optionA: "Aliens",
        optionB: "Return of the Jedi",
        optionC: "Empire Strikes Back",
        optionD: "The Terminator",
        correctOption: "optionC"
    },

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
