import React from 'react'

export default function Pendiente({description}) {
  return (
    <div className="card shadow-sm overflow-hidden" style={{background: '#ffe97f'}}>
      <div className="card-header border-0">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">U. aprendizaje</h5>
          <span className="fw-bold">26/03/2021</span>
        </div>
      </div>
      <div className="card-body py-4">
        <p className="lead">
          {description}
        </p>
      </div>
      <div className="card-footer border-0 bg-transparent">
        <div className="d-flex justify-content-end align-items-center">
          <button className="btn btn-link text-decoration-none text-dark fs-6 p-2 rounded-circle me-3" style={{background: 'rgba(0,0,0,0.08)'}}><i className="bi bi-pencil d-flex align-items-center" /></button>
          <button className="btn btn-link text-decoration-none text-dark fs-6 p-2 rounded-circle" style={{background: 'rgba(0,0,0,0.08)'}}><i className="bi bi-trash d-flex align-items-center" /></button>
        </div>
      </div>
    </div>
  )
}
