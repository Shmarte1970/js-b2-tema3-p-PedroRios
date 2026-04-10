// T3. JavaScript profesional en una aplicación web
// U2. Eventos personalizados (custom events)
// Enunciado disponible en u3e1.md / Enunciat disponible a u3e1.md



// A. Clase Sender
class Sender {
    static TYPE_A = 'EVENT_NOTIFICATION_A';
    static TYPE_B = 'EVENT_NOTIFICATION_B';

    #refDom;
    type;
    count = 0;

    constructor(ref, type) {
        this.#refDom = ref;
        this.type = type;
        this.init();
    }

    init() {
        this.#refDom.addEventListener('click', (e) => {
            e.preventDefault();
            this.count++;
            this.trigger();
            this.render();
        });
    }

    trigger() {
        const event = new CustomEvent(this.type, {
            bubbles: true,
            detail: this.count,
        });
        this.#refDom.dispatchEvent(event);
    }

    render() {
        this.#refDom.textContent = `${this.type.slice(-1)}: ${this.count}`;
    }
}

// B. Clase Logger
class Logger {
    #refDom;
    #notificationList = [];
    #handler;

    constructor(ref) {
        this.#refDom = ref;
        this.init();
    }

    init() {
        this.#handler = this.onNotificationReceived.bind(this);
        document.addEventListener(Sender.TYPE_A, this.#handler);
        document.addEventListener(Sender.TYPE_B, this.#handler);
    }

    onNotificationReceived(e) {
        this.#notificationList.unshift({ type: e.type, detail: e.detail });
        this.render();
    }

    render() {
        this.#refDom.innerHTML = '';
        this.#notificationList.forEach(notification => {
            const p = document.createElement('p');
            p.textContent = `${notification.type}: ${notification.detail}`;
            this.#refDom.appendChild(p);
        });
    }

    destroy() {
        document.removeEventListener(Sender.TYPE_A, this.#handler);
        document.removeEventListener(Sender.TYPE_B, this.#handler);
    }
}

// C. Llamadas adicionales
const notificationADom = document.querySelector('.js-notification-A');
const notificationBDom = document.querySelector('.js-notification-B');
const loggerDom = document.querySelector('.js-logger');

const nA = new Sender(notificationADom, Sender.TYPE_A);
const nB = new Sender(notificationBDom, Sender.TYPE_B);
const logger = new Logger(loggerDom);

notificationADom.click();
notificationADom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationADom.click();

logger.destroy();

notificationADom.click();
notificationBDom.click();
notificationBDom.click();
