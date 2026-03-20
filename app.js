let modoAgregar = false;
let pedidosCocina = [];
let pedidos = {}; // 🔥 base de todo
let historialPedidos = [];

const menu = {
        ramen: [
            { nombre: "Miso Ramen", precio: 218, estacion: "cocina" },
            { nombre: "Tonkotsu Ramen", precio: 218, estacion: "cocina" }
        ],
        sushi: [
            { nombre: "Rainbow Roll", precio: 212, estacion: "sushi" },
            { nombre: "Dragon Roll", precio: 172, estacion: "sushi" }
        ],
        bebidas: [
            { nombre: "Refresco", precio: 41, estacion: "barra" },
            { nombre: "Cerveza", precio: 66, estacion: "barra" }
        ]
};

let mesas = [1,2,3,4,5,6];
let pedidoActual = null;

function renderMesas() {
    let contenedor = document.getElementById("mesas");
    contenedor.innerHTML = "";

    mesas.forEach(mesa => {
        let btn = document.createElement("button");
        btn.innerText = "Mesa " + mesa;
        btn.onclick = () => seleccionarMesa(mesa);
        contenedor.appendChild(btn);
    });
    }

function seleccionarMesa(mesa) {

  // si ya existe, lo recupera
  if (!pedidos[mesa]) {
    pedidos[mesa] = {
      mesa: mesa,
      items: [],
      total: 0,
      bloques: []
    };
  }

  pedidoActual = pedidos[mesa];

  document.getElementById("pedido").style.display = "block";
  document.getElementById("mesaTitulo").innerText = "Mesa " + mesa;

  renderPedido();
}

function agregarProducto() {
    modoAgregar = true;
    if (pedidoActual.estado === "cerrado") {
  alert("Pedido cerrado");
  return;
}
    mostrarCategorias();
}
function mostrarCategorias() {
  let menuDiv = document.getElementById("menuOpciones");
  menuDiv.innerHTML = "";

    // 🔚 botón terminar
    let terminar = document.createElement("button");
    terminar.innerText = "✔ Terminado";
    terminar.onclick = cerrarMenu;
    menuDiv.appendChild(terminar);

  Object.keys(menu).forEach(categoria => {
    let btn = document.createElement("button");
    btn.innerText = categoria.toUpperCase();
    btn.onclick = () => mostrarProductos(categoria);
    menuDiv.appendChild(btn);
  });
}
function cerrarMenu() {
  modoAgregar = false;

    let menuDiv = document.getElementById("menuOpciones");
    menuDiv.innerHTML = ""; // limpia opciones
}

function mostrarProductos(categoria) {
    let menuDiv = document.getElementById("menuOpciones");
    menuDiv.innerHTML = "";
    
    let terminar = document.createElement("button");
        terminar.innerText = "✔ Terminado";
        terminar.onclick = cerrarMenu;
        menuDiv.appendChild(terminar);

    let back = document.createElement("button");
        back.innerText = "⬅ Volver";
        back.onclick = mostrarCategorias;
        menuDiv.appendChild(back);

  menu[categoria].forEach(producto => {
        let btn = document.createElement("button");
        btn.innerText = `${producto.nombre} - $${producto.precio}`;
        btn.onclick = () => agregarAlPedido(producto);
        menuDiv.appendChild(btn);
    });
}
function agregarAlPedido(producto) {
    if (pedidoActual.estado === "cerrado") {
  return;
}
pedidoActual.items.push({
  nombre: producto.nombre,
  precio: producto.precio,
  cantidad: 1,
  listos: 0,
  entregados: 0, // 🔥 NUEVO
  devueltos: 0, // 🔥 NUEVO
  cancelados: 0, // 🔥 nuevo 
  notas: "",
  estado: "pendiente",
  estacion: producto.estacion
  
});

  pedidoActual.total = pedidoActual.items.reduce((sum, item) => sum + item.precio, 0);



    renderPedido();
    if (!pedidoActual) {
    alert("Selecciona una mesa primero");
    return;
    }
    
}

function renderPedido() {
    if (pedidoActual.estado === "cerrado") {
        let aviso = document.createElement("div");
        aviso.innerHTML = "<strong>🔒 Pedido cerrado</strong>";
        lista.appendChild(aviso);
        }
        let bloqueado = pedidoActual.estado === "cerrado";
        
        let lista = document.getElementById("pedidoLista");
        lista.innerHTML = "";
        pedidoActual.items.forEach((item, index) => {
        
            let contenedor = document.createElement("div");
            contenedor.classList.add("item-card"); // 🔥 AQUÍ
            contenedor.innerHTML = `

    <strong>
   ${item.nombre} 
        ${item.estado === "pendiente" ? "🟡" : ""}
        ${item.estado === "enviado" ? "🔵" : ""}
        ${item.listos === item.cantidad ? "🟢" : item.listos > 0 ? "🔵" : "🟡"}
    </strong> - $${item.precio} x ${item.cantidad}
     
    <br>
      <button onclick="cambiarCantidad(${index}, 1)"
      ${bloqueado ? "disabled" : ""}
      >➕</button>
      
      <button onclick="cambiarCantidad(${index}, -1)"
      ${bloqueado ? "disabled" : ""}
      >➖</button>
      <button onclick="eliminarItem(${index})"
      ${bloqueado ? "disabled" : ""}
      >🗑️</button>
      <br>
        <textarea placeholder="Notas..." oninput="actualizarNota(${index}, this.value)">
          ${item.notas}
        </textarea>
      <br>
            Entregado: ${item.entregados}/${item.cantidad}
      <br>
      <button onclick="entregarItem(${index})"
      ${bloqueado ? "disabled" : ""}>📦 Entregar</button>
      
      <button onclick="cancelarItem(${index})">❌ Cancelar</button>
<br>
Devueltos: ${item.devueltos}
      <button onclick="devolverItem(${index})">↩ Devolver</button>

    `;

    lista.appendChild(contenedor);
  });

//  let estadoIcono =
 // item.entregados === item.cantidad ? "✅" :
 // item.listos === item.cantidad ? "🟢" :
  //item.listos > 0 ? "🔵" : "🟡";//

  pedidoActual.total = pedidoActual.items.reduce(
  (sum, item) => sum + (item.precio * (item.cantidad - item.devueltos)),
  0
);

  
  document.getElementById("total").innerText = "Total: $" + pedidoActual.total;
}

function cambiarCantidad(index, cambio) {

  if (pedidoActual.estado === "cerrado") return;

  let item = pedidoActual.items[index];

  // 🔥 BLOQUEO
  if (cambio < 0 && item.listos > 0) {
    alert("No puedes reducir: ya está en preparación 🚨");
    return;
  }

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    pedidoActual.items.splice(index, 1);
  }

  renderPedido();
}

function eliminarItem(index) {

  if (pedidoActual.estado === "cerrado") return;

  let item = pedidoActual.items[index];

  if (item.listos > 0) {
    alert("No puedes cancelar: ya está en preparación o listo 🚨");
    return;
  }

  pedidoActual.items.splice(index, 1);

  renderPedido();
}

function entregarItem(index) {

  if (pedidoActual.estado === "cerrado") return;

  let item = pedidoActual.items[index];

  if (item.entregados < item.listos) {
    item.entregados++;
  }

  renderPedido();
}

function devolverItem(index) {

  if (pedidoActual.estado === "cerrado") return;

  let item = pedidoActual.items[index];

  if (item.entregados > 0) {
    item.entregados--;
    item.devueltos++;
  } else {
    alert("No hay productos entregados para devolver");
    return;
  }

  renderPedido();
}

function actualizarNota(index, valor) {
    if (pedidoActual.estado === "cerrado") {
  return;
}
  pedidoActual.items[index].notas = valor;
}

function enviarPedido() {
  // filtrar solo los que NO se han enviado
  let nuevos = pedidoActual.items.filter(item => !item.enviado);

  if (nuevos.length === 0) {
    alert("No hay productos nuevos");
    return;
  }

  // crear bloque
  let bloque = {
    id: Date.now(),
    items: nuevos
  };

  pedidoActual.bloques.push(bloque);

  // marcar como enviados
  nuevos.forEach(item => item.estado = "enviado");

  pedidosCocina.push({
  mesa: pedidoActual.mesa,
  bloque: bloque,
  pedido: pedidoActual // 🔥 referencia real
});

  console.log("Enviado a cocina:", bloque);

  alert("Pedido enviado a cocina 🚀");

  renderPedido();
  renderCocina(); // 🔥 AQUI
}
 
renderMesas();

// NUEVO: render para cocina
function renderCocina() {
    let cocinaDiv = document.getElementById("cocina");
        if (!cocinaDiv) {
        console.error("No existe el div cocina");
        return;
         }
  cocinaDiv.innerHTML = "";

  ["cocina", "sushi", "barra"].forEach(estacion => {

    let seccion = document.createElement("div");
    seccion.innerHTML = `<h3>${estacion.toUpperCase()}</h3>`;

    let pedidosActivos = pedidosCocina.filter(p => p.pedido.estado !== "cerrado");
    pedidosActivos.forEach((pedido, index) => {

      let itemsFiltrados = pedido.bloque.items.filter(
        item =>
            item.estacion === estacion &&
            (item.entregados || 0) < item.cantidad // 🔥 clave
        );

        itemsFiltrados.sort((a, b) => a.listos - b.listos);

      if (itemsFiltrados.length === 0) return;

      let itemsHTML = itemsFiltrados.map(item => `
  <li>
    ${item.nombre} (${item.listos}/${item.cantidad})
    <br>
    <small>${item.notas || ""}</small>
    <br>
    <button onclick="itemListo(${index}, '${item.nombre}')">➕ +1 listo</button>
    <button onclick="itemRestar(${index}, '${item.nombre}')">➖</button>
  </li>
`).join("");

      let contenedor = document.createElement("div");
      contenedor.classList.add("cocina-card");

      let estadoTexto = pedido.pedido.estado === "cerrado" ? "🔒" : "🟡";

      contenedor.innerHTML = `
        <strong>Mesa ${pedido.mesa} - #${pedido.bloque.id} ${estadoTexto}</strong>
        <ul>${itemsHTML}</ul>
        `;

      seccion.appendChild(contenedor);
    });

    cocinaDiv.appendChild(seccion);
  });
}

function itemListo(index, nombre) {
  let pedidoCocina = pedidosCocina[index];

if (pedidoCocina.pedido.estado === "cerrado") {
  return;
}

  pedidoCocina.bloque.items.forEach(item => {
    if (item.nombre === nombre) {

      if (item.listos < item.cantidad) {
        item.listos++;
      }

      if (item.listos === item.cantidad) {
        item.estado = "listo";
      } else {
        item.estado = "preparando";
      }
    }
  });

  // 🔥 sincronizar con pedido real
  let pedido = pedidoCocina.pedido;

  pedido.items.forEach(item => {
    let match = pedidoCocina.bloque.items.find(i => i.nombre === item.nombre);
    if (match) {
      item.estado = match.estado;
      item.listos = match.listos;
    }
  });

  renderCocina();
  renderPedido(); // 🔥 actualizar mesero
}

function marcarListo(index) {
  pedidosCocina[index].estado = "listo";
  renderCocina();
}

function regresarPreparando(index) {
  pedidosCocina[index].estado = "preparando";
  renderCocina();
}

function bloqueListo(bloque) {
  return bloque.items.every(item => item.listos === item.cantidad);
}

function pedidoEntregado(pedido) {
  return pedido.items.every(item => item.entregados === item.cantidad);
}

function itemRestar(index, nombre) {
  let pedidoCocina = pedidosCocina[index];

  pedidoCocina.bloque.items.forEach(item => {
    if (item.nombre === nombre) {

      if (item.listos > 0) {
        item.listos--;
      }

      if (item.listos === 0) {
        item.estado = "enviado";
      } else {
        item.estado = "preparando";
      }
    }
  });

  // 🔥 sincronizar con mesero
  let pedido = pedidoCocina.pedido;

  pedido.items.forEach(item => {
    let match = pedidoCocina.bloque.items.find(i => i.nombre === item.nombre);
    if (match) {
      item.estado = match.estado;
      item.listos = match.listos;
    }
  });

  renderCocina();
  renderPedido();
}

function cerrarPedido() {
  if (!pedidoActual) return;

  if (!pedidoEntregado(pedidoActual)) {
    alert("No puedes cerrar: hay productos no entregados 🚨");
    return;
  }

  let confirmar = confirm("¿Cerrar pedido?");
  if (!confirmar) return;

  pedidoActual.estado = "cerrado";

  guardarPedidoFinal(pedidoActual);

  pedidos[pedidoActual.mesa] = null;
  pedidoActual = null;

  document.getElementById("pedido").style.display = "none";

  alert("Pedido cerrado ✅");
}

function pedidoCompleto(pedido) {
  return pedido.items.every(item => item.listos === item.cantidad);
}

function guardarPedidoFinal(pedido) {

  let copia = JSON.parse(JSON.stringify(pedido));

  let ahora = new Date();

  copia.fecha = ahora.toLocaleString(); // visual
  copia.fechaISO = ahora.toISOString().split("T")[0]; // 🔥 clave

  historialPedidos.push(copia);

  localStorage.setItem("historialPedidos", JSON.stringify(historialPedidos));
}

function mostrarResumen() {
  let div = document.getElementById("resumen");
  div.innerHTML = "";

  let fechaSeleccionada = document.getElementById("filtroFecha").value;

  let totalDia = 0;

  historialPedidos.forEach(pedido => {

    // 🔥 FILTRO
    if (fechaSeleccionada && pedido.fechaISO !== fechaSeleccionada) {
      return;
    }

    let itemsHTML = pedido.items.map(item => `
      <li>
        ${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}
      </li>
    `).join("");

    totalDia += pedido.total;

    let contenedor = document.createElement("div");

    contenedor.innerHTML = `
      <strong>Mesa ${pedido.mesa}</strong>
      <br>
      Fecha: ${pedido.fecha}
      <ul>${itemsHTML}</ul>
      Total: $${pedido.total}
      <hr>
    `;

    div.appendChild(contenedor);
  });

  let totalFinal = document.createElement("h3");
  totalFinal.innerText = "TOTAL: $" + totalDia;

  div.appendChild(totalFinal);
}

function cargarHistorial() {
  let data = localStorage.getItem("historialPedidos");

  if (data) {
    historialPedidos = JSON.parse(data);
  }
}

function guardarPedidosActivos() {
  localStorage.setItem("pedidosActivos", JSON.stringify(pedidos));
}

function cargarPedidosActivos() {
  let data = localStorage.getItem("pedidosActivos");

  if (data) {
    pedidos = JSON.parse(data);
  }
}

function verTodo() {
  document.getElementById("filtroFecha").value = "";
  mostrarResumen();
}

function exportarPDF() {

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let fechaSeleccionada = document.getElementById("filtroFecha").value;

  let y = 10;
  let totalDia = 0;

  doc.setFontSize(14);
  doc.text("Resumen de ventas", 10, y);

  y += 10;

  historialPedidos.forEach(pedido => {

    if (fechaSeleccionada && pedido.fechaISO !== fechaSeleccionada) return;

    doc.setFontSize(10);
    doc.text(`Mesa ${pedido.mesa} - ${pedido.fecha}`, 10, y);
    y += 5;

    pedido.items.forEach(item => {
      doc.text(
        `${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}`,
        12,
        y
      );
      y += 5;
    });

    doc.text(`Total: $${pedido.total}`, 10, y);
    y += 8;

    totalDia += pedido.total;

    // salto de página si se llena
    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  y += 5;
  doc.setFontSize(12);
  doc.text(`TOTAL DEL DÍA: $${totalDia}`, 10, y);

  doc.save("resumen.pdf");
}

function cancelarItem(index) {

  if (pedidoActual.estado === "abierto") return;

  let item = pedidoActual.items[index];

  // ❌ si ya está en preparación
  if (item.listos > 0) {
    alert("No puedes cancelar: ya está en preparación 🚨");
    return;
  }

  if (item.cantidad > 0) {
    item.cantidad--;
    item.cancelados++;
  }

  renderPedido();
}

cargarHistorial();
cargarPedidosActivos();
renderMesas();
guardarPedidosActivos();
