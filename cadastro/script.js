const cad = document.getElementById("Log");
cad.addEventListener("click", () => {
    Cadastrar();
});
async function Cadastrar() {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirma = document.getElementById("confirmar");
    if (senha.value !== confirma.value) {
        alert("As senhas não coincidem!");
        return;
    }
    if (nome.value.length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres!");
        return;
    }
    if (senha.value.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres!");
        return;
    }
    if (!email.value.includes("@")) {
        alert("Email inválido!");
        return;
    }
    const user = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    }
    const response = await fetch(`https://localhost:7022/api/Usuario/`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = '../login/index.html';
    } else {
        alert("Erro ao cadastrar usuário!");
    }

}