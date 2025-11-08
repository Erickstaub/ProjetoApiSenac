var num = 1;
function Mesa() {
    var mesa = "Mesa " + num++;
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const img = document.createElement('img');
    const h1 = document.createElement('h1');
    img.src = "../img/3293741.png"
    h1.innerText = mesa;
    li.append(img, h1);
    ul.appendChild(li);
}
