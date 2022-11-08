import Link from 'next/link'
import { scrubAddress } from "/utils/wallet-utils"

export default function ProjectsTableRow(props) {
  return(
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={props.project.image} alt="Project Image" />
            </div>
          </div>
          <div>
            <div className="font-bold">{props.project.name}</div>
            {props.project.tags.map((tag) => {
              return(<span key={tag} className="badge badge-ghost badge-sm">{tag}</span>)
            })}
          </div>
        </div>
      </td>
      <td>
        <div className="badge badge-accent text-lg">{props.project.status}</div>
      </td>
      <td>
        <a href={"https://goerli.etherscan.io/address/"+props.project.ownerAddress} target="blank">
          {scrubAddress(props.project.ownerAddress)}
        </a>
      </td>
      <td>
        <a href={"https://goerli.etherscan.io/address/"+props.project.contract} target="blank">
            {scrubAddress(props.project.contract)}
        </a>
      </td>
      <td>{props.project.donationsAmount}</td>
      <td>
        <div className="flex justify-between">
          <span className="text-m font-medium text-success dark:text-white">{`${props.project.totalContributions.amount} ${props.project.totalContributions.token}`}</span>
          <span className="text-m font-medium text-success dark:text-white">{`${props.project.fundingGoalProgress}%`}</span>
        </div>
        <progress className="progress progress-success w-full" value={props.project.fundingGoalProgress} max="100"></progress>
        <br/>
      </td>
      <td>{`${props.project.remainingDays} dias`}</td>
      <th className="px-0">
        <Link href={`/details/${props.project.id}`}>
          <button className="btn btn-active btn-secondary btn-sm cursor-pointer">Detalles</button>
        </Link>
      </th>
      <th className="px-0">
        <Link href={`/edit/${props.project.id}`}>
          <button className="btn btn-active btn-secondary btn-sm cursor-pointer">Editar</button>
        </Link>
      </th>
    </tr>
  )
}
