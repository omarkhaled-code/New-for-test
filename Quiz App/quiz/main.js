let countSpan = document.querySelector(".count span")
let bUlletsContainer = document.querySelector(".bullets")
let myBUlletsSpan = document.querySelector(".bullets .spans")
let quizArea = document.querySelector(".quiz-area")
let answerArea = document.querySelector(".answer-area")
let button = document.querySelector(".submit-button")
let reslutContainer = document.querySelector(".results")
let countDown = document.querySelector(".count-down")
let reset = document.querySelector(".reset")
let passwordInput = document.getElementById("password")

// SET
let mainCount = 0;
let rightAnswer = 0;
let wrongAnswer = 0
let Time_Duration = 60
// alert("Are You Ready For Exam")

let results = []


function getquestions() {

    let Myreq = new XMLHttpRequest()
    Myreq.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            let Myquestions = JSON.parse(this.responseText);
            let countQues = Myquestions.length
            creatBullets(countQues)

            addQuestionData(Myquestions[mainCount], countQues)

            // Time Duration
            timeDuration(Time_Duration, countQues)

            button.onclick = function () {

                let theRightAnswer = Myquestions[mainCount].write_answer;

                mainCount++;

                getAnswer(theRightAnswer, countQues)
                quizArea.innerHTML = "";
                answerArea.innerHTML = "";

                addQuestionData(Myquestions[mainCount], countQues);


                handleBullets()

                showResult(countQues)


                // Time Duration
                clearInterval(countIntervel);
                timeDuration(Time_Duration, countQues)




            }


        }

    }
    Myreq.open("GET", "quetions.json", true);
    Myreq.send();
}
getquestions()
function creatBullets(num) {
    countSpan.innerHTML = num
    for (let i = 0; i < num; i++) {
        let span = document.createElement("span")
        if (i === 0) {
            span.className = "active";
        }
        myBUlletsSpan.appendChild(span)
    }
}
function addQuestionData(obj, count) {
    if (mainCount < count) {
        let questionTitle = document.createElement("h2")
        let questionText = document.createTextNode(obj.tiltel)
        questionTitle.appendChild(questionText)

        quizArea.appendChild(questionTitle)
        for (let i = 1; i <= 4; i++) {
            let mainDiv = document.createElement("div")
            mainDiv.className = "answer"
            let radioBtn = document.createElement("input")
            // Create Radio
            radioBtn.name = "question"
            radioBtn.type = "radio"
            radioBtn.id = `answer_${i}`
            radioBtn.dataset.answer = obj[`answer_${i}`]

            // Create Label
            let label = document.createElement("label")
            let labelText = document.createTextNode(obj[`answer_${i}`])
            label.appendChild(labelText)
            label.htmlFor = `answer_${i}`

            // Append Element To Main Dive

            mainDiv.appendChild(radioBtn)
            mainDiv.appendChild(label)

            // Append Element To Main Dive
            answerArea.appendChild(mainDiv)

        }
    }
}


function getAnswer(rAnswer, count) {
    let answer = document.getElementsByName("question")
    let checkedAnswer;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].checked) {
            checkedAnswer = answer[i].dataset.answer
        }
    }


    if (rAnswer === checkedAnswer) {
        rightAnswer++
    } else {
        wrongAnswer++
    }
}

function handleBullets() {
    let bulletSpan = document.querySelectorAll(".bullets .spans span")
    let arryOfSpans = Array.from(bulletSpan)

    arryOfSpans.forEach((span, index) => {
        if (mainCount === index) {
            span.className = "active"
        }
    })
}



let password = window.localStorage.getItem("code")

function showResult(count) {
    let theRueslt;
    if (mainCount === count) {
        quizArea.remove()
        answerArea.remove()
        button.remove()
        bUlletsContainer.remove()
        reslutContainer.classList.add("result")

        jsonFile()

        if (rightAnswer > (count / 2) && rightAnswer < count) {
            theRueslt = `<span class="good">Good Your Reslut Is</span> ${rightAnswer} <span class="from">From</span> ${count}`
        } else if (rightAnswer === count) {
            theRueslt = `<span class="perfect">Perfect Your Reslut Is</span> ${rightAnswer} <span class="from">From</span> ${count}`
        } else {
            theRueslt = `<span class="bad">Bad Your Reslut Is</span> ${rightAnswer} <span class="from">From</span> ${count}`
        }

        reslutContainer.innerHTML = theRueslt;
        console.log(`your code is [ ${password} ] and your result is ${rightAnswer}`)


        window.localStorage.setItem(password, rightAnswer)
        // console.log(password)

    }

}

function jsonFile() {
    const user = {
        code: password,
        result: rightAnswer
    }


    const users = JSON.parse(localStorage.getItem('users') || '[]');

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users))

    results.push(users)

}


function timeDuration(duration, count) {
    if (mainCount < count) {
        let menutis, seconds;

        countIntervel = setInterval(function () {
            menutis = parseInt(duration / 60)
            seconds = parseInt(duration % 60)

            menutis = menutis < 10 ? `0${menutis}` : menutis;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countDown.innerHTML = `${menutis}:${seconds}`

            if (--duration < 0) {
                clearInterval(countIntervel);
                button.click()
            }
        }, 1000)
    }
}

window.addEventListener("beforeunload", () => {
    event.preventDefault();
    event.returnValue = "Sure";
}
)


window.onload = () => {
    if (window.localStorage.getItem(password)) {
        alert(`your do this before and your result is [ ${window.localStorage.getItem(password)} ]`)
        window.location.replace("../sign/sign.html")

    } else {
        console.log("Hi")
    }
}






