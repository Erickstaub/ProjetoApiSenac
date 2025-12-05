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
  <input type="radio" name="cargo" value="gerente" required>
  Gerente
</label>
                <br>

<label>
  <input type="radio" name="cargo" value="cozinheiro">
  Cozinheiro
</label>
                <br>

<label>
  <input type="radio" name="cargo" value="garcon">
  Garçom
</label>
                <br>

<label>
  <input type="radio" name="cargo" value="atendente">
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
            const h1 = document.getElementById("h1")
            const salario = document.getElementById("salario")
            h1.innerText = funci[i].nome + "\n" + funci[i].cargo


        })
        li.append(funcao, img, nome, salario)
        ul.append(li)



    }
}
Carrega()