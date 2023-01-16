import { useState,useEffect } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,  ModalHeader, ModalBody, FormGroup, ModalFooter} from "reactstrap";
import { useNavigate, useParams} from 'react-router-dom';

export  default function EditarValorUnidadMedida() {

    const navigate = useNavigate();
    const [valor_unidad_medida, setValor_unidad_medida] = useState([]);
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [valor, setValor] = useState(0);
    const {id } = useParams();

    const Regresar = () => {
      navigate("/TablaValorUnidadMedida");
    }
    
    useEffect(()=>{
      fetch('http://localhost:4000/valor_unidad_medida/'+id)
      .then(response => {
          return response.json();
      })
      .then(response => {
        setValor_unidad_medida(response); 
        setFecha(response['Fecha']);
        setDescripcion(response['Descripcion']);
        setValor(response['Valor']);
      })
    },[]); 

    const editarValorUnidadMedida =()=>{
      var url = 'http://localhost:4000/valor_unidad_medida/'+id;
      var data = 
        {  
          Fecha: fecha,
          Descripcion: descripcion,
          Valor: valor,
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
      navigate("/TablaValorUnidadMedida");
    }

    return(
      <div>
           
                <ModalHeader>
                 <div><h3>Editar Valor Unidad Medida</h3></div>
                </ModalHeader>
      
                <ModalBody>
                 
                  <FormGroup>
                    <label>
                    Fecha
                    </label>
                    
                    <input
                      className="form-control"
                      value={fecha}
                      onChange={event =>  setFecha(event.target.value)}
                      type="text"
                      name="Fecha"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>
                    Descripcion
                    </label>
                    <input
                     value={descripcion}
                      className="form-control"
                      name="Descripcion"
                      type="text"
                      onChange={event => setDescripcion(event.target.value)}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>
                    Valor
                    </label>
                    <input
                      value={valor}
                      className="form-control"
                      name="Valor"
                      type="number"
                      onChange={event => setValor(event.target.value)}
                    />
                  </FormGroup>
  
                </ModalBody>
      
                <ModalFooter>
  
                  <Button
                    color="primary" type="submit"
                    onClick={editarValorUnidadMedida}>
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