import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams} from 'react-router-dom';

import { Button } from 'react-bootstrap';
import "../css/crearregproduccionalimento.css";

export  default function CrearLoteVenta() {

    const { id_lote } = useParams();
    const navigate = useNavigate();
  
    const crearLoteVenta=()=>{
      console.log("----")
      var url = 'http://localhost:4000/lote_venta';
      var data = 
        {
          Id_ref_lote: id_lote,
          Total_pollos_vendidos: 0, 
          Peso_total_vendido: 0, 
          Valor_promedio_peso: 0, 
          Total_venta_lote: 0, 
          Ganancia_bruta: 0, 
          Promedio_total_peso: 0, 
          Promedio_venta_pollo: 0, 
          Cantidad_ventas: 0,
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
    .then(response => navigate(`/RegistroModuloVentas/${response[0].Id_lote_venta_total}`)); 
  }

  return(
      
    <div>
        
            
               <h3>Insertar lote de venta</h3>
             
    
              
                  <label>
                 Id lote
                  </label>
                  
                  <input
                    className="form-control"
                  value={id_lote}
                    type="text"
                    name="Id_ref_lote"
                  />
             

                <Button
                  color="primary" type="submit"
                  onClick={crearLoteVenta}>
                  Insertar
                </Button>

             
             
            </div>
  )

  }