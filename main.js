
window.onload = function exampleFunction() { 
    document.getElementById('userName').textContent = localStorage.getItem('userName');
    startQuiz();
}

function startQuiz() {
    const questions = [
        {
            question: "1. Who is making the Web standards ?",
            choices: ["Mozilla", "Google", "Microsoft", "The Worl Wide Web Consortium"],
            answer: "The Worl Wide Web Consortium"
        },
        {
            question: "2. Who is making the Web standards ?",
            choices: ["Mozilla", "Google", "Microsoft", "The Worl Wide Web Consortium"],
            answer: "Mozilla"
        },
        {
            question: "3. Who is making the Web standards ?",
            choices: ["Mozilla", "Google", "Microsoft", "The Worl Wide Web Consortium"],
            answer: "Google"
        },
        {
            question: "4. Who is making the Web standards ?",
            choices: ["Mozilla", "Google", "Microsoft", "The Worl Wide Web Consortium"],
            answer: "Microsoft"
        },
        {
            question: "5. Who is making the Web standards ?",
            choices: ["Mozilla", "Google", "Microsoft", "The Worl Wide Web Consortium"],
            answer: "The Worl Wide Web Consortium"
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
                <div class="d-flex flex-column align-items-center">
                    <h4>Questions ${currentQuestionIndex + 1} / ${questions.length}</h4>
                </div>
                <div class="quiz-card">
                <div>
                    <h4>${question.question}</h4>
                            <ul class="list-group mt-3">
                            ${question.choices.map((choice, index) => `
                                <li class="list-group-item">
                                    <input type="radio" name="answer" id="choice${index}" value="${choice}">
                                    <label class=" answer-text ml-4" for="choice${index}">${choice}</label>
                                </li>
                            `).join('')}
                        </ul>
                </div>
                </div>
            `;

            nextButton.style.display = 'none';
            let timeLeft = 20;
            document.getElementById('timer').textContent = `00: ${timeLeft}`;

            timer = setInterval(() => {
                timeLeft--;
                document.getElementById('timer').textContent = `00: ${timeLeft}`;
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
            <div class="thank-card">
                <h4>Thank you for completing the quiz!</h4>
                <p>Correct Answers: ${correct}</p>
                <p>Incorrect Answers: ${questions.length - correct}</p>
            </div>
        `;

        nextButton.style.display = 'none';
        timer.style.display = 'none';
    }
    nextButton.addEventListener('click', nextQuestion);

    showQuestion();

    
}
