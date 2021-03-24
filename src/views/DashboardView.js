import React from 'react'
import Pendiente from '../components/Pendiente'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

export default function DashboardView({history}) {
  
  const handleLogout = () => {
    history.push('/login')
  }

  return (
    <div className="bg-light">
      <div className="container">
        <div className="row min-vh-100 w-100 py-5 align-items-start">          
          <div className="col">
            <ResponsiveMasonry>
              <Masonry gutter="24px">
                <Pendiente description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et posuere diam. Aliquam erat volutpat. Vestibulum quis ipsum cursus, dapibus magna non, congue purus. "/>
                <Pendiente description="Pellentesque ultricies erat vel ultricies faucibus. Donec at venenatis lorem, at luctus orci."/>
                <Pendiente description="Praesent vitae tristique dui. Morbi mattis risus non tristique tincidunt. Mauris volutpat mauris nec blandit suscipit. Vestibulum faucibus laoreet neque ac consectetur. Nullam eu magna ex."/>
                <Pendiente description="Praesent vel orci est. Duis semper pulvinar leo. Fusce nec velit leo. Nullam ac ipsum sem. Nullam enim metus, lacinia sed interdum in, blandit quis risus. "/>
                <Pendiente description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et posuere diam. Aliquam erat volutpat. Vestibulum quis ipsum cursus, dapibus magna non, congue purus. "/>
                <Pendiente description="Pellentesque ultricies erat vel ultricies faucibus. Donec at venenatis lorem, at luctus orci."/>
                <Pendiente description="Praesent vitae tristique dui. Morbi mattis risus non tristique tincidunt. Mauris volutpat mauris nec blandit suscipit. Vestibulum faucibus laoreet neque ac consectetur. Nullam eu magna ex."/>
                <Pendiente description="Praesent vel orci est. Duis semper pulvinar leo. Fusce nec velit leo. Nullam ac ipsum sem. Nullam enim metus, lacinia sed interdum in, blandit quis risus. "/>
                <Pendiente description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et posuere diam. Aliquam erat volutpat. Vestibulum quis ipsum cursus, dapibus magna non, congue purus. "/>
                <Pendiente description="Pellentesque ultricies erat vel ultricies faucibus. Donec at venenatis lorem, at luctus orci."/>
                <Pendiente description="Praesent vitae tristique dui. Morbi mattis risus non tristique tincidunt. Mauris volutpat mauris nec blandit suscipit. Vestibulum faucibus laoreet neque ac consectetur. Nullam eu magna ex."/>
                <Pendiente description="Praesent vel orci est. Duis semper pulvinar leo. Fusce nec velit leo. Nullam ac ipsum sem. Nullam enim metus, lacinia sed interdum in, blandit quis risus. "/>
              </Masonry>
            </ResponsiveMasonry>
          </div>
          <div className="col-md-3" style={{maxHeight: '100vh'}}>
            <div className="d-grid gap-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="text-center">¡Bienvenido de nuevo usuario!</h5>
                </div>
              </div>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="car-title mb-0">Nueva tarea</h5>
                  <hr className="mb-4 mt-2"/>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Unidad de aprendizaje"/>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Fecha de entrega"/>
                  </div>
                  <div className="mb-3">
                    <textarea className="form-control" rows="3" placeholder="Detalles de la tarea..."></textarea>
                  </div>
                  <div className="">
                    <button className="btn btn-primary d-block w-100">Agregar pendiente</button>
                  </div>
                </div>
              </div>
              <button className="btn btn-danger mt-5">Salir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
