

function Home() {
    window.location.href = '../home/index.html';
}

const loginButton = document.getElementById('Log');
loginButton.addEventListener('click', () => {
    Login();
});
async function Login() {

    const emailInput = document.querySelector('#email');
    const senhaInput = document.querySelector('#senha');
    const user = {
        email: emailInput.value,
        senha: senhaInput.value
    }
    const response = await fetch(`https://localhost:7022/api/Usuario/Login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        Home();
    } else {
        //abrir modal informando que deu errado
        alert("Login ou senha incorretos!");
        //ERICK COMENTOU AQUI PRA NAO DAR ERRO
        // document.body.insertAdjacentHTML('beforeend', `
        // <div class="wrapper">
        // <div class="modal">
        // <button class="close-button" id="close">X</button>
        // <h1>Cadastre a sua Reserva!</h1>
        // <form>
        // <label>Nome:</label>
        //     <input type="text" id="nome" name="nome" required>
        //     <label>Telefone:</label>
        //     <input type="text" id="telefone" name="telefone" required>
        //     <label>Data:</label>
        //     <input type="date" id="date" name="data" required>
        //     <button type="submit" id="done">RESERVAR</button>
        // </form>
        // </div>
        // </div>
        // `)
    }
    //const res = await response.json()

}

// se o login deu certo
//Home();