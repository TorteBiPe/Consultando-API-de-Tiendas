
export default class JQueryService {

    constructor(apiurl) {
        this.apiurl = apiurl;
    }

    mostrar() {
        return new Promise((resolve,reject)=>{
            $.ajax({
                url: this.apiurl, //URL de la petición
                type: 'GET', //tipo de la petición: POST o GET
                dataType: 'json', //tipo de dato que se espera
                success: function (tiendas) { //función a ejecutar si es satisfactoria
                    resolve(tiendas)
                },
                error: function (jqXHR, status, error) { //función error
                    reject();
                },
            });
        })
    }
    insertar(tienda) {
        return new Promise((resolve,reject)=>{
            $.ajax({
                url: this.apiurl, //URL de la petición
                type: 'POST', //tipo de la petición: POST o GET
                contentType: 'application/json', //tipo de dato que se espera
                data: JSON.stringify(tienda),
                success: function () { //función a ejecutar si es satisfactoria
                    resolve(true);
                },
                error: function (jqXHR, status, error) { //función error
                    reject();
                },
            });
        })
    }
    detalle(idtienda) {
        return new Promise((resolve,reject)=>{
            $.ajax({
                url: `${this.apiurl}/${idtienda}`, //URL de la petición
                type: 'GET', //tipo de la petición: POST o GET
                dataType: 'json', //tipo de dato que se espera
                success: function (tiendas) { //función a ejecutar si es satisfactoria
                    resolve(tiendas)
                },
                error: function (jqXHR, status, error) { //función error
                    resolve(null);
                },
            });
        })
    }

};

