async function Carrega() {
    const response = await fetch(`https://localhost:7022/api/Funcionario`);
    const funci = await response.json();
    for (let i = 0; i < funci.length; i++) {
        const ul = document.querySelector('ul');
        const img = document.createElement("img")
        const li = document.createElement("li")
        const nome = document.createElement("h2")
        const funcao = document.createElement("h1")
        const salario = document.createElement("h3")
        nome.innerText = funci[i].nome
        funcao.innerText = funci[i].cargo
        salario.innerText = "R$" + funci[i].salario
        if (funcao.textContent == "cozinheiro") {
            img.src = "/img/cozinheiro.png"
        } else if (funcao.textContent == "atendente") {
            img.src = "/img/atendente.png"
        } else if (funcao.textContent == "garcon") {
            img.src = "/img/garcon.png"
        } else if (funcao.textContent == "gerente") {
            img.src = "/img/gerente.png"
        }
        li.addEventListener("click", async () => {
            document.body.insertAdjacentHTML('beforeend', `
                <div class="wrapper">
                <div class="modal">
                <button class="close-button" id="close">X</button>
                <h1 id="h1"></h1>
                <br>
                <form>
               <h1>Cargo:</h1>
                <br>
                <label>
                 <input type="radio" name="cargo" id="1" value="gerente" required>
                    Gerente
                    </label>
                <br>
                <label>
                 <input type="radio" name="cargo" id="2" value="cozinheiro">
            Cozinheiro
            </label>
                <br>
            <label>
            <input type="radio" name="cargo" id="3" value="garcon">
             Garçom
            </label>
                <br>
            <label>
             <input type="radio" name="cargo" id="4" value="atendente">
             Atendente
            </label>
                <br>
                <h2>novo salario:</h2>
                <input type="number" id="number" name="salario" required>
                <br>
                <button type="submit"id="done">Salvar</button>
                </form>
                </div>
                </div>
            `)
            const sair = document.getElementById("close")
            sair.addEventListener("click", () => {
                const wrapper = document.querySelector('.wrapper');
                wrapper.remove()
            })
            const h1 = document.getElementById("h1")
            const salario = document.getElementById("number")
            h1.innerText = funci[i].nome + "\n" + funci[i].cargo
            salario.value = funci[i].salario
            let cargo = 0
            if (funci[i].cargo == "gerente") {
                cargo = 1
            } else if (funci[i].cargo == "cozinheiro") {
                cargo = 2
            } else if (funci[i].cargo == "garcon") {
                cargo = 3
            } else if (funci[i].cargo == "atendente") {
                cargo = 4
            }

            const radio = document.getElementById(`${cargo}`)
            radio.checked = true
            const done = document.getElementById("done")
            done.addEventListener("click", () => {
                async function edita() {
                    const radios = await document.querySelector('input[name="cargo"]:checked').value
                    console.log(radios)
                    const body = {
                        nome: funci[i].nome,
                        cargo: radios,
                        salario: salario.value

                    }
                    const putResponse = await fetch(`https://localhost:7022/api/Funcionario/${funci[i].id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });

                }
                edita()


            })


        })

        li.addEventListener('mousedown', () => {

            timer = setTimeout(() => {
                li.style.border = "1px solid red"
                li.style.boxShadow = "0px 0px 0px 1px red"
                document.body.insertAdjacentHTML('beforeend', `
    <div class="wrapper">
    <div class="modal">
    <button class="close-button" id="close">X</button>
            <h1>Deseja Demitir?</h1>
            <form>
                <button type="submit" id="sim">SIM</button>
                <button type="submit" id="nao">NÂO</button>
            </form>
    </div>
</div>
`)
                const air = document.getElementById("close")
                air.addEventListener("click", () => {
                    const wrapper = document.querySelector('.wrapper');
                    wrapper.remove()
                    li.style.border = "1px solid black"
                    li.style.boxShadow = "0px 0px 0px 1px #2c2c2c"
                })
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
                        id: funci[i].id
                    };
                    const putResponse = await fetch(`https://localhost:7022/api/Funcionario/${funci[i].id}`, {
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
        li.append(funcao, img, nome, salario)
        ul.append(li)



    }
}
Carrega()

async function addFuncionario() {
    document.body.insertAdjacentHTML('beforeend', `
                <div class="wrapper">
                <div class="modal">
                <button class="close-button" id="close">X</button>
                <h1 id="h1">Novo Funcionario</h1>
                <br>
                <form>
                <h1>Nome:</h1>
                <br>
                <input type="text" name="nome" id="nome" required>
               <h1>Cargo:</h1>
                <br>
                <label>
                 <input type="radio" name="cargo" id="1" value="gerente" required>
                    Gerente
                    </label>
                <br>
                <label>
                 <input type="radio" name="cargo" id="2" value="cozinheiro">
            Cozinheiro
            </label>
                <br>
            <label>
            <input type="radio" name="cargo" id="3" value="garcon">
             Garçom
            </label>
                <br>
            <label>
             <input type="radio" name="cargo" id="4" value="atendente">
             Atendente
            </label>
                <br>
                <h2>novo salario:</h2>
                <input type="number" id="number" name="salario" required>
                <br>
                <button type="submit" id="done">Salvar</button>
                </form>
                </div>
                </div>
            `)
    const done = document.getElementById("done")
    done.addEventListener("click", () => {
        async function salva() {

            const salario = document.getElementById("number").value
            const nome = document.getElementById("nome").value
            const cargo = document.querySelector('input[name="cargo"]:checked').value;
            if (salario != null && nome != null && cargo != null) {
                const body = {
                    nome: nome,
                    cargo: cargo,
                    salario: salario

                }
                const response = await fetch(`https://localhost:7022/api/Funcionario`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                if (post.ok) {
                    console.log("Mesa adicionada com sucesso!");



                } else {
                    console.error("Erro ao adicionar mesa.");
                }
            }
        }
        salva()
    })



}