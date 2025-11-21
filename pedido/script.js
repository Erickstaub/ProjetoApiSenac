async function CarregaPedido() {
    const response = await fetch('https://localhost:7022/api/Comanda');
    const data = await response.json();
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const img = document.createElement('img');
    const h1 = document.createElement('h1');
    h1.innerText = `Mesa: ${data.mesaId} \n Cliente: ${data.clienteNome} \n Situação: ${data.situaçãoComanda}`;
    li.appendChild(h1);
    ul.appendChild(li);
}
CarregaPedido();