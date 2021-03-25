import React, { useCallback, useEffect, useState } from 'react'
import Pendiente from '../components/Pendiente'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { auth, db } from '../utils/firesbase'; 
import { withRouter } from 'react-router';

function DashboardView({history, session}) {

  const [tareas, setTareas] = useState([]);
  
  useEffect(() => {
    console.log(tareas);
    if(!auth.currentUser) {
      console.log('no hay usuario');
      history.replace('/login')
    } else {
      obtenerTareas()
    }
  }, [])
    
    
  const obtenerTareas = useCallback(async () => {
    try {
      const data = await db.collection(session.uid).get()
      const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setTareas(arrayData)

    } catch (error) {
      console.log(error);
    }
  }, [])

  const agregarTarea = async () => {
    const materia = document.querySelector('#materia');
    const fechaEntrega = document.querySelector('#fecha-entrega');
    const descripcion = document.querySelector('#descripcion');
    try {
      const nuevaTarea = {
        materia: materia.value,
        fechaEntrega: fechaEntrega.value,
        descripcion: descripcion.value
      }
      const data = await db.collection(session.uid).add(nuevaTarea)
      setTareas([...tareas, {id: data.id, ...nuevaTarea}])

      materia.value = '';
      fechaEntrega.value = '';
      descripcion.value = '';
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarTarea = async (id) => {
    try {
      await db.collection(session.uid).doc(id).delete();
      const nuevoArray = tareas.filter(tarea => tarea.id !== id)
      setTareas(nuevoArray)

    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (id, materia, fechaEntrega, descripcion) => {
    try {
      await db.collection(session.uid).doc(id).update({
        materia: materia,
        fechaEntrega: fechaEntrega,
        descripcion: descripcion
      });
      const nuevoArray = tareas.map( tarea => (
        tarea.id === id ? {id: tarea.id, fechaEntrega: fechaEntrega, materia: materia, descripcion: descripcion} : tarea
      ))
      setTareas(nuevoArray)

    } catch (error) {
      console.log(error);
    }
  }

  const handleAgregarTarea = (e) => {
    e.preventDefault()

    const materia = document.querySelector('#materia');
    const fechaEntrega = document.querySelector('#fecha-entrega');
    const descripcion = document.querySelector('#descripcion');
    
    let errors = 0;
    
    if(materia.value === '') {
      materia.classList.add('is-invalid');
      errors++;
    }

    if(fechaEntrega.value === '') {
      fechaEntrega.classList.add('is-invalid');
      errors++;
    }

    if(descripcion.value === '') {
      descripcion.classList.add('is-invalid');
      errors++;
    }
    
    if( errors === 0 ) {
      materia.classList.remove('is-invalid');
      descripcion.classList.remove('is-invalid');
      fechaEntrega.classList.remove('is-invalid');
            
      agregarTarea()
    }
    
  }

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        history.push('/login')
      })
  }

  return session !== !!null ? (
    <div className="bg-light">
      <div className="container">
        <div className="row min-vh-100 w-100 py-5 align-items-start">          
          <div className="col">
                <ResponsiveMasonry>
                  <Masonry gutter="24px">
                    {
                      tareas.map((tarea) => (
                        <div key={tarea.id}>
                          <Pendiente
                            id={tarea.id}
                            materia={tarea.materia}
                            fechaEntrega={tarea.fechaEntrega}
                            descripcion={tarea.descripcion}
                            eliminar={ eliminarTarea }
                            editar={ editarTarea } />
                        </div>
                      ))
                    }
                  </Masonry>
                </ResponsiveMasonry>
          </div>
          <div className="col-md-3" style={{maxHeight: '100vh'}}>
            <div className="d-grid gap-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <img src="/logoPag.png" className="d-block w-50 mx-auto mb-3" alt=""/>
                  <h5 className="text-center">¡Bienvenido de nuevo!</h5>
                </div>
              </div>
              <form onSubmit={ handleAgregarTarea } className="card shadow-sm">
                <div className="card-body">
                  <h5 className="car-title mb-0">Nueva tarea</h5>
                  <hr className="mb-4 mt-2"/>
                  <div className="mb-3">
                    <input type="text" className="form-control" id="materia" placeholder="Unidad de aprendizaje"/>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" id="fecha-entrega" placeholder="Fecha de entrega"/>
                  </div>
                  <div className="mb-3">
                    <textarea className="form-control" rows="3" id="descripcion" placeholder="Detalles de la tarea..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary d-block w-100">Agregar pendiente</button>
                </div>
              </form>
              <button className="btn btn-danger mt-5" onClick={ handleLogout }>Salir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default withRouter(DashboardView)