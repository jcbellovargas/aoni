import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { getBalance } from "/utils/wallet-utils";
import CheckoutModal from '../../components/checkout-modal'
import AccountContext from '../../contexts/accountContext';
import WalletModal from '../../components/wallet-modal';

export default function Details() {
  const router = useRouter();
  const { pid } = router.query;

  const [currentBalance, setCurrentBalance] = useState(0);
  const {address, setAddress} = useContext(AccountContext);

  const walletModalRef = useRef(null);
  const checkoutModalRef = useRef(null);

  const handleCheckoutButtonClick = async () => {
    if(!!address){
      debugger;
      const balance = await getBalance();
      debugger;
      setCurrentBalance(balance);
      checkoutModalRef.current.click();
    }else{
      walletModalRef.current.click();
    }
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
              <button onClick={handleCheckoutButtonClick} className="btn btn-secondary rounded-full w-2/3 mt-6">Participar</button>
              <label ref={checkoutModalRef} htmlFor="checkout-modal" className="h-0 w-0 invisible"/>
              <CheckoutModal currentBalance={currentBalance} />
              <label ref={walletModalRef} htmlFor="connect-wallet" className="h-0 w-0 invisible btn btn-primary rounded-full normal-case text-l text-white"/>
              <WalletModal isWalletConnected={false} selectedAddress={address}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}