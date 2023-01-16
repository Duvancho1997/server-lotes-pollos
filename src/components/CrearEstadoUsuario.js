import { useState } from "react";
import "../css/crearestadousuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

export  default function CrearEstadoUsuario() {

  const navigate = useNavigate();
  const [id_ref_usuario, setId_ref_usuario] = useState();
    const [estado, setEstado] = useState('Activo');
    const [permiso, setPermiso] = useState(0);
    const {id } = useParams();

    const Regresar = () => {
      navigate("/TablaUsuario");
    }

    const crearEstadoUsuario=()=>{
      var url = 'http://localhost:4000/estado_usuario';
      var data = 
        {
          Id_ref_usuario: id,
          Estado: estado,
          Permiso: permiso,
    };  
        fetch(url, {
        method: 'POST', 
          headers:{
          'Access-Control-Allow-Origin':'*', 
          'Content-Type':'application/json' 
          }, 
           body: JSON.stringify(data)
        })
    .then(res => res.json())
    .catch(error => console.error('Error:', error) )
    .then(response => console.log('Success:', response));  
   navigate("/TablaUsuario");
  }

  return(
    <div className="col-sm-3 offset-sm-4">
    <div id="fondEstadUsuar">


    <center><h3>Insertar Estado Usuario</h3></center>
              
    <hr></hr>
             
                   
                  
                     <label>
                     Referncia usuario
                     </label>
                     
                     <input
                       className="form-control"
                       value={id}
                       type="text"
                       name="Id_ref_usuario"
                       onChange={event => setId_ref_usuario(event.target.value)}
                     />
                  <br></br>
                   
                   
                     <label>
                     Estado
                     </label>
                     <input
                        value={estado}
                        className="form-control"
                        name="Estado"
                        type="text"
                        onChange={event => setEstado(event.target.value)}
                     />
                     
                   
                   <br></br>
                 
                     <label>
                     Permiso
                     </label>
                     {" "}
                     <Form.Select  aria-label="Default select example" onChange={event => setPermiso(event.target.value)}>
                        <option value="nivel 1">Nivel 1</option>
                        <option value="nivel 2">Nivel 2</option>
                        <option value="nivel 3">Nivel 3</option>
                      </Form.Select>
                      
                   <br></br>
                 
                      <hr></hr>
                      <center>

                <Button
                  color="primary" type="submit"
                  onClick={crearEstadoUsuario}>
                  Insertar
                </Button>
{" "}
                <Button 
                  className="btn btn-danger"
                  onClick={Regresar}>
                  Cancelar
                </Button>

                </center>
              
            </div>
            </div>
  )

}