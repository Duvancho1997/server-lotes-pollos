import { useState } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import { Button,  ModalHeader, ModalBody, FormGroup, ModalFooter} from "reactstrap";

export  default function CrearLotes() {

  const navigate = useNavigate();
  const [fecha_creacion_lote_sistema, setFecha_creacion_lote_sistema] = useState('');
  const [fecha_terminacion_lote_sistema, setFecha_terminacion_lote_sistema] = useState('');
  const [estado_lote, setEstado_lote] = useState('');
  const [id_referencia_usuario, setId_referencia_usuario] = useState('');

  const Regresar = () => {
    navigate("/TablaLotes");
  }

  const crearLotes=()=>{
    var url = 'http://localhost:4000/lotes';
    var data = 
      {
        Fecha_creacion_lote_sistema: fecha_creacion_lote_sistema,
        Fecha_terminacion_lote_sistema:  fecha_terminacion_lote_sistema,
        Estado_lote: estado_lote,
        Id_referencia_usuario: id_referencia_usuario,
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
 navigate("/TablaLotes");
}

return(

  <div>
    
        <ModalHeader>
        <div><h3>Insertar Usuario</h3></div>
       </ModalHeader>
  
       <ModalBody>
        
         <FormGroup>
           <label>
           Fecha creacion lote sistema
           </label>
           
           <input
             className="form-control"
             onChange={event => setFecha_creacion_lote_sistema(event.target.value)}
             type="date"
             name="Fecha_creacion_lote_sistema"
           />
         </FormGroup>
         
         <FormGroup>
           <label>
           Fecha terminacion lote sistema 
           </label>
           <input
             className="form-control"
             name="Fecha_terminacion_lote_sistema"
             type="date"
             onChange={event => setFecha_terminacion_lote_sistema(event.target.value)}
           />
         </FormGroup>
         
         <FormGroup>
           <label>
           Estado_lote
           </label>
           <input
             className="form-control"
             name="Estado_lote"
             type="text"
             onChange={event => setEstado_lote(event.target.value)}
           />
         </FormGroup>
  
         <FormGroup>
           <label>
           Id_referencia_usuario
           </label>
           <input
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
            onClick={crearLotes}>
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