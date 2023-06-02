
// let button= document.querySelector(".button")
let inputText = document.querySelector("#text")
let inputPassword = document.querySelector("#password")
let submit = document.querySelector("#submit")



submit.onclick = () => {


    if (inputPassword.value !== "" && inputText.value !== "") {
        userName = inputText.value
        array = inputPassword.value


        // window.localStorage.setItem(userName, userName)

        if (window.localStorage.getItem("code") !== inputPassword.value) {
            window.localStorage.setItem("code", array)
            window.location.replace("../quiz/quizNumberX19.html")
        } else {
            alert("you sign in before")
        }
    }
}
///// Create  Hide And Show Button

let hide = document.querySelector(".hide")
let show = document.querySelector(".show")


inputPassword.oninput = () => {
    if (inputPassword.value !== "") {
        show.style.display = "inline"
    } else {
        show.style.display = "none"
    }
}


show.onclick = () => {
    inputPassword.setAttribute("type", "text")
    show.style.display = "none"
    hide.style.display = "inline"
}



hide.onclick = () => {
    inputPassword.setAttribute("type", "password")
    show.style.display = "inline"
    hide.style.display = "none"
}