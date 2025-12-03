import { baseUrl } from "../baseUrl";

async function CarregaPedido() {
    const response = await fetch(`${baseUrl}/api/Comanda`);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h1 = document.createElement('h1');
        const h2 = document.createElement('h1');
        var situ = data[i].situaçãoComanda;
        var txt = '';
        if (situ == 0) {
            txt = 'Aberta';

        } else if (situ == 1) {
            txt = 'Fechada';

        } else {
            txt = 'Cancelada';
        }
        h1.innerText = `Mesa: ${data[i].mesaId} \n Cliente: ${data[i].clienteNome} \n Situação: ${txt}`;

        li.append(h1, h2);
        ul.appendChild(li);
    }
}
CarregaPedido();