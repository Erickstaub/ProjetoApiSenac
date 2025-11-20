async function Carrega() {
    const resposta = await fetch("https://localhost:7022/api/CardapioItem");
    const cardapios = await resposta.json();
    console.log(cardapios);
    for (let i = 0; i < cardapios.length; i++) {
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h1 = document.createElement('h1');
        const h2 = document.createElement('h1');
        h1.innerText = cardapios[i].titulo;
        h2.innerText = "R$ " + cardapios[i].preco.toFixed(2);
        if (cardapios[i].titulo.toLowerCase().includes("x")) {
            img.src = "../img/ham.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("coca")) {
            img.src = "../img/refri.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("batata")) {
            img.src = "../img/batata.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("hot")) {
            img.src = "../img/hot.png"
        }

        li.append(img, h1, h2);
        ul.appendChild(li);
    }
}
Carrega();
function CardapioPost() {
    console.log("Botão de adicionar cardápio clicado");
}
