function Home() {

    window.location.href = "/home/index.html"
}
const baseUrl = "http://localhost:7082/swagger"

const headers = {
    "content-type": "application/json; charset=utf-8"
}
async function getUsers() {
    const response = await fetch(`${baseUrl}/api/Usuario`)
    const users = await response.json()
    const nome = document.querySelector(".nome")
    const email = document.querySelector(".email")
    const senha = document.querySelector(".senha")

}
getUsers()
function init() {
    const form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        // createUser()
        // updateUser()
        // removeUser()
        // openModal()
        // if()
    })
}
