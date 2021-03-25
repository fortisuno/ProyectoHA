import React, { useRef, useState } from 'react'

export default function Pendiente({descripcion, materia, fechaEntrega, id, eliminar, editar}) {

  const [editable, setEditable] = useState(false)
  const [desc, setDesc] = useState(descripcion)
  const [mat, setMat] = useState(materia)
  const [fecha, setFecha] = useState(fechaEntrega)

  const nuevaMateria = useRef()
  const nuevaFecha = useRef()
  const nuevaDescripcion = useRef()

  const handleEliminarTarea = () => {
    eliminar(id)
  }

  const handleEditarTarea = () => {
    const m = nuevaMateria.current.value
    const f = nuevaFecha.current.value
    const d = nuevaDescripcion.current.value
    
    setMat(m)
    setFecha(f)
    setDesc(d)
    setEditable(false)
    
    editar(id, m, f, d)
  }

  return (
    <div className="card shadow-sm overflow-hidden" style={{background: '#ffe97f'}}>
      <div className="card-header border-0">
        <div className="d-flex justify-content-between align-items-center">
          {editable ? <input ref={nuevaMateria} type="text" className="form-control form-control-sm" defaultValue={mat}/> : <h5 className="mb-0 d-block text-truncate">{mat}</h5>}
          {editable ? <input ref={nuevaFecha} type="text" className="form-control form-control-sm ms-2" defaultValue={fecha}/> : <span className="fw-bold">{fecha}</span>}
        </div>
      </div>
      <div className="card-body py-4">
        {editable ? <textarea ref={nuevaDescripcion} className="form-control form-control-sm" id="" rows="3" defaultValue={desc}></textarea> : <p className="lead">{desc}</p>}
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
