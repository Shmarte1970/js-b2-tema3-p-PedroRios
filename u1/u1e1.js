// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md



// A. Función getItems
function getItems() {
    const nodes = document.querySelectorAll('.js-item');
    return Array.from(nodes).map(node => ({
        id: node.getAttribute('data-id'),
        es: node.getAttribute('data-es'),
        en: node.getAttribute('data-en'),
    }));
}

// B. Función emptyList
function emptyList() {
    document.querySelector('.js-list').innerHTML = '';
}

// C. Función renderList
function renderList(itemList, lang) {
    emptyList();
    const list = document.querySelector('.js-list');
    itemList.forEach(item => {
        const li = document.createElement('li');
        li.className = 'js-item';
        li.setAttribute('data-id', item.id);
        li.setAttribute('data-es', item.es);
        li.setAttribute('data-en', item.en);
        li.textContent = item[lang];
        list.appendChild(li);
    });
}

// D. Función updateItemStyle
function updateItemStyle(idItem) {
    const node = document.querySelector(`.js-item[data-id="${idItem}"]`);
    if (node) node.classList.add('highlight');
}

// E. Aplicar código
const words = getItems();
renderList(words, 'en');
updateItemStyle('2');
updateItemStyle('4');
