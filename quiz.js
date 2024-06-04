document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    localStorage.setItem('userName', name);
    document.getElementById('userName').textContent = name;
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    startQuiz();
});

function startQuiz() {
    const questions = [
        {
            question: " 1. What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "2. What is 2 + 2?",
            choices: ["3", "4", "5", "6"],
            answer: "4"
        },
    ];

    let currentQuestionIndex = 0;
    let selectedAnswers = [];
    let timer;
    const quizContainer = document.getElementById('quizContainer');
    const nextButton = document.getElementById('nextButton');

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <div class="quiz-card">
                    <div id="timer">Time left: 20 seconds</div>
                    <h4>${question.question}</h4>
                    <ul class="list-group mt-3">
                        ${question.choices.map((choice, index) => `
                            <li class="list-group-item">
                                <input type="radio" name="answer" id="choice${index}" value="${choice}">
                                <label for="choice${index}">${choice}</label>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;

            nextButton.style.display = 'none';
            let timeLeft = 20;
            document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;

            timer = setInterval(() => {
                timeLeft--;
                document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    nextQuestion();
                }
            }, 1000);

            document.querySelectorAll('input[name="answer"]').forEach(input => {
                input.addEventListener('change', () => {
                    nextButton.style.display = 'inline-block';
                });
            });
        } else {
            showResults();
        }
    }

    function nextQuestion() {
        clearInterval(timer);
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            selectedAnswers.push(selectedAnswer.value);
        } else {
            selectedAnswers.push(null);
        }
        currentQuestionIndex++;
        showQuestion();
    }
    function showResults() {
        let correct = 0;
        questions.forEach((question, index) => {
            if (question.answer === selectedAnswers[index]) {
                correct++;
            }
        });

        quizContainer.innerHTML = `
            <div class="quiz-card">
                <h4>Thank you for completing the quiz!</h4>
                <p>Correct Answers: ${correct}</p>
                <p>Incorrect Answers: ${questions.length - correct}</p>
            </div>
        `;
    }
    nextButton.addEventListener('click', nextQuestion);

    showQuestion();

    
}
