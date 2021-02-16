
export default class XHRService {

    constructor(apiurl) {
        this.apiurl = apiurl;
    }

    mostrar() {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open('GET', this.apiurl, true);
            req.addEventListener("load", () => {
                try {
                    const tiendas = JSON.parse(req.responseText)
                    resolve(tiendas);
                } catch (error) {
                    reject(error);
                }
            })
            req.send(null);
        })
    }
    insertar(tienda) {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open('POST', this.apiurl, true);
            req.setRequestHeader("Content-Type","application/json")
            req.addEventListener("load", () => {
                try {
                    resolve(req.status>=200 && req.status<=299);
                } catch (error) {
                    reject(error);
                }
            })
            req.send(JSON.stringify(tienda));
        })
    }
    detalle(idtienda) {
        return new Promise((resolve, reject) => {
            var req = new XMLHttpRequest();
            req.open('GET', `${this.apiurl}/${idtienda}`, true);
            req.addEventListener("load", () => {
                try {
                    const tiendas = JSON.parse(req.responseText)
                    resolve(tiendas);
                } catch (error) {
                    resolve(null);
                }
            })
            req.send(null);
        })
    }

};

