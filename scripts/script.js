createGrid(16);

function createGrid(size) {
    const container = document.querySelector('.grid-container');

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
}

function changeBackgroundColor(e) {
    e.target.style.backgroundColor = 'black';
}