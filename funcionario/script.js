async function Carrega() {
    const response = await fetch(`https://localhost:7022/api/Usuario`);
    const usuario = await response.json();
    for (let i = 0; i < usuario.length; i++) {
        const ul = document.querySelector('ul');
        const img = document.createElement("img")
        const li = document.createElement("li")
        const nome = document.createElement("h2")
        const funcao = document.createElement("h1")
        const salario = document.createElement("h3")
        nome.innerText = usuario[i].nome
        funcao.innerText = usuario[i].email
        salario.innerText = "R$" + usuario[i].senha
        if (funcao.textContent == "cozinheiro") {
            img.src = "/img/cozinheiro.png"
        } else if (funcao.textContent == "atendente") {
            img.src = "/img/atendente.png"
        } else if (funcao.textContent == "garcon") {
            img.src = "/img/garcon.png"
        } else if (funcao.textContent == "gerente") {
            img.src = "/img/gerente.png"
        }
        li.append(funcao, img, nome, salario)
        ul.append(li)



    }
}
Carrega()