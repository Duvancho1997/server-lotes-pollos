import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

export  default function TablaGastosVentas(props) {

    const navigate = useNavigate();
    const [gastos_ventas , setGastos_ventas] = useState([]);
    const [id_gastos_ventas , setId_gastos_ventas] = useState('');

    const columns = [
      {
        name: 'Fecha gasto',
        selector: row => row.Fecha_gasto.substr(0,10)
      },
      {
        name: 'Gasto creado',
        selector: row => row.Gasto_creado
      },
      {
        name: 'Precio',
        selector: row => row.Precio
      },
      {
        name: 'Cantidad',
        selector: row => row.Cantidad
      },
      {
        name: 'Descripcion gasto',
        selector: row => row.Descripcion_gasto
      },
      {
        name:'Total',
        selector: row => (row.Cantidad*row.Precio).toFixed(2)
      },
      {
        name:'Editar',
        cell: row => <Button variant="success" type="submit" onClick={()=>abrirEditarGastosVentas(row)}>Editar</Button>,
      },
      {
        name:'Eliminar',
        cell: row => <Button variant="danger" type="submit" onClick={()=>eliminarGastosVentasId(row['Id_gastos_venta'])}>Eliminar</Button>
      }
    ]

    const Crear = () => {
        navigate(`/CrearGastosVentas/${props.Id_lote_venta_total}`);
      }

      useEffect(()=>{
        var ref=props.Id_lote_venta_total
        fetch('http://localhost:4000/gastos_ventas/ref/'+ref)
        .then(response => {
            return response.json();
        })
        .then(response => {
          setGastos_ventas(response);
        })
      },[]); 

      const abrirEditarGastosVentas=(row)=>{
        var id = row['Id_gastos_venta']
        setId_gastos_ventas(row['Id_gastos_venta'])
        navigate(`/EditarGastosVentas/${id}`);
      }

      const eliminarGastosVentasId = (id)=>{
        var url = 'http://localhost:4000/gastos_Ventas/'+id;
        fetch(url , { method: 'DELETE' }) .then(() => console.log("elimino tru"));
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

      return(

        <form>

                  <Button variant="success"  type="submit" onClick={Crear}>Crear</Button>{" "}

                  <br />
                  <br />
                  <div id="dataInicio">
                  <DataTable
                    customStyles={customStyles}
                    responsiveLayout="scroll"
                    theme="solarized"
                    columns={columns}
                    data={gastos_ventas}
                    pagination>
                  </DataTable>
                  </div>
        </form>
        
        )

}

