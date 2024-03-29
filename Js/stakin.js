//CLASES

class Cripto  {
  constructor(ticker,nombre,apy,img,tipocripto,streamTicker)
  {
      this.ticker=ticker;
      this.nombre=nombre;
      this.apy=apy;
      this.img=img;
      this.tipocripto=tipocripto;
      this.streamTicker=streamTicker;
  }
  calculoStaking(plazo,importe)
  {              
          if(plazo>=1 && plazo<=365 && !isNaN(importe) && importe>0)
          {
              let imp=importe;
              let recompensaTotal = 0;
              document.getElementById(`tablaStake${this.ticker}`).innerHTML="";
              for(let i = 1; i<=plazo; i++)
              {
              let recompensa = importe*this.apy/365;
              recompensaTotal += recompensa;
              importe += recompensa;
              document.getElementById(`tablaStake${this.ticker}`).innerHTML+=`<tr>
              <td>${i}</td>
              <td>${recompensa.toFixed(5)} ${this.ticker.toUpperCase()}</td>
              <td>${importe.toFixed(5)} ${this.ticker.toUpperCase()}</td>
              </tr>`
              }
              const resultado = document.querySelector(`#res${this.ticker}`);
              resultado.innerHTML=`<li class="list-unstyled fs-5 mt-3">Plazo: ${plazo} Días</li>
                                    <li class="list-unstyled fs-5 mt-2">Inversion: ${imp} ${this.ticker}</li>
                                    <li id="recompensa${this.ticker}" class="list-unstyled fs-5 mt-2">Recompensa: ${recompensaTotal.toFixed(10)} ${this.ticker}</li>
                                    <button type="button" class="btn-view my-3" data-bs-toggle="modal" data-bs-target="#ModalStake${this.ticker}">
                                    Ver rendimiento diario
                                    </button>
                                    </div>`;
                                                      
          }
  }
}

let listacriptos = [];

// TRAER CRIPTOS DE JSON 
const cargar = async () => {
const response = await fetch("./json/data.json");
const items = await response.json();
items.forEach (item => {
  listacriptos.push(new Cripto(item.ticker, item.nombre, item.apy, item.img, item.tipocripto, item.streamTicker))
})
}

const agruparAsync = async () => {
  await cargar();
  mostrarCriptos(listacriptos);
  //Uso de Funciones del DOM
  botonStake();
  databtnStake();
}

agruparAsync();


//Calculo de Apy Maximo
let apymax = Math.max(...listacriptos.map((i) => i.apy));
let criptoapymax = listacriptos.find(i => {
  return i.apy === apymax
})



//Websocket Criptos Stake en vivo
let streams = [
  "btcusdt@ticker", "ethusdt@ticker", "busdusdt@ticker",
  "usdtdai@ticker", "axsusdt@ticker", "sandusdt@ticker",
];

let ws = new WebSocket("wss://stream.binance.com:9443/ws/" + streams.join('/'));

ws.onmessage = function(evento) {
  try {
    let msgs = JSON.parse(evento.data);
    if (Array.isArray(msgs)) {
      for (let msg of msgs) {
        mostrarStreams(msg);
      }
    } else {
      mostrarStreams(msgs)
    }
  } catch (e) {
    // console.log(evento.data, e);
  }
}

// Funciones del DOM
function mostrarStreams(msg) {
  const stream = msg.s;
  document.getElementById('stream_' + stream).innerText = `${parseFloat(msg.c).toFixed(2)} USD`;
  document.getElementById('stream_%' + stream).style.color = msg.P > 0 ? '#00FF00' : msg.P == 0 ? '' : '#FF0000';
  document.getElementById('stream_%' + stream).style.transition = msg.P > 0 ? 'all 0.5s' : msg.P == 0 ? 'all 0.5s' : 'all 0.5s';
  document.getElementById('stream_%' + stream).innerText = msg.P > 0 ? ` ▲ ${parseFloat(msg.P).toFixed(2)}%` : msg.P == 0 ? `${parseFloat(msg.P).toFixed(2)}%` : ` ▼ ${parseFloat(msg.P).toFixed(2)}%`;
}

const mostrarCriptos = (listacriptos) => {
  const contenedor = document.getElementById("cripto");
  console.log(listacriptos);
  listacriptos.forEach(cripto =>{
    const divCripto = document.createElement("div");
    divCripto.classList.add("col-sm-2")
    divCripto.classList.add("text-center")
    divCripto.classList.add("my-4")
    divCripto.setAttribute("id", `${cripto.ticker}`)
    divCripto.innerHTML+=`<h3 class="mb-2">${cripto.nombre}</h3>
            <img id="${cripto.ticker}img" class="my-3" src=${cripto.img} width="100" height="100" alt=${cripto.nombre}>
            <li class="list-unstyled">Tipo: ${cripto.tipocripto}</li>
            <li id="stream_${cripto.streamTicker}" class="list-unstyled lead"> <img class="my-1" src="../images/spin.svg" width="25" height="25"> </li>
            <li id="stream_%${cripto.streamTicker}" class="list-unstyled lead"> <img src="../images/spin.svg" width="25" height="25"> </li>
            <li class="list-unstyled fs-4">Apy: ${(cripto.apy*100).toFixed(2)}%</li><br>
            <button id="${cripto.ticker}Stake" class="btn-stk" type="button" data-bs-toggle="collapse" data-bs-target="#datos${cripto.ticker}" aria-expanded="false" aria-controls="datos${cripto.ticker}">+</button>
            `
            contenedor.appendChild(divCripto);
  });
  
}

function botonStake()
{
    listacriptos.forEach((cripto)=>{
        
        const divData = document.getElementById(`${cripto.ticker}`);
            divData.innerHTML+=`<div class="collapse" id="datos${cripto.ticker}">
            <div class="form-group my-4">
            <div class="col-sm-12">
            <input id="plazo${cripto.ticker}" name="name" type="number" placeholder="Plazo (Días)" class="form-control" min=1 max=365>
            </div>
            </div>
            <div class="form-group my-4">
            <div class="col-sm-12">
            <input id="importe${cripto.ticker}" name="name" type="number" placeholder="Importe" class="form-control" min=0>
            </div>
            </div>
            <button id="Simular${cripto.ticker}" class="btn-stk">Simular</button>
            <div id="res${cripto.ticker}"class="text-left"></div>
            </div>
            <div class="modal fade" id="ModalStake${cripto.ticker}" data-bs-backdrop="static" tabindex="-1" aria-labelledby="ModalStakeLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content bg-black rounded-0 bordes-neon">
            <div class="modal-header">
            <h5 class="modal-title" id="ModalStakeLabel">Rendimiento Diario estimado en ${cripto.nombre} (${cripto.ticker})</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <table class="tabla-css">
            <thead>
              <tr>
                  <th><span class="mx-1"></span>Dia</th>
                  <th><span class="mx-1"></span>Recompensa Estimada</th>
                  <th><span class="mx-1"></span>Recompensa Acumulada</th>
              </tr>
            </thead>
            <tbody id="tablaStake${cripto.ticker}">
            </tbody>
            </table>
            </div>
            <div class="modal-footer">
            <button id="btnModal" type="button" class="btn-view" data-bs-dismiss="modal">Cerrar</button>
            </div>
            </div>
            </div>
            </div>`
          })   
}

function databtnStake()
{
    listacriptos.forEach((cripto)=>{
        const imp = document.querySelector(`#importe${cripto.ticker}`);        
        imp.addEventListener("input", ()=>{
        let importe = imp.value;
        })
        const dias = document.querySelector(`#plazo${cripto.ticker}`);
        dias.addEventListener("input", ()=>{
        let plazo = dias.value;
        })
        const btncalc = document.querySelector(`#Simular${cripto.ticker}`);
        btncalc.addEventListener("click",()=>{
        cripto.calculoStaking(parseFloat(dias.value),parseFloat(imp.value));
        dias.value = null;
        imp.value = null;
        })
        const btncollapse = document.querySelector(`#${cripto.ticker}Stake`);
        function borrarStake(btncollapse,imp,dias){
            btncollapse.innerHTML = "+";
            imp.value=null; dias.value=null;
            document.getElementById(`res${cripto.ticker}`).innerHTML = "";
        }
        btncollapse.addEventListener("click", ()=>{
            btncollapse.innerHTML == "-" ? borrarStake(btncollapse,imp,dias) : btncollapse.innerHTML = "-";
            setTimeout(function(){
            document.getElementById(`plazo${cripto.ticker}`).focus();          
            }, 300);
            
        })      
    })
} 
