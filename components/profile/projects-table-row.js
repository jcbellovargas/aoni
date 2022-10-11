export default function ProjectsTableRow(props) {
  return(
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src="https://placeimg.com/220/124/tech" alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">Proyecto 1</div>
            <span className="badge badge-ghost badge-sm">Tecnologia</span>
          </div>
        </div>
      </td>
      <td>
        <div className="badge badge-accent text-lg">Activo</div>
      </td>
      <td>
        <div className="flex justify-between">
          <span className="text-m font-medium text-success dark:text-white">559 USDT</span>
          <span className="text-m font-medium text-success dark:text-white">43%</span>
        </div>
        <progress className="progress progress-success w-full" value="43" max="100"></progress>
        <br/>
      </td>
      <td>23 dias</td>
      <th>
        <button className="btn btn-active btn-secondary btn-sm">Detalles</button>
      </th>
    </tr>
  )
}
