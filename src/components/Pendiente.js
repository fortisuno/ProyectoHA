import React from 'react'

export default function Pendiente() {
  return (
    <tr>
      <th className="align-middle" scope="row">1</th>
      <td className="align-middle">Herramintas automatizadas</td>
      <td className="align-middle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, distinctio?</td>
      <td className="align-middle text-center text-muted">26/03/2021</td>
      <td className="align-middle text-center"><button className="btn btn-link rounded-pill py-1 px-2"><i className="bi bi-pencil-fill"></i></button></td>
      <td className="align-middle text-center"><button className="btn btn-link text-danger rounded-pill py-1 px-2"><i className="bi bi-trash"></i></button></td>
    </tr>
  )
}
