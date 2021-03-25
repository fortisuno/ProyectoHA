import React, { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import {auth} from '../utils/firesbase'

function LoginView({history, session}) {

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if(auth.currentUser) {
      console.log('hay un usuario');
      history.replace('/dashboard')
    } else {
      console.log('no hay usuario');
    }
  }, [])

  const handleAuth = (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    
    let errors = 0;
    
    if(email.value === '') {
      email.classList.add('is-invalid');
      errors++;
    }

    if(password.value === '') {
      password.classList.add('is-invalid');
      errors++;
    }
    
    if( errors === 0 ) {
      email.classList.remove('is-invalid');
      password.classList.remove('is-invalid');
      authUser()
    }
    
  }
  
  const authUser = useCallback(async () => {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const feedback = document.querySelector('#feedback');

    try {
      const res = await auth.signInWithEmailAndPassword(email.value, password.value);
      console.log(res);
      feedback.classList.add('d-none')
      history.push('/dashboard')
    } catch (error) {
      // console.log(error);
      feedback.classList.remove('d-none')
    }
  }, [])

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return session !== !!null ? (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center bg-light">
      <form onSubmit={ handleAuth } className="card border-0 shadow" style={{width: '350px', borderRadius: '20px'}}>
        <div className="card-body">
          <div className="d-flex flex-column align-items-center py-4 ">
            <img src="/logoPrincipal.png" className="d-block mb-4" style={{width: '200px'}} alt="logo"/>
            <input type="email" className="form-control form-control-lg text-center" id="email" placeholder="correo@dominio.com" style={{borderRadius: '10px 10px 0 0'}} />
            <input type={showPassword ? 'text' : 'password'} className="form-control form-control-lg text-center" id="password" placeholder="Contraseña" style={{borderRadius: '0 0 10px 10px'}} />
            <div className="form-check form-switch mt-3" style={{userSelect: 'none'}}>
              <input className="form-check-input" type="checkbox" id="password-flag" defaultChecked={ showPassword } onClick={ handleShowPassword } />
              <label className="form-check-label" htmlFor="password-flag">Mostrar contraseña</label>
            </div>
            <div className="alert alert-danger text-center mt-3 mb-4 d-none" style={{borderRadius: '10px'}} id="feedback" role="alert">
              Por favor introduce un usuario y contraseña valido
            </div>
            <button type="submit" className="btn btn-primary btn-lg d-block w-100" style={{borderRadius: '10px', marginTop: '5rem'}}>Iniciar sesión</button>
          </div>
        </div>
      </form>
    </div>
  ) : null
}

export default withRouter(LoginView)