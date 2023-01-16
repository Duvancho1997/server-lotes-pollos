import DataTable,{createTheme} from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TablaNavegacion from "../components/TablaNavegacion";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import "../css/inicio.css";
import { Button } from 'react-bootstrap';
import InicioSeccion from "./InicioSeccion";

  function Inicio() {

  var varSesion = sessionStorage.getItem("inicioSeccion");
  const [id_lote, setId_lote] = useState("");
  const [campo_buscar, setCampo_buscar] = useState("");
  const [filtro, setFiltro] = useState("Id_lote");
  const [estado_lote, setEstado_lote] = useState("Activo");
  const [lote_produccion, setLote_produccion] = useState([]);
  const { id_usuario } = useParams();
  const navigate = useNavigate();
  const [tipo_variable, setTipoVariable] = useState(0);
  var  item_value = sessionStorage.getItem("item_key")

const columns = [
  {
    name: 'Lote N°',
    selector: row => row.Id_lote
  },
  {
    name: 'Fecha Entrada Pollos',
    selector: row => row.Fecha_entrada_pollos.substr(0,10)
  },
  {
    name: 'Fecha Sacrificio Final',
    selector: row => row.Fecha_sacrificio_final.substr(0,10)
  },
  {
    name: 'Estado Lote',
    selector: row => row.Estado_lote
  },
  {
    name:'Acción',
    cell: row => <Button variant="success" onClick={()=>BotonIr(row)}>Ir</Button>
  }
]

const BotonIr = (row) => {
  if (estado_lote == "Activo") {
    var id_lote = row['Id_lote']
    setId_lote(row['Id_lote'])
    console.log("id lote",id_lote)
    navigate(`/RegistrarLote/${id_lote}`);
  }else if(estado_lote == "Terminado") {
    var id_lote = row['Id_lote']
    setId_lote(row['Id_lote'])
    console.log("id lote",id_lote)
    navigate(`/Reportes/${id_lote}`);
  }
};

  useEffect(() => {
    setLote_produccion([]);
    fetch("http://localhost:4000/filtro_estado/" + estado_lote)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLote_produccion(response);
        console.log("listalotes:", response);
      });
  }, [estado_lote]);

  useEffect(() => {
    if (filtro == "Id_lote"){
setTipoVariable('number')
    }else if (filtro == "Fecha_entrada_pollos"){
      setTipoVariable('Date')
    }else if (filtro == "Fecha_sacrificio_final"){
      setTipoVariable('Date')
    }
  }, [filtro]);

  const Buscar = () => {
    if (estado_lote == "Activo") {
      if (filtro == "Id_lote" && campo_buscar != "") {
        console.log("id lote lleno activo");
        setLote_produccion([]);
        fetch ("http://localhost:4000/filtro_estado/id/" +campo_buscar +"/" +estado_lote)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      }  else if (filtro == "Fecha_entrada_pollos" && campo_buscar != "") {
        console.log("Fecha_entrada_pollos lleno activo");
        setLote_produccion([]);
        fetch(
          "http://localhost:4000/filtro_estado/entrada/" + campo_buscar + "/" + estado_lote
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      } else if (filtro == "Fecha_entrada_pollos" && campo_buscar == "") {
        console.log("Fecha_entrada_pollos vacio activo");
        setLote_produccion([]);
        fetch(
          "http://localhost:4000/filtro_estado/entrada/" + campo_buscar + "/" + estado_lote
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      } else if (filtro == "Fecha_sacrificio_final" && campo_buscar != "") {
        console.log("Fecha_sacrificio_final lleno activo");
        setLote_produccion([]);
        fetch(
          "http://localhost:4000/filtro_estado/sacrificio/" + campo_buscar + "/" + estado_lote
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      } else if (filtro == "Fecha_sacrificio_final" && campo_buscar == "") {
        console.log("Fecha_sacrificio_final vacio activo");
        setLote_produccion([]);
        fetch("http://localhost:4000/filtro_estado/sacrificio/" + campo_buscar + "/" + estado_lote)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      }  else  {
        setLote_produccion([]);
        fetch("http://localhost:4000/filtro_estado/" + estado_lote)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      }
//--------------------------------------------------------------------------
    } else if (estado_lote == "Terminado") {
      if (filtro == "Id_lote" && campo_buscar != "") {
        console.log("id lote lleno terminado");
        setLote_produccion([]);
        fetch(
          "http://localhost:4000/filtro_estado/id/" +
            campo_buscar +
            "/" +
            estado_lote
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      } else if (filtro == "Fecha_entrada_pollos" && campo_buscar != "") {
        console.log("Fecha_entrada_pollos lleno terminado");
        setLote_produccion([]);
        fetch(
          "http://localhost:4000/filtro_estado/entrada/" + campo_buscar + "/" + estado_lote
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      } else if (filtro == "Fecha_entrada_pollos" && campo_buscar == "") {
        console.log("Fecha_entrada_pollos vacio terminado");
        setLote_produccion([]);
        fetch(
          "http://localhost:4000/filtro_estado/entrada/" + campo_buscar + "/" + estado_lote
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      } else if (filtro == "Fecha_sacrificio_final" && campo_buscar != "") {
        console.log("Fecha_sacrificio_final lleno terminado");
        setLote_produccion([]);
        fetch(
          "http://localhost:4000/filtro_estado/sacrificio/" + campo_buscar + "/" + estado_lote
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      } else if (filtro == "Fecha_sacrificio_final" && campo_buscar == "") {
        console.log("Fecha_sacrificio_final vacio terminado");
        setLote_produccion([]);
        fetch(
          "http://localhost:4000/filtro_estado/sacrificio/" + campo_buscar + "/" + estado_lote
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      }else {
        setLote_produccion([]);
        fetch("http://localhost:4000/filtro_estado/" + estado_lote)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setLote_produccion(response);
            console.log("listalotes:", response);
          });
      }
    }
  };

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

  return (

    <form>
    <div id="contInicio">
      {<TablaNavegacion id_usuario={id_usuario}></TablaNavegacion>}
      <div id="titInicio">
        <h1><p>INICIO</p></h1>

      </div>
      <br></br>
      <div id="subTitInicio">
      <center><h1><p>Gestión Lotes</p></h1></center>

      </div>

          <br />
            <div id="tablInicio">
                <div id="fromInicio">
                  <div id="optInicio">
                  <Form.Select aria-label="Default select example"   value={estado_lote}
                    onChange={(event) => setEstado_lote(event.target.value)}>
                    <option value="Activo">Activo</option>
                    <option value="Terminado">Terminado</option>
                  </Form.Select>

                  </div>

                  <div id="inpInicio">
                  <InputGroup className="mb-3">
                    <Form.Control  name="busquedad"
                      type={tipo_variable} 
                      value={campo_buscar} 
                      placeholder="Buscar" 
                      onChange={(event) => setCampo_buscar(event.target.value)}/>
                    <Button 
                      variant="primary" 
                      onClick={Buscar}>
                      Buscar
                    </Button>
                  </InputGroup>
                </div>

                <div id="selInicio">
                  <Form.Select aria-label="Default select example"
                    value={filtro}
                    onChange={(event) => setFiltro(event.target.value)}>
                    <option value="Id_lote">Lote N°</option>
                    <option value="Fecha_entrada_pollos" >Fecha Entrada</option>
                    <option value="Fecha_sacrificio_final" >Fecha Sacrificio</option>
                  </Form.Select>
                </div>
        </div>

          <br></br>

    <div id="dataInicio">
    <DataTable 
      responsiveLayout="scroll"
      columns={columns}
      data={lote_produccion}
      customStyles={customStyles}
      theme="solarized"
      pagination>
    </DataTable>

    </div>

    </div>

    </div>
    </form>
  );
}else{
  navigate("/");
}
}
export default Inicio;