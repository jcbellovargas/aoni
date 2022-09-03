import ParticlesContainer from './ParticlesContainer'

export default function Hero(params) {
  return(
    <div class="w-full">
      <div class=" w-full h-full absolute opacity-90">
        <ParticlesContainer/>
      </div>
      
      <div class="opacity-90 text-center w-full h-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        
        <h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span class="block">
                Tus ideas valen.
            </span>
            <span class="block text-primary">
                Financialas hoy.
            </span>
        </h2>
          <p class="relative text-xl mt-4 max-w-md mx-auto text-gray-500">
              <span>
                AONI te permite financiar proyectos anónimamente con el poder de 
              </span>
              <span class="ml-1 text-primary">
                Blockchain
              </span>
          </p>     
          <button class="btn btn-primary rounded-full normal-case mt-10 text-xl text-white">Crea tu Proyecto</button>
      </div>
    </div>
  )
}