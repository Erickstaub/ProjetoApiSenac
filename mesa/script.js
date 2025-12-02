import { baseUrl } from "../baseUrl.js";

var num = 1;
async function Carega() {
    const response = await fetch(`${baseUrl}/api/Mesa`);
    const mesas = await response.json();
    console.log(mesas);
    const ul = document.querySelector('ul');
    const toggleButtons = (li, h2, sm, idm) => {
        const buttonsPresent = li.children.length === 4;
        if (buttonsPresent) {
            li.removeChild(li.lastChild);
            li.style.height = "400px";
            return;
        }
        const dis = document.createElement('button');
        const ocu = document.createElement('button');
        const res = document.createElement('button');
        const li2 = document.createElement('div')
        li2.classList.add('li2')
        dis.classList.add('dis')
        ocu.classList.add('ocu')
        res.classList.add('res')
        li2.append(dis, ocu, res)
        dis.innerText = "Disponível";
        ocu.innerText = "Ocupada";
        res.innerText = "Reservada";
        li.style.height = "450px";
        dis.addEventListener('click', async (e) => {
            e.stopPropagation();
            li.removeChild(li2);
            li.style.height = "400px";
            h2.innerText = "Disponível";
            h2.style.color = "green";
            async function upMesao() {
                const putBody = {
                    id: idm,
                    situaçãoMesa: 0,
                    numeroMesa: idm
                };
                const putResponse = await fetch(`https://localhost:7022/api/Mesa/${idm}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(putBody)
                });
                const res = await fetch(`https://localhost:7022/api/Reserva`);
                const reserva = await res.json()
                console.log(reserva, "reservas", mesas, idm)
                const findReserva = reserva.find((item) => {
                    return item.numeroMesa === idm
                })
                console.log(findReserva, "fidmesa")
                if (findReserva) {
                    const delresponse = await fetch(`https://localhost:7022/api/Reserva/${findReserva.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                }
            }
            upMesao();
        });
        ocu.addEventListener('click', async (e) => {
            e.stopPropagation();
            li.removeChild(li2);
            li.style.height = "400px";
            h2.innerText = "Ocupada";
            h2.style.color = "red";
            console.log(idm)
            async function upMesaocu() {
                const putBody = {
                    id: idm,
                    situaçãoMesa: 1,
                    numeroMesa: idm
                };
                const putResponse = await fetch(`https://localhost:7022/api/Mesa/${idm}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(putBody)
                });
            }
            upMesaocu();
            ocu.style.backgroundColor = "red"
        });

        res.addEventListener('click', async (e) => {
            document.body.insertAdjacentHTML('beforeend', `
<div class="reswrapper">
<div class="resmodal">
<button class="close-button" id="close">X</button>
<h1>Cadastre a sua Reserva!</h1>
<form>
   <label>Nome:</label>
    <input type="text" id="nome" name="nome" required>
    <label>Telefone:</label>
    <input type="text" id="telefone" name="telefone" required>
    <label>Data:</label>
    <input type="date" id="date" name="data" required>
    <button type="submit" id="done">RESERVAR</button>
</form>
</div>
</div>
`)
            //"2025-11-28T23:17:34.216Z"
            const but = document.getElementById("done")
            but.addEventListener("click", () => {
                let data = document.getElementById("date").value
                let nome = document.getElementById("nome").value
                let telefone = document.getElementById("telefone").value
                let date = data + "T00:00:00.000Z"
                console.log(date)
                upMesare(nome, telefone, date, idm)
                h2.innerText = "Reservada";
                h2.style.color = "orange";
            })
            const sair = document.getElementById("close")
            sair.addEventListener("click", () => {
                const wrapper = document.querySelector('.reswrapper');
                wrapper.remove()
            })
            e.stopPropagation();
            li.removeChild(li2);
            li.style.height = "400px";
            async function upMesare(nome, telefone, date, idm) {
                const putBody = {
                    nomeCliente: nome,
                    numeroMesa: idm,
                    telefone: telefone,
                    _dataHoraReserva: date
                };
                const putResponse = await fetch(`https://localhost:7022/api/Reserva`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(putBody)
                });
            }
        });
        li.append(li2);
        console.log(li.children)
    }
    for (let i = 0; i < mesas.length; i++) {
        var mesa = "Mesa " + num++;
        const li = document.createElement('li');
        const img = document.createElement('img');
        const h1 = document.createElement('h1');
        const h2 = document.createElement('h1');
        var sorte = Math.floor(Math.random() * 4);
        if (sorte == 0) {
            img.src = "../img/mesa1.png"
        }
        else if (sorte == 1) {
            img.src = "../img/mesa2.png"
        }
        else if (sorte == 2) {
            img.src = "../img/mesa3.png"
        }
        else {
            img.src = "../img/mesa4.png"
        }
        h1.innerText = mesa;
        var sm = mesas[i].situaçãoMesa;
        if (sm == 0) {
            h2.innerText = "Disponível";
            h2.style.color = "green";
        }
        else if (sm == 1) {
            h2.innerText = "Ocupada";
            h2.style.color = "red";
        } else {
            h2.innerText = "Reservada";
            h2.style.color = "orange";
        }
        li.addEventListener('click', () => {
            let idm = mesas[i].id
            toggleButtons(li, h2, sm, idm);
        });
        let timer
        li.addEventListener('mousedown', () => {
            let idm = mesas[i].id
            timer = setTimeout(() => {
                li.style.border = "1px solid red"
                li.style.boxShadow = "0px 0px 0px 1px red"
                document.body.insertAdjacentHTML('beforeend', `
        <div class="wrapper">
        <div class="modal">
        <button class="close-button" id="close">X</button>
                <h1>Deseja Deletar a Mesa?</h1>
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
                        id: idm
                    };
                    const putResponse = await fetch(`https://localhost:7022/api/Mesa/${idm}`, {
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
        li.append(img, h1, h2);
        ul.appendChild(li);
    }
}
Carega();
async function Mesapost() {
    var nummesa = num++;

    const baseUrl = "http://localhost:7022";
    const body = {
        numeroMesa: nummesa,
        situacao: 0
    };
    const post = await fetch(`https://localhost:7022/api/Mesa`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    // Sua lógica de verificação de sucesso estava invertida (OK é sucesso)
    if (post.ok) {
        console.log("Mesa adicionada com sucesso!");
        alert("Mesa " + nummesa + " foi adsonada com sucesso!" + "\n" + "Porfavor reinicie a pagina")

    } else {
        console.error("Erro ao adicionar mesa.");
    }
}