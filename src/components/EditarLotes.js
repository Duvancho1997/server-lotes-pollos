import { useState,useEffect } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,  ModalHeader, ModalBody, FormGroup, ModalFooter} from "reactstrap";
import { useNavigate, useParams} from 'react-router-dom';

export  default function EditarLotes() {

    const navigate = useNavigate();
    const [lotes, setLotes] = useState([]);
    const [fecha_creacion_lote_sistema, setFecha_creacion_lote_sistema] = useState('');
    const [fecha_terminacion_lote_sistema, setFecha_terminacion_lote_sistema] = useState('');
    const [estado_lote, setEstado_lote] = useState('');
    const [id_referencia_usuario, setId_referencia_usuario] = useState('');
    const {id } = useParams();

    const Regresar = () => {
      navigate("/TablaLotes");
    }

    useEffect(()=>{
      fetch('http://localhost:4000/lotes/'+id)
      .then(response => {
          return response.json();
      })
      .then(response => {
        setLotes(response); 
        setFecha_creacion_lote_sistema(response['Fecha_creacion_lote_sistema']);
        setFecha_terminacion_lote_sistema(response['Fecha_terminacion_lote_sistema']);
        setEstado_lote(response['Estado_lote']);
        setId_referencia_usuario(response['Id_referencia_usuario']);
      })
    },[]); 

    const editarLotes =()=>{
      var url = 'http://localhost:4000/lotes/'+id;
      var data = 
        {  
          Fecha_creacion_lote_sistema: fecha_creacion_lote_sistema,
        Fecha_terminacion_lote_sistema:  fecha_terminacion_lote_sistema,
        Estado_lote: estado_lote,
        Id_referencia_usuario: id_referencia_usuario,
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
      navigate("/TablaLotes");
    }

    return(
      <div>
           
                <ModalHeader>
                 <div><h3>Editar Lotes </h3></div>
                </ModalHeader>
      
                <ModalBody>
        
        <FormGroup>
          <label>
          Fecha creacion lote sistema
          </label>
          
          <input
          value={fecha_creacion_lote_sistema}
            className="form-control"
            onChange={event => setFecha_creacion_lote_sistema(event.target.value)}
            type="text"
            name="Fecha_creacion_lote_sistema"
          />
        </FormGroup>
        
        <FormGroup>
          <label>
          Fecha terminacion lote sistema 
          </label>
          <input
          value={fecha_terminacion_lote_sistema}
            className="form-control"
            name="Fecha_terminacion_lote_sistema"
            type="text"
            onChange={event => setFecha_terminacion_lote_sistema(event.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <label>
          Estado lote
          </label>
          <input
          value={estado_lote}
            className="form-control"
            name="Estado_lote"
            type="text"
            onChange={event => setEstado_lote(event.target.value)}
          />
        </FormGroup>
 
        <FormGroup>
          <label>
          Id referencia usuario
          </label>
          <input
          value={id_referencia_usuario}
            className="form-control"
            name="Id_referencia_usuario"
            type="text"
            onChange={event => setId_referencia_usuario(event.target.value)}
          />
        </FormGroup>
 
      </ModalBody>
      
                <ModalFooter>
  
                  <Button
                    color="primary" type="submit"
                    onClick={editarLotes}>
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