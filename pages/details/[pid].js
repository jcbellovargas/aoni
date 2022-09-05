import { useRouter } from 'next/router'

export default function Details(){
  const router = useRouter()
  const { pid } = router.query

  return(
    <>
      {/* Project id {pid} */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="https://placeimg.com/640/480/tech" className="max-w-xl rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Nombre Proyecto</h1>
            <h1 className='text-xl'>de Creador projecto</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitaiditateiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitatione voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationetionem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <div className='flex flex-col'>
            <progress className="progress progress-success w-2/3 my-6 float-left" value="70" max="100"></progress>
            <button className="btn btn-secondary rounded-full w-2/3">Participar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}