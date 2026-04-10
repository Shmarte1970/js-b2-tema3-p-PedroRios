// T3. JavaScript profesional en una aplicación web
// U2. Delegación de eventos
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md

const TASK_LIST = [
    {
        name: 'Work',
        done: false,
    },
    {
        name: 'Shopping',
        done: false,
    },
    {
        name: 'Call mom',
        done: true,
    },
];



// B. Clase TodoList
class TodoList {
    #appRef;
    #listRef;
    #todoTpl;

    // C. Propiedad list
    list = [];

    constructor(appRef, listRef, todoTpl) {
        this.#appRef = appRef;
        this.#listRef = listRef;
        this.#todoTpl = todoTpl;
        this.init();
    }

    // D. Método init
    init() {
        this.#appRef.querySelector('.js-todo-add').addEventListener('click', (e) => {
            e.preventDefault();
            const input = this.#appRef.querySelector('.js-todo-new-name');
            this.add(input.value, false);
            input.value = '';
        });

        this.#listRef.addEventListener('click', (e) => {
            e.preventDefault();
            const todoEl = e.target.closest('.js-todo');
            if (!todoEl) return;
            const name = todoEl.dataset.todo;
            if (e.target.classList.contains('js-todo-done')) {
                this.toggle(name);
            } else if (e.target.classList.contains('js-todo-delete')) {
                this.remove(name);
            }
        });
    }

    // E. Método add
    add(todo, status) {
        if (todo === '') return false;
        if (this.list.find(t => t.name === todo)) return false;
        this.list.push({ name: todo, done: status });
        this.render();
        return true;
    }

    // F. Método remove
    remove(name) {
        this.list = this.list.filter(t => t.name !== name);
        this.render();
    }

    // G. Método toggle
    toggle(name) {
        const todo = this.list.find(t => t.name === name);
        if (todo) todo.done = !todo.done;
        this.render();
    }

    // H. Método render
    render() {
        this.#listRef.innerHTML = '';
        const fragment = document.createDocumentFragment();
        this.list.forEach(todo => {
            const node = this.#todoTpl.content.cloneNode(true);
            const li = node.querySelector('.js-todo');
            li.setAttribute('data-todo', todo.name);
            li.setAttribute('data-done', todo.done);
            li.querySelector('.js-todo-name').textContent = todo.name;
            li.querySelector('.js-todo-done').textContent = todo.done ? 'done' : 'pending';
            fragment.appendChild(node);
        });
        this.#listRef.appendChild(fragment);
    }
}

// K. Instanciación
const todosApp = new TodoList(
    document.querySelector('#app'),
    document.querySelector('.js-todo-list'),
    document.querySelector('#todo-tpl')
);

// L. Generación inicial de tareas
TASK_LIST.forEach(task => todosApp.add(task.name, task.done));

// M. Llamadas adicionales
todosApp.add('New one', false);
todosApp.toggle('Shopping');
todosApp.remove('Call mom');
todosApp.add('Another one', true);

document.querySelector('.js-todo-new-name').value = 'Test';
document.querySelector('.js-todo-add').click();

document.querySelector('.js-todo[data-todo="New one"] .js-todo-done').click();
document.querySelector('.js-todo[data-todo="Another one"] .js-todo-delete').click();
