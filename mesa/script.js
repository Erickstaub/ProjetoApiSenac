var num = 1;
// function Mesa() {
//     var mesa = "Mesa " + num++;
//     const ul = document.querySelector('ul');
//     const li = document.createElement('li');
//     const img = document.createElement('img');
//     const h1 = document.createElement('h1');
//     const h2 = document.createElement('h1');
//     var sorte = Math.floor(Math.random() * 4);
//     if (sorte == 0) {
//         img.src = "../img/mesa1.png"
//     }
//     else if (sorte == 1) {
//         img.src = "../img/mesa2.png"
//     }
//     else if (sorte == 2) {
//         img.src = "../img/mesa3.png"
//     }
//     else {
//         img.src = "../img/mesa4.png"
//     }
//     h1.innerText = mesa;
//     h2.innerText = "disponível";
//     h2.style.color = "green";
//     li.append(img, h1, h2);
//     ul.appendChild(li);

// }
async function Carega() {
    const baseUrl = "http://localhost:7022";
    const response = await fetch(`https://localhost:7022/api/Mesa`);
    const mesas = await response.json();
    console.log(mesas);
    for (let i = 0; i < mesas.length; i++) {
        var mesa = "Mesa " + num++;
        const ul = document.querySelector('ul');
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

        let a = 0;
        li.addEventListener('click', () => {
            if (a == 0) {
                li.style.height = "450px";
                const dis = document.createElement('button')
                const ocu = document.createElement('button')
                const res = document.createElement('button')
                dis.innerText = "Disponível"
                ocu.innerText = "Ocupada"
                res.innerText = "Reservada"
                li.append(dis);
                li.append(ocu);
                li.append(res);
                a = 1;

            } else {
                li.style.height = "400px";
                li.removeChild(li.lastChild);
                li.removeChild(li.lastChild);
                li.removeChild(li.lastChild);
                a = 0;
            }
            console.log(a);


        });

        li.append(img, h1, h2);
        ul.appendChild(li);

    }
}
Carega();
async function Mesapost() {
    var nummesa = num++;
    var mesa = "Mesa " + nummesa;
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.addEventListener('click', () => {
        let sm = 0;
        if (sm == 0) {
            li.style.backgroundColor = "lightgreen";
        }



    });
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
    h2.innerText = "disponível";
    h2.style.color = "green";
    li.append(img, h1, h2);
    ul.appendChild(li);
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
    if (!post.ok) {
        console.log("Mesa adicionada com sucesso!");
    } else {
        console.error("Erro ao adicionar mesa.");
    }


}


