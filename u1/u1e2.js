// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e2.md / Enunciat disponible a u1e2.md

const CATEGORY_LIST = [
    {
        id: 1,
        name: 'design'
    }, {
        id: 2,
        name: 'development'
    }, {
        id: 3,
        name: 'consultancy'
    }
];

const PROJECT_LIST = [
    {
        id: 1,
        name: 'First Project',
        excerpt: 'Lorem <strong>ipsum</strong> dolor quan aemet...',
        categoryId: 2,
        progress: 90,
        archived: false,
        search: ['wordA', 'wordB', 'wordC'],
        tags: ['tag1', 'tag2']
    }, {
        id: 2,
        name: 'Second Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 2,
        progress: 50,
        archived: false,
        search: ['wordA', 'wordD'],
        tags: ['tag3']
    }, {
        id: 3,
        name: 'Third Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 1,
        progress: 20,
        archived: false,
        search: ['wordB', 'wordC'],
        tags: ['tag1', 'tag3']
    }, {
        id: 4,
        name: 'Fourth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB'],
        tags: ['tag2']
    }, {
        id: 5,
        name: 'Fifth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: false,
        search: ['wordA', 'wordC', 'wordD'],
        tags: ['tag1', 'tag2', 'tag3']
    }, {
        id: 6,
        name: 'Sixth Project',
        excerpt: 'Lorem ipsum <strong>dolor quan</strong> aemet...',
        categoryId: 2,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB', 'wordD'],
        tags: ['tag1']
    },
];

//Escribe aquí tu solución / escriviu aquí la vostra solució:

// C. Función renderProjects
function renderProjects() {
    const tplProject = document.querySelector('#tpl-project').content;
    const tplTag = document.querySelector('#tpl-tag').content;
    const fragment = document.createDocumentFragment();

    PROJECT_LIST.forEach(project => {
        const node = tplProject.cloneNode(true);
        const div = node.querySelector('.js-project');

        div.setAttribute('data-id', project.id);
        div.setAttribute('data-tags', project.tags.join(','));
        div.setAttribute('data-search', project.search.join(','));
        div.setAttribute('data-archived', project.archived);

        if (project.archived) div.classList.add('archived');
        if (project.progress === 100) div.classList.add('completed');

        node.querySelector('.js-name').textContent = project.name;
        node.querySelector('.js-progress').textContent = project.progress;
        node.querySelector('.js-excerpt').innerHTML = project.excerpt;

        const category = CATEGORY_LIST.find(c => c.id === project.categoryId);
        node.querySelector('.js-category').textContent = category ? category.name : '';

        const tagsContainer = node.querySelector('.js-tags');
        project.tags.forEach(tag => {
            const tagNode = tplTag.cloneNode(true);
            const link = tagNode.querySelector('.js-tag-link');
            link.setAttribute('data-tag', tag);
            link.textContent = tag;
            tagsContainer.appendChild(tagNode);
        });

        fragment.appendChild(node);
    });

    document.querySelector('.js-project-list').appendChild(fragment);
}

// D. Llamada inicial
renderProjects();
