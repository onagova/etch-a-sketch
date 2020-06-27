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

            div.addEventListener('mouseenter', changeBackgroundColor);
    
            container.appendChild(div);
        }    
    }

    container.style.cssText = `
        grid-template-columns: repeat(${size}, 1fr);
        grid-template-rows: repeat(${size}, 1fr);
    `;

    function changeBackgroundColor(e) {
        e.target.style.backgroundColor = 'black';
    }
}

function removeChildAll(node) {
    while (node.lastElementChild) {
        node.removeChild(node.lastElementChild);
    }
}

function setupNewGridButton() {
    const btn = document.querySelector('#new-grid-btn');
    btn.addEventListener('click', promptForSize);

    function promptForSize() {
        const size = prompt('How many squares per size?', '0');

        if (size == null) return;

        if (!size || size <= 0) {
            alert('Grid cannot be empty.');
            return;
        }

        newGrid(size);
    }
}