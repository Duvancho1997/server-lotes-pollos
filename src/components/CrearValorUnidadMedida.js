import { useState } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import { Button,  ModalHeader, ModalBody, FormGroup, ModalFooter} from "reactstrap";

export  default function CrearValorUnidadMedida() {

    const navigate = useNavigate();
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [valor, setValor] = useState(0);

    const Regresar = () => {
        navigate("/TablaValorUnidadMedida");
      }

      const crearValorUnidadMedida=()=>{
        var url = 'http://localhost:4000/valor_unidad_medida';
        var data = 
          {
            Fecha: fecha,
            Descripcion: descripcion,
            Valor: valor,
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
                      onChange={event =>  setFecha(event.target.value)}
                      type="date"
                      name="Fecha"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>
                    Descripcion
                    </label>
                    <input
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
                    onClick={crearValorUnidadMedida}>
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