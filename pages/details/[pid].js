import { useRouter, isReady } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { getBalance } from "/utils/wallet-utils";
import CheckoutModal from '../../components/checkout-modal'
import AccountContext from '../../contexts/accountContext';
import WalletModal from '../../components/wallet-modal';
import { getData } from "/utils/fetch-utils"
import { getProjectContractDetails } from '../../utils/wallet-utils';
import { getProject } from '../../utils/project-service';

export default function Details(props) {
  const router = useRouter();
  const { pid } = router.query;

  const [currentAccountBalance, setCurrentAccountBalance] = useState(0);
  const {address, setAddress} = useContext(AccountContext);
  const [projectDetails, setProjectDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const walletModalRef = useRef(null);
  const checkoutModalRef = useRef(null);

  useEffect(() => {
    if(!pid) return;
    const fetchProjectDetails = async (id) => {
      try {
        const project = await getProject(id);
        setProjectDetails(project)
        setLoading(false);
      } catch(error) {
        console.log(error);
      }
    }
    fetchProjectDetails(pid);
  },[pid])

  const handleCheckoutButtonClick = async () => {
    if(!!address){
      const balance = await getBalance();
      setCurrentAccountBalance(balance);
      checkoutModalRef.current.click();
    }else{
      walletModalRef.current.click();
    }
  }

  return (
    <>
      {!loading && (
        <div className="hero min-h-screen rounded-full bg-primary bg-opacity-5">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img src={projectDetails.image} className="ml-20 rounded-lg shadow-2xl w-[640px] h-[480px]" />
            <div className="w-[600px]">
              <h1 className="text-5xl font-bold">{projectDetails.name}</h1>
              <h1 className='text-xl'>de Creador projecto</h1>
              <p className="py-6">{projectDetails.description}</p>
              <div className='flex flex-col'>
                <div className="flex justify-between w-2/3">
                  <span className="text-lg font-medium text-black dark:text-white">{`${projectDetails.currentBalance.amount} ${projectDetails.currentBalance.token}`}</span>
                  <span className="text-lg font-small text-black dark:text-white">{`${projectDetails.fundingGoalProgress}% de ${projectDetails.fundingGoal.amount} ${projectDetails.fundingGoal.token}`}</span>
                </div>
                <progress className="progress progress-success w-2/3  float-left" value={projectDetails.fundingGoalProgress} max="100"></progress>
                <span className="text-lg font-small text-black dark:text-white">{`Quedan ${projectDetails.remainingDays} dias`}</span>
                <button onClick={handleCheckoutButtonClick} className="btn btn-secondary rounded-full w-2/3 mt-6">Participar</button>
                {address && (
                  <>
                    <label ref={checkoutModalRef} htmlFor="checkout-modal" className="h-0 w-0 invisible"/>
                    <CheckoutModal currentAccountBalance={currentAccountBalance}/>
                  </>
                )}
                <label ref={walletModalRef} htmlFor="connect-wallet" className="h-0 w-0 invisible"/>
                <WalletModal isWalletConnected={false} selectedAddress={"address"}/>
              </div>
            </div>
          </div>
        </div>    
      )}

    </>
  )
}