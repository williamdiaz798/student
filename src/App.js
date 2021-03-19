import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './App.css';
import axios from 'axios'
import MarerialTable from 'material-table'
import React, { Component } from 'react';
import {Modal} from '@material-ui/core'


const MySwal = withReactContent(Swal)
const columnas=[
  {
      title:'Nombre',
      field:'name'
  },
  {
    title:'Edad',
    field:'age'
  },
  {
    title:'Numero de reguistro',
    field:'registrationNumber'
  }
]
const mobalStyle = {
  marginTop: '5%' 
}


class App extends Component {

  state = {
    estudiantes:[],
    estudiante:
      {
        'Name':'',
        'Age':'',
        'RegistrationNumber':''
      }
    ,
    modalInsertar: false,
    modalEditar:false,
    success: false,
    errorMSG: ''
  }

  mostrarAlerta = (registro) =>{
    MySwal.fire({
        title: 'Desea eliminar el usuario con registro: ' + registro,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            this.elimimar(registro)
          )
        }
      })
  }

  manejadorSubmit = e =>{
    e.preventDefault()
  }

  manejadorChangeCrear = async e =>{
    await this.setState({
      estudiante:{
            ...this.state.estudiante,
            [e.target.name]: e.target.value
        }
    })
  }

  abrirCerrarModalInsertar=()=>{
    this.setState({
        modalInsertar: !this.state.modalInsertar
    })
  }

  abrirCerrarModalEditar=(id)=>{
    if(this.state.modalEditar === false){
      this.state.estudiantes.map((estudiante) =>{
        if(estudiante.registrationNumber === id){
          this.setState({
            estudiante:{
              'Name' : estudiante.name,
              'Age' : estudiante.age,
              'RegistrationNumber' : estudiante.registrationNumber
            },
            modalEditar: !this.state.modalEditar
          })
          console.log(this.state.estudiante)
        }
      })
    }else{
      this.setState({
        modalEditar: !this.state.modalEditar
      })
    }
  }

  componentDidMount(){
    let url = 'https://studentregistrerweem2021.azurewebsites.net/api/StudentRetriveController?code=5ca2BTotnt21N57WYCF3bTjdRwUvxUs2EcU/DupnqeVBHTOpef75DA=='
        axios.post(url)
        .then( response =>{
            if(response.data){
              this.setState({
                estudiantes: response.data,
              })
            }
        }).catch(error =>{
            console.log(error)
        })
  }

  manejadorBotonCrear =() =>{
    let url = 'https://studentregistrerweem2021.azurewebsites.net/api/StudentRegistrationFunction?code=qaQRzSyyieiVcxr8YsVcAgfFOjJSLeOTl1r6of9uv9E3aDCuBa0lZw=='
    axios.post(url, this.state.estudiante)
    .then( response =>{
      this.componentDidMount()
    }).catch(error =>{
        console.log(error)
        this.setState({
            error: true,
            errorMSG: 'No se puede comunicar con el servidor'
        })
    })
  }

  manejadorBotonEditar =() =>{
    let url = 'https://studentregistrerweem2021.azurewebsites.net/api/StudentUpdateFunction?code=Bj0MaQWAeo0ACJTehk1M6wEzDXaPTulfXxJTLx6rXRdoJiteajyOIw=='
    console.log(this.state.estudiante)
    axios.put(url, this.state.estudiante)
    .then( response =>{
      this.componentDidMount()
    }).catch(error =>{
        console.log(error)
        this.setState({
            error: true,
            errorMSG: 'No se puede comunicar con el servidor'
        })
    })
  }

  elimimar = (id) =>{
    let url = 'https://studentregistrerweem2021.azurewebsites.net/api/StudentDelete?code=ZgcmcKocZH3iNbvhaBXnApWmp4789gZdQ8DzMkt/dSa1vdWlYNiA0A==&RegistrationNumber='+id
    axios.delete(url)
    .then( response =>{
      this.componentDidMount()
    }).catch(error =>{
        console.log(error)
        this.setState({
            error: true,
            errorMSG: 'No se puede comunicar con el servidor'
        })
    })
  }

  render(){

    const bodyInsertar=(
      <div className="container white position-sticky" style={mobalStyle}>
        <br/>
        <h2>Agregar estudiante</h2>
          {this.state.success === true &&
              <div id="error" className="alert alert-success ocultar">
                  {this.state.errorMSG}
              </div>
          }
          <form onSubmit={this.manejadorSubmit} method="POST" id='formUser'>
            <div className="mb-3">
              <label className="labelCorreo">Nombre</label>
              <input type="text" className="form-control" id="nombreEstudiante" name="Name" aria-describedby="emailHelp" required  onChange={this.manejadorChangeCrear}/>
            </div>
            <div className="mb-3">
              <label className="labelCorreo">Edad</label>
              <input type="number" className="form-control" id="edadEstudiante" name="Age" aria-describedby="emailHelp" required  onChange={this.manejadorChangeCrear}/>
            </div>
            <div className="mb-3">
              <label className="labelCorreo">Nro registro</label>
              <input type="numbre" className="form-control" id="registroEstudiante" name="RegistrationNumber" aria-describedby="emailHelp" required  onChange={this.manejadorChangeCrear}/>
            </div>
            <button type="submit" className="btn btn-light"  onClick={this.manejadorBotonCrear}>Guardar</button>
            <button type="submit" className="btn btn-light"  onClick={this.abrirCerrarModalInsertar}>Cancelar</button>
          </form>
          <br/>
      </div>
    )

    const bodyEditar=(
      <div className="container white position-sticky" style={mobalStyle}>
          <br/>
        <h2>Editar estudiante</h2>
          <form onSubmit={this.manejadorSubmit} method="POST" id='formUser'>
            <div className="mb-3">
              <label className="labelCorreo">Nombre</label>
              <input type="text" className="form-control" id="nombreEstudiante" name="Name" aria-describedby="emailHelp" required  onChange={this.manejadorChangeCrear} defaultValue={this.state.estudiante.Name}/>
            </div>
            <div className="mb-3">
              <label className="labelCorreo">Edad</label>
              <input type="number" className="form-control" id="edadEstudiante" name="Age" aria-describedby="emailHelp" required  onChange={this.manejadorChangeCrear} defaultValue={this.state.estudiante.Age}/>
            </div>
            <div className="mb-3">
              <label className="labelCorreo">Nro registro</label>
              <input type="numbre" className="form-control" id="registroEstudiante" name="RegistroEstudiante" aria-describedby="emailHelp" required  disabled value={this.state.estudiante.RegistrationNumber}/>
            </div>
            <button type="submit" className="btn btn-light"  onClick={this.manejadorBotonEditar}>Guardar</button>
            <button type="submit" className="btn btn-light"  onClick={this.abrirCerrarModalEditar}>Cancelar</button>
          </form>
          <br/>
      </div>
    )


    return (
      <>
      <div className="container pt-5">
        <br/>
        <br/>
        <h1>Administracion de estudiantes</h1>
        <button className='btn btn-dark' onClick={this.abrirCerrarModalInsertar}>Crear usuario</button>
        <br/>
        <br/>
        <MarerialTable 
          columns={columnas}
          data={this.state.estudiantes}
          title="Estudiantes"
          options={{
            actionsColumnIndex:-1,
              headerStyle: {
                  backgroundColor: '#212121',
                  color: '#FFF'
                }
            }}
          actions={[
            {
                icon: 'edit',
                tooltip: 'Editar usuario',
                onClick: (event, rowData)=>this.abrirCerrarModalEditar(rowData.registrationNumber)
            },
            {
                icon: 'remove',
                tooltip: 'Cambiar estado',
                onClick: (event, rowData)=>this.mostrarAlerta(rowData.registrationNumber)
            }
          ]}

          localization={{
              pagination:{
                  labelDisplayedRows: '{from}-{to} de {count}',
                  labelRowsSelect: 'Registros',
                  firstAriaLabel: 'Primera',
                  firstTooltip: 'Primera',
                  previousAriaLabel: 'Anterior',
                  previousTooltip: 'Anterior',
                  nextAriaLabel: 'siguiente',
                  nextTooltip: 'siguiente',
                  lastAriaLabel: 'Ultima',
                  lastTooltip: 'ultima'
              },
              header:{
                  actions: 'Acciones'
              },
              toolbar:{
                    searchTooltip: 'Buscar',
                    searchPlaceholder: 'Buscar'
              }
              }}
        />
      </div>
        <Modal
          open={this.state.modalInsertar}
          onClose={this.abrirCerrarModalInsertar}>
            {bodyInsertar}
        </Modal>

        <Modal
          open={this.state.modalEditar}
          onClose={this.abrirCerrarEditar}>
              {bodyEditar}
        </Modal>
      </>
    );
  }
}

export default App;
