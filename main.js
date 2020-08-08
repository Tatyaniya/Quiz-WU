/* Все варианты ответа */
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');

/* Все options */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');
const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion; // индекс текущего вопроса
let indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // Итоговый результат

const correctAnswer = document.getElementById('correct-answer');
const numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');
const btnTryAgain = document.getElementById('btn-try-again');

/* Модалка */
const quizOverModal = document.querySelector('.quiz-over-modal');

const questions = [
    {
        question: 'Как в JavaScript вычислить процент от числа?',
        options: [
            'Так в JavaScript нельзя делать',
            'Оператор: %',
            'Умножить на количество процентов и разделить на 100',
            'Вызвать метод findPrecent()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат выражения: "13" + 7',
        options: [
            '20',
            '137',
            'undefined',
            'error',
        ],
        rightAnswer: 1
    },
    {
        question: 'На JavaScript нельзя писать:',
        options: [
            'Игры',
            'Скрипты для сайтов',
            'Десктопные выражения',
            'Плохо',
        ],
        rightAnswer: 3
    },
    {
        question: 'Чем метод отличается от функции:',
        options: [
            'Ничем',
            'Что такое функция?',
            'Что такое метод?',
            'Метод - это в объекте',
        ],
        rightAnswer: 3
    },
];

numberOfAllQuestions.innerHTML = questions.length; //  Выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // вопрос

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // Номер текущей страницы
    indexOfPage++; // Увеличение индекса страницы
};

let completeAnswers = [];

/* Выбрать вопрос случаным образом 
Есть глюк - пропускает вопросы.
Надо бы где-то проверить, все ли вопросы пройдены?
*/
const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // повтор случайного числа

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completeAnswers.length > 0) {
            completeAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });

            /* Если число повторилось */
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }

        if(completeAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }

    completeAnswers.push(indexOfQuestion);
};

/* Корректность ответа */
const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

/* Клик по ответу */
const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};

/* Переход к следующему вопросу */
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

/* Кнопочки внизу */
const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
};

/* Закрашиваем кружочки */
const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(status);
};

/* Если не выбран вариант ответа, не пускать дальше */
const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Выберите вариант ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
};

btnNext.addEventListener('click', validate);

/* Отслеживаем, по какому ответу кликнули */
for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

/* Игра окончена */
const quizOver = () => {
    quizOverModal.classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

/* Начать сначала */
const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});