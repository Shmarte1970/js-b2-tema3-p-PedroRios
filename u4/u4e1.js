
// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u4e1.md / Enunciat disponible a u4e1.md



class CookieApi {
    // A. Propiedad estática
    static EXPIRING_DAYS = 365;

    // C. Constructor
    constructor(document) {
        this.document = document || window.document;
    }

    // B. Método estático expirationDate
    static expirationDate(nDays) {
        const date = new Date();
        date.setTime(date.getTime() + nDays * 24 * 60 * 60 * 1000);
        return date.toUTCString();
    }

    // D. Método setCookie
    setCookie(key, value, nDays = CookieApi.EXPIRING_DAYS) {
        this.document.cookie = `${key}=${JSON.stringify(value)};expires=${CookieApi.expirationDate(nDays)}`;
    }

    // E. Método getCookie
    getCookie(key) {
        const cookieStr = this.document.cookie;
        const prefix = `${key}=`;
        const start = cookieStr.indexOf(prefix);
        if (start === -1) return null;
        const valueStart = start + prefix.length;
        const valueEnd = cookieStr.indexOf(';', valueStart);
        const value = valueEnd === -1
            ? cookieStr.substring(valueStart)
            : cookieStr.substring(valueStart, valueEnd);
        return JSON.parse(value);
    }

    // F. Método removeCookie
    removeCookie(key) {
        this.document.cookie = `${key}=${JSON.stringify('')};expires=0`;
    }
}

// G. Exportar
export { CookieApi };
