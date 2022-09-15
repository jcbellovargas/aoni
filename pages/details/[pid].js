import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getBalance } from "/utils/wallet-utils";
import CheckoutModal from '../../components/checkout-modal'


export default function Details() {
  const router = useRouter();
  const { pid } = router.query;

  const [currentBalance, setCurrentBalance] = useState(0);

  const handleModalOpenClick = async () => {
    const balance = await getBalance();
    setCurrentBalance(balance)
  }

  return (
    <>
      {/* Project id {pid} */}
      <div className="hero min-h-screen rounded-full bg-primary bg-opacity-5">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="https://placeimg.com/640/480/tech" className="max-w-xl rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Nombre Proyecto</h1>
            <h1 className='text-xl'>de Creador projecto</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitaiditateiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitatione voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationeiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationetionem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <div className='flex flex-col'>
              <div class="flex justify-between w-2/3">
                <span class="text-lg font-medium text-black dark:text-white">559 USDT</span>
                <span class="text-lg font-small text-black dark:text-white">43% de 1300 USDT</span>
              </div>
              <progress className="progress progress-success w-2/3  float-left" value="70" max="100"></progress>
              <span class="text-lg font-small text-black dark:text-white">Quedan 24 dias</span>
              <label onClick={handleModalOpenClick} htmlFor="checkout-modal" className="btn btn-secondary rounded-full w-2/3 mt-6">Participar</label>
              <CheckoutModal currentBalance={currentBalance} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}