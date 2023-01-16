import { useState,useEffect } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,  ModalHeader, ModalBody, FormGroup, ModalFooter} from "reactstrap";
import { useNavigate, useParams} from 'react-router-dom';

export  default function EditarEstadoUsuario() {

    const navigate = useNavigate();
    const [estado_usuario, setEstado_usuario] = useState([]);
    const [id_ref_usuario, setId_ref_usuario] = useState(0);
    const [estado, setEstado] = useState('');
    const [permiso, setPermiso] = useState(0);
    const [id_estado_usuario, setId_estado_usuario] = useState(0);
    const {id } = useParams();

    const Regresar = () => {
        navigate("/TablaUsuario");
      }

      useEffect(()=>{
        
        fetch('http://localhost:4000/estado_usuario/crear/'+id)
        .then(response => {
            return response.json();
        })
        .then(response => {
         
          setEstado_usuario(response[0]); 
          setId_ref_usuario(response[0].Id_ref_usuario);
          setEstado(response[0].Estado);
          setPermiso(response[0].Permiso);
          setId_estado_usuario(response[0].Id_estado_usuario);
        })
      },[]); 

      const editarEstadoUsuario =()=>{
        var ide= id_estado_usuario
        console.log('estdo id_editar'+id_estado_usuario)
        var url = 'http://localhost:4000/estado_usuario/'+ide;
        var data = 
          {  
            Id_ref_usuario: id_ref_usuario,
            Estado: estado,
            Permiso: permiso
        };
      fetch(url, {
        method: 'PUT',
        headers:{
            'Access-Control-Allow-Origin':'*', 
        'Content-Type':'application/json' 
      }, 
        body: JSON.stringify(data)
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
        navigate("/TablaUsuario");
      }

      return(
        <div>
             
                  <ModalHeader>
                   <div><h3>Editar Estado Usuario</h3></div>
                  </ModalHeader>
        
                  <ModalBody>
                   
                    <FormGroup>
                      <label>
                      referencia usuario 
                      </label>
                      
                      <input
                        className="form-control"
                        value={id_ref_usuario}
                        type="text"
                        name="Id_ref_usuario"
                        onChange={event => setId_ref_usuario(event.target.value)}
                      />
                    </FormGroup>
                    
                    <FormGroup>

                      <label>
                        Estado :
                        <select  onChange={event => setEstado(event.target.value)}>
                          <option >{estado}</option>
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>
                        </select>
                      </label>

                    </FormGroup>
                    
                    <FormGroup>

                      <label>
                      Permiso :
                        <select  onChange={event => setPermiso(event.target.value)}>
                        <option >{permiso}</option>
                          <option value="Nivel 1">Nivel 1</option>
                          <option value="Nivel 2">Nivel 2</option>
                          <option value="Nivel 3">Nivel 3</option>
                        </select>
                      </label>

                    </FormGroup>
    
                  </ModalBody>
        
                  <ModalFooter>
    
                    <Button
                      color="primary" type="submit"
                      onClick={editarEstadoUsuario}>
                      Insertar
                    </Button>
    
                    <Button 
                      className="btn btn-danger"
                      onClick={Regresar}>
                      Cancelar
                    </Button>
    
                  </ModalFooter>
                 
                </div>
        )

}