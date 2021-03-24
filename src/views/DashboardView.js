import React from 'react'
import Pendiente from '../components/Pendiente'

export default function DashboardView({history}) {
  
  const handleLogout = () => {
    history.push('/login')
  }

  return (
    <div className="bg-light">
      <div className="container">
        <div className="row min-vh-100 w-100 py-5 align-content-start">
          <div className="col-12">
            <div className="d-flex shadow-sm align-items-center justify-content-between bg-primary py-3 px-4 mb-4" style={{borderRadius: '20px'}}>
              <img src="/logoPag.png" className="d-block rounded-circle" width="48" alt=""/>
              <button className="btn text-white rounded-pill fs-5" onClick={ handleLogout }>Salir</button>
            </div>
          </div>
          <div className="col-12 mb-4 position-relative">
            <div className="d-grid gap-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="car-title mb-0">Nueva tarea</h5>
                  <hr className="mb-4 mt-2"/>
                  <div className="row g-3">
                    <div className="col">
                      <input type="text" className="form-control" placeholder="Unidad de aprendizaje"/>
                    </div>
                    <div className="col-4">
                      <input type="text" className="form-control" placeholder="Fecha de entrega"/>
                    </div>
                    <div className="col-12">
                      <textarea className="form-control" rows="3" placeholder="Detalles de la tarea..."></textarea>
                    </div>
                    <div className="col text-center">
                      <button className="btn btn-primary rounded-circle py-2 px-2 fs-4"><i className="bi bi-plus d-flex align-items-center"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm overflow-hidden">
              <div className="card-body py-4">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col" className="col-3">Unidad Aprendizaje</th>
                      <th scope="col" className="col-5">Detalles</th>
                      <th className="text-center" scope="col">Fecha de entrega</th>
                      <th className="text-center" scope="col">Estatus</th>
                      <th className="text-center" scope="col">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Pendiente />
                    <Pendiente />
                    <Pendiente />
                    <Pendiente />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
