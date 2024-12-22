const alf = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const inputPrimario = document.getElementById('input-primero');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('texto-cifrado');
const rango = document.getElementById('rango');

const encriptarMensaje = () => {
    const stringAEncriptar = [...inputPrimario.value.toUpperCase()];
    encriptarString(0,stringAEncriptar);
}

const encriptarString = (indexActual, stringAEncriptar) => {
    if (stringAEncriptar.length === indexActual) return;
    inputPrimario.value = inputPrimario.value.substring(1);
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animarChar(spanChar)
        .then( () => {
            const charSinModificar = stringAEncriptar[indexActual];
            spanChar.innerHTML = alf.includes(charSinModificar) ?
            alf[((alf.indexOf(charSinModificar) + parseInt(rango.value)) % alf.length + alf.length) % alf.length] :
                charSinModificar
            encriptarString(indexActual + 1, stringAEncriptar)
        });
}

const animarChar = spanChar => {
    let cambiosLetra = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alf[Math.floor(Math.random() * alf.length)];
            cambiosLetra++;
            if(cambiosLetra === 4) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}

const submit = e => {
    e.preventDefault();
    resultado.innerHTML = '';
    encriptarMensaje();
}

cifrador.onsubmit = submit;