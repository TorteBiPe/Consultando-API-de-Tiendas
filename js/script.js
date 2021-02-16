import TiendaService 
from "./services/XHRService.js"

const API = "https://webapp-210130211157.azurewebsites.net/webresources/mitienda";
let tiendaservice;
let buttonXHR = document.getElementById("buttonXHR");
let buttonFetch = document.getElementById("buttonFetch");
let buttonJQuery = document.getElementById("buttonJQuery");
let searchform = document.getElementById("searchform");
let insertform = document.getElementById("insertform");
let buttonnew = document.getElementById("buttonnew")
let shopcontainer = document.getElementById("shopcontainer");

buttonXHR.addEventListener("click",loadService);
buttonFetch.addEventListener("click",loadService);
buttonJQuery.addEventListener("click",loadService);
searchform.addEventListener("submit",searchShop)
insertform.addEventListener("submit",insertShop)
buttonnew.addEventListener("click",toggleInsertForms);

let showinsertform = false;



async function loadService(event){

    document.getElementById("containerbutton").remove();
    document.getElementById("searchsection").style.display = null;
    enableLoad();
    const service =await import(`./services/${event.target.value}.js`)
    tiendaservice = new service.default(API);
    const shops = await tiendaservice.mostrar();

    showShops(shops);


}

function enableLoad(){
    clearElement(shopcontainer);
    const loader = document.createElement("div");
    loader.classList.add("loader");
    shopcontainer.append(loader);
}

function showShops(shops){
    let template = document.getElementById("shopstemplate");
    clearElement(shopcontainer);
    shops.forEach(shop => {
        let container =template.content.cloneNode(true);
        container.querySelector(".name").textContent = shop.nombreTienda
        container.querySelector(".phone").textContent = shop.telefono
        container.querySelector(".addres").textContent = shop.direccion
        container.querySelector(".location").textContent = shop.localidad
        shopcontainer.appendChild(container);
    });

}

function clearElement(element){
    while(element.hasChildNodes()){
        element.removeChild(element.firstChild)
    }
}

async function searchShop(event){
    event.preventDefault();
    enableLoad();
    let input = document.querySelector("#searchform input")
    let shop = await tiendaservice.detalle(input.value);
    if(shop){
        showShops([shop]);
    }
    else{
        showShops([]);
        alert("No se a encontrado la tienda")
    }
}

async function insertShop(event){
    event.preventDefault();

    let inputs = insertform.querySelectorAll("input")
    let shop = {};
    inputs.forEach(input => {
        shop[input.name]=input.value;
    });
    
    let okey = await tiendaservice.insertar(shop);
    if(okey){
        enableLoad();
        const shops = await tiendaservice.mostrar();
        showShops(shops);
    }
    else{
        alert("Fallo al insertar una tienda")
    }
}
function toggleInsertForms(){
    let formwrapper = document.getElementById("formwrapper");
    if(showinsertform){
        formwrapper.style.height = `0px`; 
        showinsertform = false; 
    }
    else{
        let height = insertform.offsetHeight;
        formwrapper.style.height = `${height}px`;
        showinsertform = true; 
    }
}