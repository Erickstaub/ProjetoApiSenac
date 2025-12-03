function Home() {
    window.location.href = "./home/index.html"
}


async function Login() {

    const emailInput = document.querySelector('#email');
    const senhaInput = document.querySelector('#senha');
    const user = {
        email:emailInput.value,
        senha:senhaInput.value
    }
        const response = await fetch(`https://localhost:7022/api/Usuario/Login`,{
            method:"POST",
            body:JSON.stringify(user),
             headers: {
                        'Content-Type': 'application/json'
                    },
        });
        if(response.ok){
            Home();
        }else{
            //abrir modal informando que deu errado
        }
        //const res = await response.json()

}

// se o login deu certo
//Home();