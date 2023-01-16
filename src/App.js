import "./App.css";
import EditarUsuario from "./components/EditarUsuario";
import EditarRegProduccionAlimento from "./components/EditarRegProduccionAlimento";
import EditarCliente from "./components/EditarCliente";
import EditarRegProduccionMortalidad from "./components/EditarRegProduccionMortalidad";
import EditarRegSacrificioPollo from "./components/EditarRegSacrificioPollo";
import EditarGastosProduccion from "./components/EditarGastosProduccion";
import EditarLoteProduccion from "./components/EditarLoteProduccion";
import EditarLoteVentasRegistro from "./components/EditarLoteVentasRegistro";
import EditarGastosVentas from "./components/EditarGastosVentas";
import EditarLoteVenta from "./components/EditarLoteVenta";
import EditarEstadoUsuario from "./components/EditarEstadoUsuario";
import EditarLotes from "./components/EditarLotes";
import EditarValorUnidadMedida from "./components/EditarValorUnidadMedida";
import CrearCliente from "./components/CrearCliente";
import CrearLoteProduccion from "./components/CrearLoteProduccion";
import CrearUsuario from "./components/CrearUsuario";
import CrearRegProduccionMortalidad from "./components/CrearRegProduccionMortalidad";
import CrearRegSacrificioPollo from "./components/CrearRegSacrificioPollo";
import CrearRegProduccionAlimento from "./components/CrearRegProduccionAlimento";
import CrearGastosProduccion from "./components/CrearGastosProduccion";
import CrearLoteVentasRegistro from "./components/CrearLoteVentasRegistro";
import CrearGastosVentas from "./components/CrearGastosVentas";
import CrearLoteVenta from "./components/CrearLoteVenta";
import CrearEstadoUsuario from "./components/CrearEstadoUsuario";
import CrearLotes from "./components/CrearLotes";
import CrearValorUnidadMedida from "./components/CrearValorUnidadMedida";
import TablaLoteVentasRegistro from "./components/TablaLoteVentasRegistro";
import TablaRegProduccionMortalidad from "./components/TablaRegProduccionMortalidad";
import TablaGastosProduccion from "./components/TablaGastosProduccion";
import TablaRegSacrificioPollo from "./components/TablaRegSacrificioPollo";
import TablaClientes from "./components/TablaClientes";
import TablaUsuario from "./components/TablaUsuario";
import TablaRegProduccionAlimento from "./components/TablaRegProduccionAlimento";
import TablaLoteProduccion from "./components/TablaLoteProduccion";
import TablaGastosVentas from "./components/TablaGastosVentas";
import TablaLoteVenta from "./components/TablaLoteVenta";
import TablaProduccionVenta from "./components/TablaProduccionVenta";
import TablaLotes from "./components/TablaLotes";
import TablaValorUnidadMedida from "./components/TablaValorUnidadMedida";
import CrearLoteSistema from "./components/CrearLoteSistema";
import RegistroModuloProduccion from "./components/RegistroModuloProduccion";
import RegistroModuloVentas from "./components/RegistroModuloVentas";
import Inicio from "./components/Inicio";
import InicioSeccion from "./components/InicioSeccion";
import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrarLote from "./components/RegistrarLote";
import Reportes from "./components/Reportes";
import Reportes2 from "./components/Reportes2";
import RecuperarContrasena from "./components/RecuperarContrasena";
import RecuperarUsuario from "./components/RecuperarUsuario";
import ValidarContrasena from "./components/ValidarContrasena";

function App() {

  return (

      <div > 
    
          <Routes>
            <Route  path="/" exact element={<InicioSeccion />} />
            <Route  path="/RecuperarContrasena" element={<RecuperarContrasena />} />
            <Route  path="/RecuperarUsuario" element={<RecuperarUsuario />} />
            <Route  path="/ValidarContrasena/:id" element={<ValidarContrasena />} />
            <Route  path="/Reportes/:id_lote" element={<Reportes  />} />
            <Route  path="/Reportes2" element={<Reportes2  />} />
            <Route  path="/Inicio/:id_usuario" element={<Inicio  />} />
            <Route  path="/EditarLoteProduccion/:id" element={<EditarLoteProduccion />} />
            <Route  path="/EditarRegProduccionAlimento/:id" element={<EditarRegProduccionAlimento/>} />
            <Route  path="/EditarGastosProduccion/:id" element={<EditarGastosProduccion/>} />
            <Route  path="/EditarUsuario/:id" element={<EditarUsuario />} />
            <Route  path="/EditarCliente/:id" element={<EditarCliente/>} />
            <Route  path="/EditarRegSacrificioPollo/:id" element={<EditarRegSacrificioPollo/>} />
            <Route  path="/EditarRegProduccionMortalidad/:id" element={<EditarRegProduccionMortalidad/>} />
            <Route  path="/EditarLoteVentasRegistro/:id" element={<EditarLoteVentasRegistro/>} />
            <Route  path="/EditarGastosVentas/:id" element={<EditarGastosVentas/>} />
            <Route  path="/EditarLoteVenta/:id" element={<EditarLoteVenta/>} />
            <Route  path="/EditarEstadoUsuario/:id" element={<EditarEstadoUsuario/>} />
            <Route  path="/EditarLotes/:id" element={<EditarLotes/>} />
            <Route  path="/EditarValorUnidadMedida/:id" element={<EditarValorUnidadMedida/>} />
            <Route  path="/TablaLoteVentasRegistro" element={<TablaLoteVentasRegistro />} />
            <Route  path="/TablaUsuario" element={<TablaUsuario />} />
            <Route  path="/TablaClientes" element={<TablaClientes/>} />
            <Route  path="/TablaLoteProduccion" element={<TablaLoteProduccion/>} />
            <Route  path="/TablaRegProduccionMortalidad" element={<TablaRegProduccionMortalidad/>} />
            <Route  path="/TablaRegSacrificioPollo" element={<TablaRegSacrificioPollo/>} />
            <Route  path="/TablaRegProduccionAlimento" element={<TablaRegProduccionAlimento/>} />
            <Route  path="/TablaGastosProduccion" element={<TablaGastosProduccion/>} />
            <Route  path="/TablaGastosVentas" element={<TablaGastosVentas/>} />
            <Route  path="/TablaLoteVenta" element={<TablaLoteVenta/>} />
            <Route  path="/TablaProduccionVenta" element={<TablaProduccionVenta/>} />
            <Route  path="/TablaLotes" element={<TablaLotes/>} />
            <Route  path="/TablaValorUnidadMedida" element={<TablaValorUnidadMedida/>} />
            <Route  path="/CrearLoteVentasRegistro/:ref" element={<CrearLoteVentasRegistro/>} />
            <Route  path="/CrearLoteProduccion/:id_lote" element={<CrearLoteProduccion/>} />
            <Route  path="/CrearGastosProduccion/:ref" element={<CrearGastosProduccion/>} />
            <Route  path="/CrearUsuario" element={<CrearUsuario />} />
            <Route  path="/CrearCliente/:id" element={<CrearCliente />} />
            <Route  path="/CrearRegProduccionAlimento/:ref" element={<CrearRegProduccionAlimento/>} />
            <Route  path="/CrearRegProduccionMortalidad/:ref" element={<CrearRegProduccionMortalidad/>} />
            <Route  path="/CrearRegSacrificioPollo/:ref" element={<CrearRegSacrificioPollo/>} />
            <Route  path="/CrearGastosVentas/:ref" element={<CrearGastosVentas/>} />
            <Route  path="/CrearLoteVenta/:id_lote" element={<CrearLoteVenta/>} />
            <Route  path="/CrearEstadoUsuario/:id" element={<CrearEstadoUsuario/>} />
            <Route  path="/CrearLotes" element={<CrearLotes/>} />
            <Route  path="/CrearValorUnidadMedida" element={<CrearValorUnidadMedida/>} />
            <Route  path="/CrearLoteSistema" element={<CrearLoteSistema/>} />
            <Route  path="/RegistroModuloProduccion/:id_lote_produccion" element={<RegistroModuloProduccion/>} />
            <Route  path="/RegistroModuloVentas/:id_lote_venta_total" element={<RegistroModuloVentas/>} />
            <Route  path="/RegistrarLote/:id_lote" element={<RegistrarLote/>} />
          </Routes>

      </div>

  );
  
}

export default App;
