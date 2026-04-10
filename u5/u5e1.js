// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u5e1.md / Enunciat disponible a u5e1.md


// A. Clase ClipboardApi
class ClipboardApi {

    // B. Constructor
    constructor(clipboard) {
        this.clipboard = clipboard || window.navigator.clipboard;
    }

    // C. Método copy
    async copy(text) {
        return await this.clipboard.writeText(text);
    }

    // D. Método read
    async read() {
        return await this.clipboard.readText();
    }
}

// E. Exportar
export { ClipboardApi };
