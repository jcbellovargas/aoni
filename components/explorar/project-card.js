export default function ProjectCard(props) {
  return(
    <>
          <div class="card w-3/4 bg-base-100 shadow-xl">
            <figure><img src="https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/9019e/hero.webp" alt="Shoes" /></figure>
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
              {/* <button class="btn btn-secondary rounded-full normal-case mt-10 text-lg text-white">Participar</button> */}
            </div>
          </div>
    </>
  )
}