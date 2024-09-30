const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Tiger", correct: false },
            { text: "Blue Whale", correct: true }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false }
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },
            { text: "George Orwell", correct: false }
        ]
    }
    
];


const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-button');
const nextBtn = document.getElementById('next-btn');



let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    let currentQuestionIndex = 0;
    let score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}







function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(function(answer){
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if(answer.correct == true){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}


function resetState(){
    nextBtn.style.display = 'none';

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

function handelNextBtn(){
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handelNextBtn();
    }else{
        startQuiz();
    }
})


startQuiz();