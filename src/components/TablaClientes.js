import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import TablaNavegacion from "../components/TablaNavegacion";
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

  function TablaClientes() {

  const navigate = useNavigate();
  const [user,  setUser] = useState("");
  const [campo_buscar, setCampo_buscar] = useState("");
  const [filtro, setFiltro] = useState("Nombre");
  const [clientes , setClientes] = useState([]);
  const [id_cliente, setId_cliente] = useState('');
  const [id_usuario, setId_usuario] = useState('');
  var  item_value = sessionStorage.getItem("item_key")
  var varSesion = sessionStorage.getItem("inicioSeccion");

  const columns = [
    {
      name: 'Fecha Creación',
      selector: row => row.Fecha_creacion.substr(0,10)
    },
    {
      name: 'Identificación Cliente',
      selector: row => row.Identificacion_cliente
    },
    {
      name: 'Nombre',
      selector: row => row.Nombre
    },
    {
      name: 'Numero Contacto Cliente',
      selector: row => row.Numero_contacto_cliente
    },
    {
      name: 'Dirección Cliente',
      selector: row => row.Direccion_cliente
    },
    {
      name: 'Correo Cliente',
      selector: row => row.Correo_cliente
    },
    {
      name: 'Descripción Cliente',
      selector: row => row.Descripcion_cliente
    },
    {
      name: 'Nombre Usuario',
      selector: row => row.Nombre_usuario
    },
    {
      name:'Editar',
      cell: row => <Button variant="success" type="submit" onClick={()=>abrirEditarCliente(row)}>Editar</Button>,
    },
    {
      name:'Eliminar',
      cell: row => <Button variant="danger"  type="submit" onClick={()=>eliminarClienteId(row['Id_Cliente'])}>Eliminar</Button>,
    }
  ]

const Crear = () => {
    navigate(`/CrearCliente/${user}`);
  }

useEffect(()=>{
  fetch('http://localhost:4000/cliente')
  .then(response => {
      return response.json();
  })
  .then(response => {
    setClientes(response); 
  })
},[]); 

useEffect(()=>{
  fetch('http://localhost:4000/users'+id_usuario)
  .then(response => {
      return response.json();
  })
  .then(response => {
    console.log("Usuario: ",response[0].Id_usuario);
    setUser( response[0].Id_usuario)
  })
},[]);

//metodo que carga informacion a los estados del cliente y abre la pagina de editar cliente
    const abrirEditarCliente=(row)=>{
      var id = row['Id_Cliente']
      setId_cliente(row['Id_Cliente'])
      navigate(`/EditarCliente/${id}`);
    }

const eliminarClienteId = (id)=>{
  var url = 'http://localhost:4000/cliente/'+id;
  fetch(url , { method: 'DELETE' }) .then(() => console.log("elimino tru"));
}

const Buscar = () => {
    if(filtro=="Nombre" && campo_buscar != ""){
    setClientes ([])
    fetch("http://localhost:4000/cliente/filtro/"+campo_buscar+"/"+'""' +"/"+'""')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setClientes(response);
      console.log("if 1", response);
    });
  }else if(filtro==="Identificacion_cliente" && campo_buscar != ""){
    fetch("http://localhost:4000/cliente/filtro/"+'""'+"/"+campo_buscar +"/"+'""')
    .then((response) => {
    return response.json();
    })
  .then((response) => {
    setClientes(response);
    console.log("if 2", response);
  });
  }else if(filtro==="Direccion_Cliente" && campo_buscar != "") {
    fetch("http://localhost:4000/cliente/filtro/"+'""'+"/"+'""' +"/"+campo_buscar)
    .then((response) => {
    return response.json();
  })
    .then((response) => {
    setClientes(response);
    console.log("if 3", response);
  });
  }else{
  console.log("-------", campo_buscar);
  fetch('http://localhost:4000/cliente')
    .then(response => {
    return response.json();
    })
    .then(response => {
    setClientes(response);
    console.log("fuera del else", campo_buscar);
    }) 
  }
  }

  const customStyles = {
  rows: {
    style: {
      minHeight: '0px', 
    }
  },
  headCells: {
    style: {
      background: 'rgb(45, 121, 244)',
      paddingLeft: '8px', 
      paddingRight: '0px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', 
      paddingRight: '8px',
    },
  },
};

createTheme('solarized', {
  text: {
    primary: '#FBFCFC',
    secondary: '#FBFCFC',
  },
  background: {
    default: '#305bdc  ',
  },
  context: {
    background: '#17202A',
    text: '#17202A',
  },
  divider: {
    default: '#17202A ',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

if(varSesion=="true"){ 

    return(

    <form>
    
    {<TablaNavegacion id_usuario={id_usuario}></TablaNavegacion>}
    <div id="titInicio">
        <h1>REGISTRAR CLEINTE</h1>
        </div>
      <br />

            <div id="subTitInicio">
              <h1><center><label>
                  Tabla Clientes
              </label></center></h1>

            </div>

            <br />
            <div id="tablInicio">
              <div id="fromInicio">
                <div id="optInicio">

              <Button variant="success" type="submit" onClick={Crear}>Crear </Button>
              </div>

              <div id="inpInicio">
              <InputGroup className="mb-3">
              <Form.Control  name="busquedad"
                onChange={(event) => setCampo_buscar(event.target.value)}
                placeholder="Buscar"
                type="text"
              />
              <Button color="danger" onClick={Buscar}>Buscar</Button>
              </InputGroup>

              </div>

              <div id="selInicio">
              <Form.Select aria-label="Default select example"
                value={filtro}  onChange={(event) => setFiltro(event.target.value)} >
                <option value="Nombre">Nombre</option>
                <option value="Identificacion_cliente" >Identificación</option>
                <option value="Direccion_Cliente" >Dirección</option>
                </Form.Select>
                </div>
                </div>
                <br></br>

                <div id="dataInicio">
              <DataTable
                responsiveLayout="scroll"
                theme="solarized"
                customStyles={customStyles}
                columns={columns}
                data={clientes}
                pagination>
              </DataTable>

              </div>

              </div>

              </form>

    )
  }else{
    navigate("/");
  }

  }
  export default TablaClientes