import Link from 'next/link'

export default function ProjectCard(props) {
  return(
    <>
      <Link href="/details/123123">
        <div className="card w-3/4 bg-base-100 shadow-xl transition duration-100 hover:scale-105 hover:bg-white-600 cursor-pointer">
          <figure><img src="https://placeimg.com/640/320/tech" alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">
              Tu proyecto!
              <div className="badge badge-secondary">NUEVO</div>
            </h2>
            <p>Pequeña descripcion de tu proyecto revolucionario.</p>
            <div className="flex justify-between">
              <span className="text-lg font-medium text-success dark:text-white">559 USDT</span>
              <span className="text-lg font-medium text-success dark:text-white">43%</span>
            </div>
            <progress className="progress progress-success w-full" value="43" max="100"></progress>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Tecnologia</div>
              <div className="badge badge-outline">Redes Sociales</div>
            </div>
          </div>
        </div>
      </Link>

    </>
  )
}