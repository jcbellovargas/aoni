import ParticlesContainer from './particles-container'

export default function Hero(params) {
  return(
    <div className="w-full">
      <div className=" w-full h-full absolute opacity-90">
        <ParticlesContainer/>
      </div>
      
      <div className="opacity-90 text-center w-full h-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">
                Tus ideas valen.
            </span>
            <span className="block text-primary">
                Financialas hoy.
            </span>
        </h2>
          <p className="relative text-xl mt-4 max-w-md mx-auto text-gray-500">
              <span>
                AONI te permite financiar proyectos anónimamente con el poder de 
              </span>
              <span className="ml-1 text-primary">
                Blockchain
              </span>
          </p>     
          <button className="btn btn-primary rounded-full normal-case mt-10 text-xl text-white">Crea tu Proyecto</button>
      </div>
    </div>
  )
}