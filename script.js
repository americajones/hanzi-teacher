const homeBox = document.querySelector(".home-page");
const quiz1Box = document.querySelector(".quiz1Page");
const listBox = document.querySelector(".characterListPage");
const charDescript = document.querySelector(".charDescription");
const learnedNumber = document.querySelector(".learnedNumber");
const secondNumber = document.querySelector(".secondNumber");
const list = document.querySelector(".list");
let savedHanzi = [];
let learnedHanzi = [];
let hanziToBeSaved = [];

let allHanziArray = [];
let allMeaningsArray = [];
let allZhuyinArray = [];
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
}
//opening choices: learn new or review or (small) edit list

//learn new initiate: pull five characters from the unlearned array, show off then initiate intro quiz
function learnNew() {
    allHanziArray = [];
    allMeaningsArray = [];
    allZhuyinArray = [];
    loadNewHanzi();
}
function loadNewHanzi() {
    console.log("1: ", allHanziArray);
    for (var [index, [key, value]] of Object.entries(Object.entries(hanzi1500))) {
        if (learnedHanzi.includes(key)) {
            console.log("not today")
        } else {
            allHanziArray.push(key);
            allZhuyinArray.push(value.zhuyin);
            allMeaningsArray.push(value.english);
        }
    }
    console.log("2: ", allHanziArray);
    homeBox.classList.add('hidden');
    //make quiz and populate page
    quiz1Box.classList.remove('hidden');
}
//show off: introduce the character- pronounce, definition

//random quiz--must get correct 5 times to log character for the day- if answeredCorrectly < 5, ask another

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
    //make quiz and populate page
    quiz1Box.classList.remove('hidden');
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