//import { baseUrl } from "../baseUrl";

async function CarregaPedido() {

    const response = await fetch(`https://localhost:7022/api/Comanda`);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h1 = document.createElement('h1');
        const h2 = document.createElement('h1');
        const situacao = document.createElement('h2');
        var situ = 0
        var txt = '';
        if (situ == 0) {
            txt = 'Aberta';

        } else if (situ == 1) {
            txt = 'Fechada';

        } else {
            txt = 'Cancelada';
        }
        h1.innerText = `Mesa: ${data[i].numeroMesa} \n Cliente: ${data[i].nomeCliente}`;

        data[i].itens.forEach(item => {
            h2.innerText += `\n - ${item.titulo}`;
            const pri = data[i].itens[0]
            console.log(pri.titulo);
            console.log(item.titulo);
            if (pri.titulo.toLowerCase().includes("x")) {
                img.src = "../img/ham.png"
                return;
            }
            if (pri.titulo.toLowerCase().includes("coca")) {
                img.src = "../img/refri.png"
                return;
            }
            if (pri.titulo.toLowerCase().includes("batata")) {
                img.src = "../img/batata.png"
                return;
            }
            if (pri.titulo.toLowerCase().includes("hot")) {
                img.src = "../img/hot.png"
                return;
            }
        });
        situacao.innerText = `${txt}`;
        situacao.style.color = 'green';


        li.addEventListener('click', () => {
            document.body.insertAdjacentHTML('beforeend', `
                <div class="wrapper">]
                <div class="modal">
                <button class="close-button" id="close">X</button>
                <h1>Alterar Situação</h1>
                <button id="aberta" type="submit">Aberta</button>
                <button id="fechada" type="submit">Fechada</button>
                <button id="cancelada" type="submit">Cancelada</button>
                
                </div>
                </div>
            `);
            const closeButton = document.getElementById('close');
            closeButton.addEventListener('click', () => {
                const wrapper = document.querySelector('.wrapper');
                wrapper.remove();
            });

            const abertaButton = document.getElementById('aberta');
            abertaButton.addEventListener('click', () => {
                situacao.innerText = 'Aberta';
                situacao.style.color = 'green';
            });

            const fechadaButton = document.getElementById('fechada');
            fechadaButton.addEventListener('click', () => {
                situacao.innerText = 'Fechada';
                situacao.style.color = 'orange';
            });
            const canceladaButton = document.getElementById('cancelada');
            canceladaButton.addEventListener('click', async () => {
                situacao.innerText = 'Cancelada';
                situacao.style.color = 'red';

                const delresponse = await fetch(`https://localhost:7022/api/Comanda/${data[i].id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

            });

        })





















        li.append(h1, h2, situacao, img);
        ul.appendChild(li);
    }
}
CarregaPedido();
const button = document.getElementById('+');
button.addEventListener('click', () => {
    AdicionarPedido();
});
async function AdicionarPedido() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class="wrapper">
        <div class="modal">
        <button class="close-button" id="close">X</button>
        <h1>Adicionar Pedido</h1>
        <form id="pedidoForm">
            <label for="numeroMesa">Número da Mesa:</label>
            <br>
            <input type="number" id="numeroMesa" name="numeroMesa" required>
            <br>

            <label for="nomeCliente">Nome do Cliente:</label>
            <br>

            <input type="text" id="nomeCliente" name="nomeCliente" required>
            <br>
            
            <label for="itens">Itens (separados por vírgula):</label>
            <br>
            
            <input type="text" id="itens" name="itens" required>
            <br>

            <button type="submit" id="add">Adicionar</button>

        </form>
        </div>
        </div>
    `);
    const closeButton = document.getElementById('close');
    closeButton.addEventListener('click', () => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.remove();
    });
    const nummesa = document.getElementById('numeroMesa');
    const nomecli = document.getElementById('nomeCliente');
    const itens = document.getElementById('itens');
    const add = document.getElementById('add');
    add.addEventListener('click', async (e) => {
        const listaItens = itens.value.split(",").map(x => parseInt(x));
        console.log(listaItens);
        const body = {
            numeroMesa: nummesa.value,
            nomeCliente: nomecli.value,
            cardapioItensId: listaItens
        };
        const response = await fetch(`https://localhost:7022/api/Comanda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    });


}