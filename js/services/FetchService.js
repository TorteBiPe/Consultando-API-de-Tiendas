export default class FetchService {

    constructor(apiurl) {
        this.apiurl = apiurl;
    }

    async mostrar() {
        const response = await fetch(this.apiurl);
        const tiendas = await response.json();
        return tiendas;
    }
    async insertar(tienda) {

        const response = await fetch(this.apiurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tienda)
        });

        return response.ok;
    }
    async detalle(idtienda) {
        try {
            const response = await fetch(`${this.apiurl}/${idtienda}`);
            const tiendas = await response.json();
            return tiendas;
        } catch (error) {
            return null
        }

    }

};

