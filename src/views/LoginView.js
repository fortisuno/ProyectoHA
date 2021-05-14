/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import {auth} from '../utils/firesbase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NuevoUsuario from '../components/NuevoUsuario';

const Modal = withReactContent(Swal)

function LoginView({history, session}) {

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if(auth.currentUser) {
      history.replace('/dashboard')
    } else {
      // console.log('no hay usuario');
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

const handleModal = () => {
  Modal.fire({
    html: <NuevoUsuario router={history}/>,
    customClass: {
      popup: 'card-rounded'
    },
    showConfirmButton: false
  })
}

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return session !== !!null ? (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center bg-light">
      <form onSubmit={ handleAuth } className="card border-0 shadow" style={{width: '350px', borderRadius: '20px'}}>
        <div className="card-body">
          <div className="d-flex flex-column align-items-center py-4 ">
            <img src="/logoPrincipal.png" className="d-block mb-5" style={{width: '200px'}} alt="logo"/>
            <input type="email" className="form-control form-control-lg text-center" id="email" placeholder="correo@dominio.com" style={{borderRadius: '10px 10px 0 0'}} />
            <input type={showPassword ? 'text' : 'password'} className="form-control form-control-lg text-center" id="password" placeholder="Contraseña" style={{borderRadius: '0 0 10px 10px'}} />
            <div className="form-check form-switch my-3" style={{userSelect: 'none'}}>
              <input className="form-check-input" type="checkbox" id="password-flag" defaultChecked={ showPassword } onClick={ handleShowPassword } />
              <label className="form-check-label" htmlFor="password-flag">Mostrar contraseña</label>
            </div>
            <div className="alert alert-danger text-center d-none" style={{borderRadius: '10px'}} id="feedback" role="alert">
              Por favor introduce un usuario y contraseña valido
            </div>
            <button type="submit" className="btn btn-primary btn-lg mt-5 d-block w-100 text-white" style={{borderRadius: '10px'}}>Iniciar sesión</button>
            <a role="button" className="btn btn-link mt-2 d-block w-100" style={{borderRadius: '10px'}} onClick={handleModal}>Crear cuenta</a>
          </div>
        </div>
      </form>
    </div>
  ) : null
}

export default withRouter(LoginView)