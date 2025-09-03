// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Quiz functionality
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    
    // Quiz questions
    const myQuestions = [
        {
            question: "Qual é a principal causa do derretimento acelerado das geleiras?",
            answers: {
                a: "Atividade solar intensa",
                b: "Aquecimento global causado por atividades humanas",
                c: "Processos naturais de aquecimento da Terra"
            },
            correctAnswer: "b"
        },
        {
            question: "Qual percentual de geleiras em patrimônios mundiais está em retrocesso acelerado?",
            answers: {
                a: "30%",
                b: "50%",
                c: "70%"
            },
            correctAnswer: "c"
        },
        {
            question: "Qual destes NÃO é um efeito do derretimento das geleiras?",
            answers: {
                a: "Aumento do nível dos oceanos",
                b: "Liberação de vírus antigos",
                c: "Intensificação das estações do ano"
            },
            correctAnswer: "c"
        }
    ];
    
    // Quiz state variables
    let currentQuestion = 0;
    const userAnswers = new Array(myQuestions.length);
    
    // Function to build quiz
    function buildQuiz() {
        // Clear previous content
        quizContainer.innerHTML = '';
        
        // Create question element
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question');
        questionElement.innerHTML = `<p>${myQuestions[currentQuestion].question}</p>`;
        
        // Create answers list
        const answersList = document.createElement('ul');
        answersList.classList.add('quiz-options');
        
        for (const letter in myQuestions[currentQuestion].answers) {
            const answerItem = document.createElement('li');
            answerItem.innerHTML = `
                <input type="radio" name="question${currentQuestion}" value="${letter}" id="option${letter}">
                <label for="option${letter}">${letter.toUpperCase()}) ${myQuestions[currentQuestion].answers[letter]}</label>
            `;
            
            // Mark as selected if previously chosen
            if (userAnswers[currentQuestion] === letter) {
                answerItem.classList.add('selected');
                answerItem.querySelector('input').checked = true;
            }
            
            // Add click event to select answer
            answerItem.addEventListener('click', function() {
                const input = this.querySelector('input');
                input.checked = true;
                
                // Remove selected class from all options
                const allOptions = answersList.querySelectorAll('li');
                allOptions.forEach(option => option.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Store user's answer
                userAnswers[currentQuestion] = input.value;
            });
            
            answersList.appendChild(answerItem);
        }
        
        // Append question and answers to quiz container
        questionElement.appendChild(answersList);
        quizContainer.appendChild(questionElement);
        
        // Update navigation buttons
        previousButton.disabled = currentQuestion === 0;
        nextButton.disabled = currentQuestion === myQuestions.length - 1;
    }
    
    // Function to show results
    function showResults() {
        // Count correct answers
        let numCorrect = 0;
        
        for (let i = 0; i < myQuestions.length; i++) {
            if (userAnswers[i] === myQuestions[i].correctAnswer) {
                numCorrect++;
            }
        }
        
        // Display results
        resultsContainer.innerHTML = `
            <h3>Você acertou ${numCorrect} de ${myQuestions.length} questões</h3>
            <p>${getResultMessage(numCorrect, myQuestions.length)}</p>
        `;
    }
    
    // Function to get result message based on score
    function getResultMessage(score, total) {
        const percentage = score / total;
        
        if (percentage === 1) {
            return "Parabéns! Você é um expert no assunto!";
        } else if (percentage >= 0.7) {
            return "Muito bom! Você conhece bem o tema.";
        } else if (percentage >= 0.5) {
            return "Bom! Mas você pode aprender mais sobre o assunto.";
        } else {
            return "Que tal estudar um pouco mais sobre derretimento das geleiras?";
        }
    }
    
    // Event listeners for navigation buttons
    previousButton.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            buildQuiz();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentQuestion < myQuestions.length - 1) {
            currentQuestion++;
            buildQuiz();
        }
    });
    
    submitButton.addEventListener('click', function() {
        showResults();
    });
    
    // Initialize quiz
    buildQuiz();
    
    // Animation for info items
    const infoItems = document.querySelectorAll('.info-item');
    
    function animateOnScroll() {
        infoItems.forEach(item => {
            const position = item.getBoundingClientRect();
            
            // If element is in viewport
            if (position.top < window.innerHeight - 100) {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    infoItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check on page load
    animateOnScroll();
});