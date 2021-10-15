const homeBox = document.querySelector(".home-page");
const quiz1Box = document.querySelector(".quiz1Page");
const listBox = document.querySelector(".characterListPage");
const charDescript = document.querySelector(".charDescription");
const learnedNumber = document.querySelector(".learnedNumber");
const secondNumber = document.querySelector(".secondNumber");
const list = document.querySelector(".list");
const question = document.querySelector(".question");
const definition = document.querySelector(".definition");
const answers = document.querySelector(".answers");
let savedHanzi = [];
let learnedHanzi = [];
let taughtHanzi = [];
let hanziToBeSaved = [];
let allHanziArray = [];
let allMeaningsArray = [];
let allZhuyinArray = [];
let currentlyLearning;
let char0;
let char1;
let char2;
let char3;
let char4;
let realAnswer;
//pull from localstorage onLoad: characters learned array
loadStorage();
function loadStorage() {
    if (localStorage.getItem("hanziLearned")) {
        let storedItems = localStorage.getItem("hanziLearned");
        learnedHanzi = JSON.parse(storedItems);
        learnedNumber.textContent = learnedHanzi.length + "/1500";
        secondNumber.textContent = learnedHanzi.length;
        learnedHanzi.forEach(hanzi => {
            savedHanzi.push(hanzi);
        })
    }
    console.log(learnedHanzi);
}
//opening choices: learn new or review or (small) edit list

//learn new initiate: pull five characters from the unlearned array, show off then initiate intro quiz
function learnNew() {
    allHanziArray = [];
    allMeaningsArray = [];
    allZhuyinArray = [];
    loadNewHanzi();
    teach(0);
}
function loadNewHanzi() {
    for (var [index, [key, value]] of Object.entries(Object.entries(hanzi1500))) {
        if (learnedHanzi.includes(key)) {
            console.log("not today")
        } else {
            allHanziArray.push(key);
            allZhuyinArray.push(value.zhuyin);
            allMeaningsArray.push(value.english);
        }
    }
    // console.log("2: ", allHanziArray);
    homeBox.classList.add('hidden');
    quiz1Box.classList.remove('hidden');
    //populate data
    currentlyLearning = [];
    char0 = new Learning(allHanziArray[0], 0);
    char1 = new Learning(allHanziArray[1], 0);
    char2 = new Learning(allHanziArray[2], 0);
    char3 = new Learning(allHanziArray[3], 0);
    char4 = new Learning(allHanziArray[4], 0);
    currentlyLearning.push(char0, char1, char2, char3, char4);
    console.log(currentlyLearning);
}
//show off: introduce the character- pronounce, definition
function teach(num) {
    //populate page
    removeAllChildren(question);
    removeAllChildren(definition);
    removeAllChildren(answers);
    let nuTitle = document.createElement('h1');
    let nuZhu = document.createElement('p');
    let nuDef = document.createElement('p');
    let nuButt = document.createElement('button');
    nuTitle.textContent = allHanziArray[num];
    nuZhu.textContent = allZhuyinArray[num];
    nuDef.textContent = allMeaningsArray[num];
    nuButt.textContent = "got it";
    nuButt.addEventListener('click', function () {
        randomQuiz(num)
    })
    question.append(nuTitle);
    definition.append(nuZhu, nuDef, nuButt);
}
class Learning {
    constructor(char, answeredCorrectly) {
        this.char = char;
        this.answeredCorrectly = answeredCorrectly;
    }
    //method
    goodAnswer() {
        return this.answeredCorrectly++;
    };
    badAnswer() {
        return this.answeredCorrectly--;
    };
}
//random quiz--must get correct 5 times to log character for the day- if answeredCorrectly < 5, ask another
function randomQuiz(num) {
    //populate page
    removeAllChildren(question);
    removeAllChildren(definition);
    removeAllChildren(answers);
    let nuTitle = document.createElement('h1');
    nuTitle.textContent = allHanziArray[num];
    question.append(nuTitle);
    realAnswer = allMeaningsArray[num];
    let answersArray = [];
    answersArray.push(realAnswer);
    for (let i = 0; i < 5; i++) {
        let randoNum = Math.floor(Math.random() * allHanziArray.length);
        let randoAnswer = allMeaningsArray[randoNum];
        answersArray.push(randoAnswer);
    };
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        // console.log("num is ", num);
        newDiv.addEventListener('click', (e) => {
            // console.log("num is ", num);
            handleAnswerClick1(e, num)
        })
        newDiv.classList.add('answer');
        answers.append(newDiv);
    })
    //if not correct do again
    //if answeredCorrectly = 5, add to hanzitobesaved and save that shit
};
function handleAnswerClick1(e, num) {
    let selectedAnswer = e.currentTarget.textContent;
    if (realAnswer === selectedAnswer && num == 0) {
        char0.goodAnswer();
        randomQuiz2(0);
    } else if (realAnswer !== selectedAnswer && num == 0) {
        char0.badAnswer();
        randomQuiz(0);
    } else if (realAnswer === selectedAnswer && num == 1) {
        char1.goodAnswer();
        randomQuiz2(1);
    } else if (realAnswer !== selectedAnswer && num == 1) {
        char1.badAnswer();
        randomQuiz(1);
    } else if (realAnswer === selectedAnswer && num == 2) {
        char2.goodAnswer();
        randomQuiz2(2);
    } else if (realAnswer !== selectedAnswer && num == 2) {
        char2.badAnswer();
        randomQuiz(2);
    } else if (realAnswer === selectedAnswer && num == 3) {
        char3.goodAnswer();
        randomQuiz2(3);
    } else if (realAnswer !== selectedAnswer && num == 3) {
        char3.badAnswer();
        randomQuiz(3);
    } else if (realAnswer === selectedAnswer && num == 4) {
        char4.goodAnswer();
        randomQuiz2(4);
    } else if (realAnswer !== selectedAnswer && num == 4) {
        char4.badAnswer();
        randomQuiz(4);
    }
    console.log(currentlyLearning);
}
function randomQuiz2(num) {
    //populate page
    removeAllChildren(question);
    removeAllChildren(definition);
    removeAllChildren(answers);
    let nuTitle = document.createElement('h1');
    nuTitle.textContent = allHanziArray[num];
    realAnswer = allZhuyinArray[num];
    let answersArray = [];
    answersArray.push(realAnswer);
    question.append(nuTitle);
    for (let i = 0; i < 5; i++) {
        let randoNum = Math.floor(Math.random() * allHanziArray.length);
        let randoAnswer = allZhuyinArray[randoNum];
        answersArray.push(randoAnswer);
    };
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick2(e, num)
        })
        newDiv.classList.add('answer');
        answers.append(newDiv);
    })
    //if not correct do again
    //if answeredCorrectly = 5, add to hanzitobesaved and save that shit
};
function handleAnswerClick2(e, num) {
    let selectedAnswer = e.currentTarget.textContent;
    if (realAnswer === selectedAnswer && num == 0) {
        char0.goodAnswer();
        teach(1);
    } else if (realAnswer !== selectedAnswer && num == 0) {
        char0.badAnswer();
        randomQuiz2(0);
    } else if (realAnswer === selectedAnswer && num == 1) {
        char1.goodAnswer();
        teach(2);
    } else if (realAnswer !== selectedAnswer && num == 1) {
        char1.badAnswer();
        randomQuiz2(1);
    } else if (realAnswer === selectedAnswer && num == 2) {
        char2.goodAnswer();
        teach(3);
    } else if (realAnswer !== selectedAnswer && num == 2) {
        char2.badAnswer();
        randomQuiz2(2);
    } else if (realAnswer === selectedAnswer && num == 3) {
        char3.goodAnswer();
        teach(4);
    } else if (realAnswer !== selectedAnswer && num == 3) {
        char3.badAnswer();
        randomQuiz2(3);
    } else if (realAnswer === selectedAnswer && num == 4) {
        char4.goodAnswer();
        randomQuiz3(0)
    } else if (realAnswer !== selectedAnswer && num == 4) {
        char4.badAnswer();
        randomQuiz2(3);
    }
    console.log(currentlyLearning);
}
function randomQuiz3(num) {
    //populate page
    removeAllChildren(question);
    removeAllChildren(definition);
    removeAllChildren(answers);
    let nuTitle = document.createElement('h1');
    nuTitle.textContent = allHanziArray[num];
    realAnswer = allMeaningsArray[num];
    let answersArray = [];
    answersArray.push(realAnswer);
    question.append(nuTitle);
    for (let i = 0; i < 5; i++) {
        let randoNum = Math.floor(Math.random() * allHanziArray.length);
        let randoAnswer = allMeaningsArray[randoNum];
        answersArray.push(randoAnswer);
    };
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick3(e, num)
        })
        newDiv.classList.add('answer');
        answers.append(newDiv);
    })
};
function randomQuiz4(num) {
    //populate page
    removeAllChildren(question);
    removeAllChildren(definition);
    removeAllChildren(answers);
    let nuTitle = document.createElement('h1');
    nuTitle.textContent = allHanziArray[num];
    realAnswer = allZhuyinArray[num];
    let answersArray = [];
    answersArray.push(realAnswer);
    question.append(nuTitle);
    for (let i = 0; i < 5; i++) {
        let randoNum = Math.floor(Math.random() * allHanziArray.length);
        let randoAnswer = allZhuyinArray[randoNum];
        answersArray.push(randoAnswer);
    };
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick3(e, num)
        })
        newDiv.classList.add('answer');
        answers.append(newDiv);
    })
};
function handleAnswerClick3(e, num) {
    let selectedAnswer = e.currentTarget.textContent;
    let smolRandoNum = Math.floor(Math.random() * 5);
    console.log(smolRandoNum);
    if (realAnswer === selectedAnswer && num == 0) {
        char0.goodAnswer();
        randomQuiz4(smolRandoNum);
    } else if (realAnswer !== selectedAnswer && num == 0) {
        char0.badAnswer();
        randomQuiz3(smolRandoNum);
    } else if (realAnswer === selectedAnswer && num == 1) {
        char1.goodAnswer();
        randomQuiz4(smolRandoNum);
    } else if (realAnswer !== selectedAnswer && num == 1) {
        char1.badAnswer();
        randomQuiz3(smolRandoNum);
    } else if (realAnswer === selectedAnswer && num == 2) {
        char2.goodAnswer();
        randomQuiz4(smolRandoNum);
    } else if (realAnswer !== selectedAnswer && num == 2) {
        char2.badAnswer();
        randomQuiz3(smolRandoNum);
    } else if (realAnswer === selectedAnswer && num == 3) {
        char3.goodAnswer();
        randomQuiz3(smolRandoNum);
    } else if (realAnswer !== selectedAnswer && num == 3) {
        char3.badAnswer();
        randomQuiz3(smolRandoNum);
    } else if (realAnswer === selectedAnswer && num == 4) {
        char4.goodAnswer();
        randomQuiz4(smolRandoNum);
    } else if (realAnswer !== selectedAnswer && num == 4) {
        char4.badAnswer();
        randomQuiz3(smolRandoNum);
    };

    if (char0.answeredCorrectly > 5) {
        taughtHanzi.push(char0.char);
        console.log("learned " + char0.char);
    }
    if (char1.answeredCorrectly > 5) {
        taughtHanzi.push(char1.char);
        console.log("learned " + char1.char);
    }
    if (char2.answeredCorrectly > 5) {
        taughtHanzi.push(char2.char);
        console.log("learned " + char2.char);
    }
    if (char3.answeredCorrectly > 5) {
        taughtHanzi.push(char3.char);
        console.log("learned " + char3.char);
    }
    if (char4.answeredCorrectly > 5) {
        taughtHanzi.push(char4.char);
        console.log("learned " + char4.char);
    }
    if (char0.answeredCorrectly > 5 && char1.answeredCorrectly > 5 && char2.answeredCorrectly > 5 && char3.answeredCorrectly > 5 && char3.answeredCorrectly > 5) {
        let uniqueChars = [...new Set(taughtHanzi)];
        uniqueChars.forEach(char => {
            savedHanzi.push(char);
            learnedHanzi.push(char);
        })
        saveToLocalStorage();
        location.reload();
    }
}
//teach, quiz, quiz, teach, quiz, quiz, quiz, teach, quiz, quiz, quiz, teach, quiz, quiz, quiz, teach, quiz, quiz, quiz, quiz quiz quiz...


//review initiate: pull 10 characters from review pile and do two questions each, meaning and pronunciation
function review() {
    loadSavedHanzi();
}
function loadSavedHanzi() {
    allHanziArray = [];
    allMeaningsArray = [];
    allZhuyinArray = [];
    console.log("1: ", allHanziArray);
    for (var [index, [key, value]] of Object.entries(Object.entries(hanzi1500))) {
        if (learnedHanzi.includes(key)) {
            allHanziArray.push(key);
            allZhuyinArray.push(value.zhuyin);
            allMeaningsArray.push(value.english);
        } else {
            console.log("not today")
        }
    }
    console.log("2: ", allHanziArray);
    homeBox.classList.add('hidden');
    quiz1Box.classList.remove('hidden');

    reviewQuiz();
    //make quiz and populate page
}
function reviewQuiz() {
    removeAllChildren(question);
    removeAllChildren(definition);
    removeAllChildren(answers);
    let nuBackButt = document.createElement('button');
    nuBackButt.classList.add('backHome', 'butt', 'left');
    nuBackButt.textContent = "back";
    nuBackButt.addEventListener('click', backHome);
    definition.append(nuBackButt);
    let randoNum = Math.floor(Math.random() * allHanziArray.length);
    let nuTitle = document.createElement('h1');
    nuTitle.textContent = allHanziArray[randoNum];
    realAnswer = allMeaningsArray[randoNum];
    let answersArray = [];
    answersArray.push(realAnswer);
    question.append(nuTitle);
    for (let i = 0; i < 5; i++) {
        let randoNum = Math.floor(Math.random() * allHanziArray.length);
        let randoAnswer = allMeaningsArray[randoNum];
        answersArray.push(randoAnswer);
    };
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick5(e)
        })
        newDiv.classList.add('answer');
        answers.append(newDiv);
    })
}
function handleAnswerClick5(e) {
    let selectedAnswer = e.currentTarget.textContent;
    if (realAnswer === selectedAnswer) {
        reviewQuiz2();
    } else { console.log('nope') }
}
function reviewQuiz2() {
    removeAllChildren(question);
    removeAllChildren(definition);
    removeAllChildren(answers);
    let nuBackButt = document.createElement('button');
    nuBackButt.classList.add('backHome', 'butt', 'left');
    nuBackButt.addEventListener('click', backHome);
    nuBackButt.textContent = "back";
    definition.append(nuBackButt);
    let randoNum = Math.floor(Math.random() * allHanziArray.length);
    let nuTitle = document.createElement('h1');
    nuTitle.textContent = allHanziArray[randoNum];
    realAnswer = allZhuyinArray[randoNum];
    let answersArray = [];
    answersArray.push(realAnswer);
    question.append(nuTitle);
    for (let i = 0; i < 5; i++) {
        let randoNum = Math.floor(Math.random() * allHanziArray.length);
        let randoAnswer = allZhuyinArray[randoNum];
        answersArray.push(randoAnswer);
    };
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick6(e)
        })
        newDiv.classList.add('answer');
        answers.append(newDiv);
    })
}
function handleAnswerClick6(e) {
    let selectedAnswer = e.currentTarget.textContent;
    if (realAnswer === selectedAnswer) {
        reviewQuiz();
    } else { console.log('nope') }
}
// 6 from l1, 3 from l2, and 1 from l3

//timesSeen++

//l1 characters seen once: ask again within 5 days
//l1 characters seen twice: ask again within 10 days
//l2 characters seen 3 times: ask again within 2 weeks
//l3 characters seen 4 times: ask again within 4 weeks
//l4 characters seen 5 times: LEARNED

//edit list: list of all characters
function loadList() {
    listBox.classList.remove('hidden');
    homeBox.classList.add('hidden');
    for (var [index, [key, value]] of Object.entries(Object.entries(hanzi1500))) {
        let nuDiv = document.createElement('div');
        nuDiv.id = index;
        nuDiv.append(key);
        nuDiv.classList.add('hanziCheckBox')
        nuDiv.addEventListener('click', function (e) {
            toggleLearnedTemp(e);
            listTopDisplay(e);
        });
        //if localstorage set includes index then add the selected class
        if (learnedHanzi.toString().includes(key)) {
            nuDiv.classList.add('selected');
        }
        list.append(nuDiv);
        allHanziArray.push(key);
        allZhuyinArray.push(value.zhuyin);
        allMeaningsArray.push(value.english);
    }
}
function listTopDisplay(e) {
    removeAllChildren(charDescript);
    let indexNum = e.currentTarget.id;
    charDescript.append(allZhuyinArray[indexNum], ": ", allMeaningsArray[indexNum]);
}
//mark learned function
function toggleLearnedTemp(e) {
    if (e.currentTarget.classList.contains("selected")) {
        e.currentTarget.classList.remove('selected');
        hanziToBeSaved = hanziToBeSaved.filter(ev => ev !== e.currentTarget.id);
        savedHanzi = savedHanzi.filter(ev => ev !== e.currentTarget.textContent);
    } else {
        // console.log('THIS ID is :', e.currentTarget.id)
        let indexNum = e.currentTarget.id;
        e.currentTarget.style.backgroundcolor = "grey";
        hanziToBeSaved.push(indexNum);
        e.currentTarget.classList.add('selected');
    }
}
function saveSet() {
    hanziToBeSaved.forEach(num => {
        // console.log(num);
        savedHanzi.push(allHanziArray[num]);
    });
    console.log(savedHanzi);
    saveToLocalStorage();
}
//localstorage keeps: the characters taught, character timesSeen
function saveToLocalStorage() {
    stringifiedArray = JSON.stringify(savedHanzi);
    localStorage.setItem("hanziLearned", stringifiedArray);
}
//toggle for just list of characters learned
//send back to review function

function deleteSet() {
    if (confirm('Are you sure you want to clear all data?')) {
        localStorage.removeItem("hanziLearned");
        console.log('data cleared.');
        location.reload();
    } else {
        console.log('Data not cleared.');
    }
}

//back home button
function backHome() {
    removeAllChildren(list);
    removeAllChildren(charDescript);
    listBox.classList.add('hidden');
    quiz1Box.classList.add('hidden');
    homeBox.classList.remove('hidden');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};