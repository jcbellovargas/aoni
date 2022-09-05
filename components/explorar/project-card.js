import Link from 'next/link'

export default function ProjectCard(props) {
  return(
    <>
      <Link href="/details/123123">
        <div class="card w-3/4 bg-base-100 shadow-xl transition duration-100 hover:scale-105 hover:bg-white-600 cursor-pointer">
          <figure><img src="https://placeimg.com/640/320/tech" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">
              Tu proyecto!
              <div class="badge badge-secondary">NUEVO</div>
            </h2>
            <p>Todos los detalles de tu proyecto revolucionario.</p>
            <div class="flex justify-between">
              <span class="text-lg font-medium text-success dark:text-white">559 USDT</span>
              <span class="text-lg font-medium text-success dark:text-white">43%</span>
            </div>
            <progress class="progress progress-success w-full" value="43" max="100"></progress>
            <div class="card-actions justify-end">
              <div class="badge badge-outline">Tech</div>
              <div class="badge badge-outline">Innovacion</div>
            </div>
          </div>
        </div>
      </Link>

    </>
  )
}