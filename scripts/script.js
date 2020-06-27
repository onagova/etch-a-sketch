newGrid(16);
setupNewGridButton();

function newGrid(size) {
    const container = document.querySelector('.grid-container');

    removeChildAll(container);

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const div = document.createElement('div');

            if (j == size - 1) {
                div.classList.add('no-border-right');
            }
    
            if (i == size - 1) {
                div.classList.add('no-border-bottom');
            }

            div.addEventListener('mouseenter', shadeNode);
    
            container.appendChild(div);
        }    
    }

    container.style.cssText = `
        grid-template-columns: repeat(${size}, 1fr);
        grid-template-rows: repeat(${size}, 1fr);
    `;

    function shadeNode(e) {
        let hsl;
        let rgb = e.target.style.backgroundColor;

        if (!rgb) {
            const hue = getRandomInteger(360);
            hsl = [hue, 100, 100];
        } else {
            rgb = rgb.slice(rgb.indexOf('(') + 1, rgb.lastIndexOf(')'));
            rgb = rgb.split(',');

            hsl = convertRGBToHSL(rgb);
        }

        hsl[2] = (hsl[2] > 10) ? hsl[2] - 10 : 0;

        e.target.style.backgroundColor = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    }
}

function setupNewGridButton() {
    const btn = document.querySelector('#new-grid-btn');
    btn.addEventListener('click', promptForSize);

    function promptForSize() {
        let size = prompt('How many squares per size?', '0');

        if (size == null) return;

        size = Number(size);

        if (isNaN(size)) {
            alert('Please enter a number.');
            return;
        } else if (size <= 0) {
            alert('Grid cannot be empty.');
            return;
        }

        newGrid(size);
    }
}

function removeChildAll(node) {
    while (node.lastElementChild) {
        node.removeChild(node.lastElementChild);
    }
}

function convertRGBToHSL(rgb) {
    const rPrime = rgb[0] / 255;
    const gPrime = rgb[1] / 255;
    const bPrime = rgb[2] / 255;
    const cMax = Math.max(rPrime, gPrime, bPrime);
    const cMin = Math.min(rPrime, gPrime, bPrime);
    const delta = cMax - cMin;

    const h = (delta == 0) ? 0 :
            (cMax == rPrime) ? 60 * ((gPrime - bPrime) / delta % 6) :
            (cMax == gPrime) ? 60 * ((bPrime - rPrime) / delta + 2) :
            60 * ((rPrime - gPrime) / delta + 4);

    const l = (cMax + cMin) / 2;

    const s = (delta == 0) ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function getRandomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}