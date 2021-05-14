import React, { useCallback, useEffect, useState } from 'react'
import Pendiente from '../components/Pendiente'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { auth, db } from '../utils/firesbase'; 
import { withRouter } from 'react-router';

function DashboardView({history, session}) {
  const [unidadesAprendizaje, setUnidadesAprendizaje] = useState([]);
  const [tareas, setTareas] = useState([]);
  
  useEffect(() => {
    if(!auth.currentUser) {
      console.log('no hay usuario');
      history.replace('/login')
    } else {
      obtenerUnidadesAprendizaje().then(() => {
        obtenerTareas()
      })
    }
  }, [])
    
  const obtenerUnidadesAprendizaje = useCallback(async () => {
    try {
      const data = await db.collection("usuarios").doc(session.uid).collection("materias").get();
      const arrayData = await data.docs.map(doc => ({ id: doc.id, active: true, ...doc.data() }));
      setUnidadesAprendizaje(arrayData)
    } catch (error) {
      console.log(error);
    }
  }, [])

  const obtenerTareas = useCallback(async () => {
    try {
      const data = await db.collection("usuarios").doc(session.uid).collection("tareas").get();
      const arrayData = await data.docs.map(doc => ({ id: doc.id, active: true, ...doc.data() }));
      setTareas(arrayData)
    } catch (error) {
      console.log(error);
    }
  }, [])

  const agregarTarea = async (nuevaTarea) => {
    try {
      const data = await db.collection("usuarios").doc(session.uid).collection("tareas").add(nuevaTarea);
      setTareas([...tareas, {id: data.id, active: true, ...nuevaTarea}]);
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarTarea = async (id) => {
    try {
      await db.collection("usuarios").doc(session.uid).collection("tareas").doc(id).delete();
      const nuevoArray = tareas.filter(tarea => tarea.id !== id)
      setTareas(nuevoArray)

    } catch (error) {
      console.log(error);
    }
  };

  const editarTarea = async (id, newData) => {
    try {
      await db.collection("usuarios").doc(session.uid).collection("tareas").doc(id).update(newData);
      const nuevoArray = tareas.map( tarea => (
        tarea.id === id
          ? {
            id: tarea.id,
            ...newData
          } : tarea
      ))
      setTareas(nuevoArray)

    } catch (error) {
      console.log(error);
    }
  }

  const ocultarTareas = (materiaId) => {
    const array = tareas.map(tarea => (
      tarea.materiaId === materiaId
        ? {
          ...tarea,
          active: false
        } : tarea
    ))
    setTareas(array)
  }

  const mostrarTareas = (materiaId) => {
    const array = tareas.map(tarea => (
      tarea.materiaId === materiaId
        ? {
          ...tarea,
          active: true
        } : tarea
    ))
    setTareas(array)
  }

  const filtrarTareas = (ua) => {
    const active = !ua.active

    active ? mostrarTareas(ua.id) : ocultarTareas(ua.id)

    const array = unidadesAprendizaje.map(unidadAprendizaje => (
      unidadAprendizaje.id === ua.id
        ? {
          ...unidadAprendizaje,
          active: active
        } : unidadAprendizaje
    ))

    setUnidadesAprendizaje(array)
  }

  const eliminarTareasPorMateria = (materiaId) => {
    try {
      tareas.forEach(async (tarea) => {
        if (tarea.materiaId === materiaId) {
          await db.collection("usuarios").doc(session.uid).collection("tareas").doc(tarea.id).delete();    
        }
      })
    } catch (error) {
      console.log(error);
    }

    const nuevoArray = tareas.filter(tarea => tarea.materiaId !== materiaId)
    setTareas(nuevoArray);
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
    } else {
      materia.classList.remove('is-invalid');
    }

    if(fechaEntrega.value === '') {
      fechaEntrega.classList.add('is-invalid');
      errors++;
    } else {
      fechaEntrega.classList.remove('is-invalid');
    }

    if(descripcion.value === '') {
      descripcion.classList.add('is-invalid');
      errors++;
    } else {
      descripcion.classList.remove('is-invalid');
    }
    
    if( errors === 0 ) {
      materia.classList.remove('is-invalid');
      descripcion.classList.remove('is-invalid');
      fechaEntrega.classList.remove('is-invalid');

      const nuevaTarea = {
        materiaId: materia.value,
        fechaEntrega: fechaEntrega.value,
        descripcion: descripcion.value
      }
            
      agregarTarea(nuevaTarea).then(() => {
        materia.value = unidadesAprendizaje[0].id;
        fechaEntrega.value = '';
        descripcion.value = '';
      });
    }
    
  }

  const agregarUnidadAprendizaje = async (nuevaUa) => {
    try {
      const data = await db.collection("usuarios").doc(session.uid).collection("materias").add(nuevaUa)
      setUnidadesAprendizaje([...unidadesAprendizaje, {id: data.id, ...nuevaUa}])
      
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarUnidadAprendizaje = async (uaId) => {
    eliminarTareasPorMateria(uaId);
    try {
      await db.collection("usuarios").doc(session.uid).collection("materias").doc(uaId).delete();
      const nuevoArray = unidadesAprendizaje.filter(ua => ua.id !== uaId);
      setUnidadesAprendizaje(nuevoArray);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAgregarUnidadAprendizaje = (e) => {
    e.preventDefault()

    const inputUaAdd = document.querySelector('#input-uaAdd');
    let errors = 0;

    if(inputUaAdd.value === '') {
      errors++;
    }

    if( errors === 0 ) {        
      const nuevaUa = {
        nombre: inputUaAdd.value
      }
      agregarUnidadAprendizaje(nuevaUa).then(() => {
        inputUaAdd.value = '';
      });
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
      <div className="container py-5">
        <div className="row min-vh-100 w-100 align-items-start">          
          <div className="col">
            <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 1200: 3}}>
              <Masonry gutter="24px">
                {
                  tareas.map((tarea) => (
                    tarea.active
                      ? (
                        <div key={tarea.id}>
                          <Pendiente
                            id={tarea.id}
                            materiaId={tarea.materiaId}
                            fechaEntrega={tarea.fechaEntrega}
                            descripcion={tarea.descripcion}
                            eliminar={ eliminarTarea }
                            materias={unidadesAprendizaje}
                            active={tarea.active}
                            editar={ editarTarea } />
                        </div>
                      ) : null
                  ))
                }
              </Masonry>
            </ResponsiveMasonry>
          </div>
          <div className="col-md-4 col-lg-3">
            <div className="d-grid gap-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <img src="/logoPag.png" className="d-block w-50 mx-auto mb-3" alt=""/>
                  <h5 className="text-center">¡Bienvenido de nuevo!</h5>
                </div>
              </div>
              <form onSubmit={ handleAgregarTarea } className="card shadow-sm">
                <div className="card-body">
                  <h5 className="car-title mb-0">Nuevo pendiente</h5>
                  <hr className="mb-4 mt-2"/>
                  <div className="mb-3">
                  <select className="form-select" aria-label="Default select example" id="materia" defaultValue={unidadesAprendizaje[0]}>
                    {
                      unidadesAprendizaje.map(ua => (
                        <option value={ua.id} key={ua.id}>{ua.nombre}</option>
                      ))
                    }
                  </select>

                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" id="fecha-entrega" placeholder="Fecha de entrega"/>
                  </div>
                  <div className="mb-3">
                    <textarea className="form-control" rows="3" id="descripcion" placeholder="Detalles de la tarea..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary d-block w-100 text-white">Agregar pendiente</button>
                </div>
              </form>
              <form onSubmit={ handleAgregarUnidadAprendizaje } className="card shadow-sm">
                <div className="card-body">
                  <h5 className="car-title mb-0">Unidades de aprendizaje</h5>
                  <hr className="mb-4 mt-2"/>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Unidad de aprendizaje" id="input-uaAdd" aria-describedby="button-addon2" />
                    <button type="submit" className="btn btn-primary text-white" id="btn-uaAdd" style={{borderRadius: '0 5px 5px 0'}}>Agregar</button>
                  </div>
                  <div className="mt-4">
                    {
                      unidadesAprendizaje.map(ua => (
                        <div className="row px-3" key={ua.id}>
                          <div className="col-10 p-0">
                            <div className="form-check form-switch">
                              <input role="button" className="form-check-input me-2" type="checkbox" id={"btn-"+ua.id} onClick={() => filtrarTareas(ua)} defaultChecked={ua.active} />
                              <label role="button" className="form-check-label text-truncate w-100 user-select-none" htmlFor={"btn-"+ua.id}>{ua.nombre}</label>
                            </div>
                          </div>
                          <div className="col-2 p-0 text-end">
                            <button className="btn btn-link text-danger text-decoration-none fs-4 p-0 rounded-circle" onClick={() => eliminarUnidadAprendizaje(ua.id)}><i className="bi bi-x d-flex align-items-center" /></button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </form>
              <button className="btn btn-secondary" onClick={ handleLogout }>Salir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default withRouter(DashboardView)