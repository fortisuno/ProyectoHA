import React from 'react'

export default function LoginView({history}) {

  const handleAuth = () => {
    history.push('/dashboard')
  }

  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card border-0 shadow" style={{width: '350px', borderRadius: '20px'}}>
        <div className="card-body">
          <div className="d-flex flex-column align-items-center py-4 ">
            <img src="/logoPrincipal.png" className="d-block rounded-circle mb-5" style={{width: '128px'}} alt="logo"/>
            <input type="text" className="form-control form-control-lg text-center" id="user" placeholder="Usuario" style={{borderRadius: '10px 10px 0 0'}} />
            <input type="password" className="form-control form-control-lg text-center" id="password" placeholder="Contraseña" style={{borderRadius: '0 0 10px 10px'}} />
            <div className="form-check form-switch mt-3">
              <input className="form-check-input" type="checkbox" id="password-flag" />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Mostrar contraseña</label>
            </div>
            <hr/>
            <button className="btn btn-primary btn-lg d-block w-100 mt-5" style={{borderRadius: '10px'}} onClick={ handleAuth }>Iniciar sesión</button>
          </div>
        </div>
      </div>
    </div>
  )
}
