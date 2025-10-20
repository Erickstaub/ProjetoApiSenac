const baseUrl = "http://localhost:7082"

const headers ={
            "content-type":	"application/json; charset=utf-8"
        }
async function getUsers(){
    const response = await fetch(`${baseUrl}/users`)
    const users = await response.json()

}