/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, {useState} from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { auth, db } from '../utils/firesbase';

const Modal = withReactContent(Swal)

export default function NuevoUsuario({router}) {

  const [showPassword, setShowPassword] = useState(false)

  const guardarUsuario = async (uid) => {
    try {
      const nuevoUsuario = await db.collection("usuarios").doc(uid).set({
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email
      })
    } catch(error) {
      console.log('Hubo un problema al guardar los datos');
    }
  }

  const crearUsuario = (data, contra) => {
    auth.createUserWithEmailAndPassword(data.email, contra)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid
        try {
          const nuevoUsuario = await db.collection("usuarios").doc(uid).set({
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email
          })
          Modal.fire({
            title: <span className="mb-4">¡Usuario registrado!</span>,
            html: <button type="button" className="btn btn-primary btn-lg mt-4 text-white" onClick={() => Swal.close()}>Aceptar</button>,
            customClass: {
              popup: 'card-rounded'
            },
            showConfirmButton: false,
            willClose: () => { 
              router.push('/dashboard')
            }
          })
        } catch(error) {
          console.log('Hubo un problema al guardar los datos');
        }
      })
      .catch((error) => {
        const email = document.querySelector("#usuario-email");
        const contra = document.querySelector("#usuario-contra");
        const contraConfirm = document.querySelector("#usuario-contra-confirm");
        const feedback = document.querySelector("#nu-feedback");
        
        const code = error.code;
        console.log(code);
        
        if (code === "auth/weak-password") {
          feedback.innerHTML = 'La contraseña debe ser almenos de 6 digitos'
          contra.classList.add("is-invalid")
          contraConfirm.classList.add("is-invalid")
        }

        if (code === "auth/email-already-in-use") {
          feedback.innerHTML = 'El correo electronico que intenta registrar ya existe. Por favor ingrese uno diferente'
          email.classList.add("is-invalid")
        }

        feedback.classList.remove("d-none")
      })
  }
  
  const handleCrearUsuario = (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#usuario-nombre");
    const apellidos = document.querySelector("#usuario-apellidos");
    const email = document.querySelector("#usuario-email");
    const contra = document.querySelector("#usuario-contra");
    const contraConfirm = document.querySelector("#usuario-contra-confirm");
    const feedback = document.querySelector("#nu-feedback");
    let errors = 0

    feedback.classList.add("d-none")

    if(nombre.value === '') {
      nombre.classList.add('is-invalid');
      errors++;
    } else {
      nombre.classList.remove('is-invalid');
    }

    if(apellidos.value === '') {
      apellidos.classList.add('is-invalid');
      errors++;
    } else {
      apellidos.classList.remove('is-invalid');
    }

    if(email.value === '') {
      email.classList.add('is-invalid');
      errors++;
    } else {
      email.classList.remove('is-invalid');
    }

    if(contra.value === '') {
      contra.classList.add('is-invalid');
      errors++;
    } else {
      contra.classList.remove('is-invalid');
    }
    
    if(contraConfirm.value === '') {
      contraConfirm.classList.add('is-invalid');
      errors++;
    } else {
      if(contra.value !== contraConfirm.value) {
        contra.classList.add('is-invalid');
        contraConfirm.classList.add('is-invalid');
        errors++;
      } else {
        contra.classList.remove('is-invalid');
        contraConfirm.classList.remove('is-invalid');
      }
    }

    if (errors === 0) {
      const data = {
        nombre: nombre.value,
        apellidos: apellidos.value,
        email: email.value,
      };

      crearUsuario(data, contra.value);
    }

  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={ handleCrearUsuario } className="py-4">
      <h2 className="mb-3">¡Genial, un nuevo usuario!</h2>
      <span>Nos complace saber que hay nuevos usuarios, por favor introduce los datos que se solicitan.</span>
      <div className="row g-3 mt-3">
        <div className="col">
          <div className="form-floating">
            <input type="text" className="form-control form-control-rounded" id="usuario-nombre" placeholder="Nombre(s)" />
            <label htmlFor="usuario-nombre">Nombre(s)</label>
          </div>
        </div>
        <div className="col">
          <div className="form-floating">
            <input type="text" className="form-control form-control-rounded" id="usuario-apellidos" placeholder="Apellidos" />
            <label htmlFor="usuario-apellidos">Apellidos</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <input type="email" className="form-control form-control-rounded" id="usuario-email" placeholder="correo@ejemplo.com" />
            <label htmlFor="usuario-email">Correo electrónico</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <input type={showPassword ? "text" : "password"} className="form-control form-control-rounded" id="usuario-contra" placeholder="Contraseña" />
            <label htmlFor="usuario-contra">Contraseña</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <input type={showPassword ? "text" : "password"} className="form-control form-control-rounded" id="usuario-contra-confirm" placeholder="Contraseña" />
            <label htmlFor="usuario-contra-confirm">Repetir contraseña</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-check form-switch my-3 d-flex justify-content-center" style={{userSelect: 'none'}}>
            <input className="form-check-input me-3" type="checkbox" id="password-nu-flag" defaultChecked={ showPassword } onClick={ handleShowPassword } />
            <label className="form-check-label" htmlFor="password-nu-flag">Mostrar contraseña</label>
          </div>
        </div>
        <div className="col-12 pb-4">
          <div className="alert alert-danger text-center d-none mb-0" style={{borderRadius: '10px'}} id="nu-feedback" role="alert">A ocurrido un error</div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary btn-lg d-block w-100 text-white" style={{borderRadius: '10px'}}>Crear cuenta</button>
          <a role="button" className="btn btn-link mt-2 d-block w-100" style={{borderRadius: '10px'}} onClick={ () => Swal.close() }>Cerrar</a>
        </div>
      </div>
    </form>
  )
}
