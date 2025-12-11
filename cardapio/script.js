import { baseUrl } from "../baseUrl.js";

async function Carrega() {
    const response = await fetch(`${baseUrl}/api/CardapioItem`);
    const cardapios = await response.json();
    console.log(cardapios);
    for (let i = 0; i < cardapios.length; i++) {
        let p = 0
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h1 = document.createElement('h1');
        const h2 = document.createElement('h1');
        h1.innerText = cardapios[i].titulo;
        h2.innerText = "R$ " + cardapios[i].preco.toFixed(2);
        if (cardapios[i].titulo.toLowerCase().includes("x")) {
            img.src = "../img/ham.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("coca") || cardapios[i].titulo.toLowerCase().includes("pepsi") || cardapios[i].titulo.toLowerCase().includes("refri") || cardapios[i].titulo.toLowerCase().includes("guarana")) {
            img.src = "../img/refri.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("batata")) {
            img.src = "../img/batata.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("hot") || cardapios[i].titulo.toLowerCase().includes("dog")) {
            img.src = "../img/hot.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("merda")) {
            img.src = "../img/merda.jpg"
        } else if (cardapios[i].titulo.toLowerCase().includes("pizza")) {
            img.src = "../img/pizza.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("marmita") || cardapios[i].titulo.toLowerCase().includes("prato feito")) {
            img.src = "../img/marmita.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("sushi") || cardapios[i].titulo.toLowerCase().includes("japones")) {
            img.src = "../img/sushi.png"


        } else if (cardapios[i].titulo.toLowerCase().includes("churrasco")) {
            img.src = "../img/churrasco.png"
        } else if (cardapios[i].titulo.toLowerCase().includes("67")) {
            img.src = "../img/67.png"
        }
        li.addEventListener('mouseenter', (e) => {
            console.log("aaaaaa")
            document.body.insertAdjacentHTML('beforeend', `
        <div class="deswrapper">
        <div class="desmodal">
      
                <h1 id="produto"></h1>
                <h2 id="descr"></h2>
        </div>
    </div>
    `);
            const prod = document.getElementById('produto')
            const desc = document.getElementById('descr')


            prod.innerText = cardapios[i].titulo
            desc.innerText = cardapios[i].descricao

        });
        li.addEventListener('mouseleave', () => {
            const wrapper = document.querySelector('.deswrapper');
            wrapper.remove()
        })
        //feito por erick na baia dele
        li.addEventListener('mousedown', () => {

            timer = setTimeout(() => {
                li.style.border = "1px solid red"
                li.style.boxShadow = "0px 0px 0px 1px red"
                document.body.insertAdjacentHTML('beforeend', `
    <div class="wrapper">
    <div class="modal">
    <button class="close-button" id="close">X</button>
            <h1>Deseja Deletar?</h1>
            <form>
                <button type="submit" id="sim">SIM</button>
                <button type="submit" id="nao">NÂO</button>
            </form>
    </div>
</div>
`)
                const nao = document.getElementById("nao")
                nao.addEventListener("click", () => {
                    const wrapper = document.querySelector('.wrapper');
                    wrapper.remove()
                    li.style.border = "1px solid black"
                    li.style.boxShadow = "0px 0px 0px 1px #2c2c2c"
                })
                const sair = document.getElementById("close")
                sair.addEventListener("click", () => {
                    const wrapper = document.querySelector('.wrapper');
                    wrapper.remove()
                    li.style.border = "1px solid black"
                    li.style.boxShadow = "0px 0px 0px 1px #2c2c2c"
                })
                const sim = document.getElementById("sim")
                sim.addEventListener("click", async () => {
                    const putBody = {
                        id: cardapios[i].id
                    };
                    const putResponse = await fetch(`https://localhost:7022/api/CardapioItem/${cardapios[i].id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(putBody)
                    })
                    li.style.border = "1px solid black"
                    li.style.boxShadow = "0px 0px 0px 1px #2c2c2c"
                })
            }, 600)
        })
        li.addEventListener("mouseup", () => {
            clearTimeout(timer);
        })








        //




        li.append(img, h1, h2);
        ul.appendChild(li);
    }
}
Carrega();


const button = document.getElementById('+');
button.addEventListener('click', () => {
    CardapioPost();
});

async function CardapioPost() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class="wrapper">
        <div class="modal">
        <button class="close-button" id="close">X</button>
                <h1>Adicionar Item ao Cardápio</h1>
                <form>
                    <label for="titulo">Título:</label>
                    <input type="text" id="titulo" name="titulo" required>
                    <label for="descricao">Descrição:</label>
                    <input type="text" id="descricao" name="descricao" required>
                    <label for="preco">Preço:</label>
                    <input type="number" id="preco" name="preco" step="0.01" required>
                    <label for="pp">Possui Preparo?</label>
                    <input type="checkbox" id="pp" name="pp">
                    <button type="submit" id="add">Adicionar</button>
                </form>
        </div>
    </div>
    `)
    const closeButton = document.getElementById('close');
    closeButton.addEventListener('click', () => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.remove()
    });
    const add = document.getElementById('add');
    add.addEventListener('click', async (e) => {
        e.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const pp = document.getElementById('pp').checked;
        const body = {
            titulo: titulo,
            descricao: descricao,
            preco: preco,
            possuiPreparo: pp
        };
        const response = await fetch('https://localhost:7022/api/CardapioItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }); if (response.ok) {
            alert('Item adicionado com sucesso!');
            location.reload();
        } else {
            alert('Erro ao adicionar item.');
        }
    });
}
