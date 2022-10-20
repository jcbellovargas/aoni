import Link from 'next/link'

export default function ProjectCard(props) {

  const projectDesc = (description) => {
    if(description.length < 140) return description;

    return description.slice(0,140) + "..."
  }

  return(
    <>
      <Link href={`/details/${props.project.id}`}>
        <div className="card w-3/4 bg-base-100 shadow-xl transition duration-100 hover:scale-105 hover:bg-white-600 cursor-pointer">
          <figure><img src={props.project.image} alt="Img" className="w-[640px] h-[240px]" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              {props.project.name}
              <div className="badge badge-secondary">NUEVO</div>
            </h2>
            <p className="h-20">{projectDesc(props.project.description)}</p>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-success dark:text-white">{`${props.project.currentBalance.amount} ${props.project.currentBalance.token}`}</span>
              <span className="text-lg font-medium text-success dark:text-white">{`${props.project.fundingGoalProgress}%`}</span>
            </div>
            <progress className="progress progress-success w-full" value={props.project.fundingGoalProgress} max="100"></progress>
            <div className="card-actions justify-end">
              {props.project.tags.map((tag) => {
                return(<div key={tag} className="badge badge-outline">{tag}</div>)
              })}
            </div>
          </div>
        </div>
      </Link>

    </>
  )
}