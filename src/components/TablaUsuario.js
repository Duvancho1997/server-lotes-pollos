import DataTable,{createTheme} from "react-data-table-component";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TablaNavegacion from "../components/TablaNavegacion";

  function TablaUsuario() {

  const navigate = useNavigate();
  var varSesion = sessionStorage.getItem("inicioSeccion");
  const [campo_buscar, setCampo_buscar] = useState("");
  const [filtro, setFiltro] = useState("Nombre");
  const [usuarios , setUsuarios] = useState([]);
  const [id_usuario, setId_usuario] = useState('');
  var  item_value = sessionStorage.getItem("item_key");

  const columns = [
    {
      name: 'Identificación',
      selector: row => row.Identificacion
    },
    {
      name: 'Nombre',
      selector: row => row.Nombre
    },
    {
      name: 'Apellido',
      selector: row => row.Apellido
    },
    {
      name: 'Correo Usuario',
      selector: row => row.Correo_usuario
    },
    {
      name: 'Numero Contacto',
      selector: row => row.Numero_contacto
    },
    {
      name: 'Contraseña',
      selector: row => row.Contrasena
    },
    {
      name: 'Nombre Usuario',
      selector: row => row.Nombre_usuario
    },
    {
      name:'Editar',
      cell: row => <Button type="submit" variant="success" onClick={()=>abrirEditarUsuario(row)}>Editar</Button>,
    },
    {
      name:'Roles',
      cell: row => <Button type="submit" variant="danger" onClick={()=>Permisos(row)}>Permisos</Button>
    },
  ]

const Crear = () => {
  navigate("/CrearUsuario");
}

const Permisos=(columns)=>{
    console.log("hola",columns)
    var url = 'http://localhost:4000/estado_usuario/crear/'+columns.Id_usuario;
    fetch(url)
      .then(response => {
    return response.json() 
    })
      var id = columns.Id_usuario
      navigate(`/CrearEstadoUsuario/${id}`);
  }

useEffect(()=>{
  console.log('useEffect')
  fetch('http://localhost:4000/users')
  .then(response => {
      return response.json();
  })
  .then(response => {
    setUsuarios(response);
  })
},[]); 

const abrirEditarUsuario=(row)=>{
  var id = row['Id_usuario']
  setId_usuario(row['Id_usuario'])
  navigate(`/EditarUsuario/${id}`);
}

const Buscar = () => {
  console.log("mentodo",campo_buscar)
  if(filtro=="Nombre" && campo_buscar != ""){
  setUsuarios ([])
  fetch("http://localhost:4000/users/filtro/"+campo_buscar+"/"+'""' +"/"+'""')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setUsuarios(response);
      console.log("if 1", response);
    });
}else if(filtro==="Identificacion" && campo_buscar != ""){
  fetch("http://localhost:4000/users/filtro/"+'""'+"/"+campo_buscar +"/"+'""')
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    setUsuarios(response);
    console.log("if 2", response);
  });
}else if(filtro==="Nombre_usuario" && campo_buscar != "") {
  fetch("http://localhost:4000/users/filtro/"+'""'+"/"+'""' +"/"+campo_buscar)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    setUsuarios(response);
    console.log("if 3", response);
  });
}else{
console.log("-------", campo_buscar);
  fetch('http://localhost:4000/users')
  .then(response => {
      return response.json();
  })
  .then(response => {
    setUsuarios(response);
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
        <h1><p>REGISTRAR USUARIO</p></h1>

      </div>
      <br></br>
      <div id="subTitInicio">
      <center><h1><p>Tabla de Usuarios</p></h1></center>
      </div>

            <br />  
            <div id="tablInicio">
              <div id="fromInicio">
                <div id="optInicio">
              <Button variant="success" onClick={Crear}>Crear</Button>
              </div>

              <div id="inpInicio">
              <InputGroup className="mb-3">
                <Form.Control  name="busquedad"
                  placeholder="Buscar" 
                  onChange={(event) => setCampo_buscar(event.target.value)}/>
              <Button onClick={Buscar}>Buscar</Button>
              </InputGroup>

              </div>

              <div id="selInicio">

              <Form.Select aria-label="Default select example"
                value={filtro}
                onChange={(event) => setFiltro(event.target.value)}>
                <option value="Nombre">Nombre</option>
                <option value="Identificacion" >Identificación</option>
                <option value="Nombre_usuario" >Usuarios</option>
              </Form.Select>
            </div>

              </div>

              <br></br>
              <div id="dataInicio">
              <DataTable
                customStyles={customStyles}
                theme="solarized"
                responsiveLayout="scroll"
                columns={columns}
                data={usuarios}
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
  export default TablaUsuario;