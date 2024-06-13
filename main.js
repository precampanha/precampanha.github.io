const imageFileInput = document.querySelector('#imageFileInput');
const canvas = document.querySelector('#imagem');
const imagem_exemplo = document.querySelector('#imagem_exemplo');
const btnDownload = document.querySelector('#btnDownload');
const cor = document.querySelector('#cor');

let image;
let overlay;
overlay = new Image();
overlay.src = './img/branco.png';

cor.addEventListener('change', (e) => {
    e.preventDefault();
    if (e.target.value == 'branco') {
        overlay = new Image();
        overlay.src = './img/branco.png';
    } else if (e.target.value == 'amarelo') {
        overlay = new Image();
        overlay.src = './img/amarelo.png';
    } else {
        overlay = new Image();
        overlay.src = './img/verde.png';
    }
    overlay.addEventListener(
        'load',
        () => {
            atualizaCanvas(canvas, image, overlay);
        },
        { once: true }
    );
});

imageFileInput.addEventListener('change', (e) => {
    e.preventDefault();
    const arquivos = e.target.files;

    if (arquivos.length > 0) {
        const URL = window.URL || window.webkitURL;
        const imageDataUrl = URL.createObjectURL(arquivos[0]);
        image = new Image();
        image.src = imageDataUrl;
        image.addEventListener(
            'load',
            () => {
                atualizaCanvas(canvas, image, overlay);
            },
            { once: true }
        );
    }
});

function atualizaCanvas(canvas, image, overlay) {
    const ctx = canvas.getContext('2d');

    //REDIMENSIONAMENTO
    //tamanho original da imagem
    const originalLargura = image.width;
    const originalAltura = image.height;

    //coordenadas
    let sx = 0;
    let sy = 0;
    let origemLargura = originalLargura;
    let origemAltura = originalAltura;

    //tamanho da imagem na saída
    const destinoLargura = 1000;
    const destinoAltura = 1000;

    const saidaLargura = Math.round(
        (origemAltura / destinoAltura) * destinoLargura
    );
    const saidaAltura = Math.round(
        (origemLargura / destinoLargura) * destinoAltura
    );

    if (origemLargura > saidaLargura) {
        // cortar na largura
        sx = parseInt((origemLargura - saidaLargura) / 2);
        origemLargura = saidaLargura;
    } else if (origemAltura > saidaAltura) {
        // cortar na altura
        sy = parseInt((origemAltura - saidaAltura) / 2);
        origemAltura = saidaAltura;
    }
    // Update canvas background
    canvas.width = destinoLargura;
    canvas.height = destinoAltura;

    ctx.drawImage(
        image,
        sx,
        sy,
        origemLargura,
        origemAltura,
        0,
        0,
        destinoLargura,
        destinoAltura
    );
    //OVERLAY TAMANHO E POSIÇÃO FIXOS
    ctx.drawImage(overlay, 0, 0, destinoLargura, destinoAltura);
    canvas.classList.remove('hidden');
    btnDownload.classList.remove('hidden');
    imagem_exemplo.classList.add('hidden');
}

btnDownload.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'estamos_juntos_tau.jpg';
    link.href = document.getElementById('imagem').toDataURL();
    link.click();
});
