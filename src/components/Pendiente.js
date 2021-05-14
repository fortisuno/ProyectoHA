import React, { useEffect, useRef, useState } from 'react'

const obtenerMateria = (id, array) => {
  const materia = array.filter(m => m.id === id )
  return materia[0].nombre
}

export default function Pendiente(props) {
  const {id, editar, eliminar, materias, active} = props;

  const [materiaId, setMateriaId] = useState(props.materiaId)
  const [materiaNombre, setMateriaNombre] = useState(() => obtenerMateria(materiaId, materias))
  const [fechaEntrega, setFechaEntrega] = useState(props.fechaEntrega)
  const [descripcion, setDescripcion] = useState(props.descripcion)

  const [editable, setEditable] = useState(false)
  
  const nuevaMateria = useRef()
  const nuevaFechaEntrega = useRef()
  const nuevaDescripcion = useRef()  

  const handleEliminarTarea = () => {
    eliminar(id)
  }

  const handleEditarTarea = () => {
    const m = nuevaMateria.current.value
    const f = nuevaFechaEntrega.current.value
    const d = nuevaDescripcion.current.value
    
    setMateriaId(m)
    setMateriaNombre(() => obtenerMateria(m, materias))
    setFechaEntrega(f)
    setDescripcion(d)
    setEditable(false)

    const newData = {
      materiaId: m,
      fechaEntrega: f,
      descripcion: d,
      active: active
    }
    
    editar(id, newData)
  }

  return (
    <div className="card shadow-sm overflow-hidden" style={{background: '#ffe97f'}}>
      <div className="card-header border-0">
        <div className="d-flex justify-content-between align-items-center">
          {editable ? (
            <select ref={nuevaMateria} className="form-select form-select-sm" aria-label="Default select example" id="materia" defaultValue={materiaId}>
              {
                materias.map(ua => (
                  <option value={ua.id} key={ua.id}>{ua.nombre}</option>
                ))
              }
            </select>
          ) : <h5 className="mb-0 d-block text-truncate">{materiaNombre}</h5>}
          {editable ? <input ref={nuevaFechaEntrega} type="text" className="form-control form-control-sm ms-2" defaultValue={fechaEntrega}/> : <span className="fw-bold">{fechaEntrega}</span>}
        </div>
      </div>
      <div className="card-body py-4">
        {editable ? <textarea ref={nuevaDescripcion} className="form-control form-control-sm" id="" rows="3" defaultValue={descripcion}></textarea> : <p className="lead">{descripcion}</p>}
      </div>
      <div className="card-footer border-0 bg-transparent">
        <div className="d-flex justify-content-end align-items-center">
          
          {editable ? <button className="btn btn-link text-decoration-none text-dark fs-6 p-2 rounded-circle me-3" style={{background: 'rgba(0,0,0,0.08)'}} onClick={ handleEditarTarea }><i className="bi bi-check2 d-flex align-items-center" /></button> : <button className="btn btn-link text-decoration-none text-dark fs-6 p-2 rounded-circle me-3" style={{background: 'rgba(0,0,0,0.08)'}} onClick={ () => setEditable(true) }><i className="bi bi-pencil d-flex align-items-center" /></button>}
          {editable ? <button className="btn btn-link text-decoration-none text-dark fs-6 p-2 rounded-circle" style={{background: 'rgba(0,0,0,0.08)'}} onClick={ () => setEditable(false) }><i className="bi bi-x d-flex align-items-center" /></button> : <button className="btn btn-link text-decoration-none text-dark fs-6 p-2 rounded-circle" style={{background: 'rgba(0,0,0,0.08)'}} onClick={ handleEliminarTarea }><i className="bi bi-trash d-flex align-items-center" /></button>}
        </div>
      </div>
    </div>
  )
}
