import { useState, useEffect, useRef, useContext } from "react";
import { getTokenSymbol, sendTransaction, getBalance } from "../utils/wallet-utils";
import AccountContext from "../contexts/accountContext";

export default function CheckoutModal(props) {
  const [enoughBalance, setEnoughBalance] = useState(true);
  const [transferAmount, setTransferAmount] = useState('0.0');
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [showTransactionConfirmation, setShowTransactionConfirmation] = useState(false);
  const [tokenSymbol, setTokenSymbol] = useState('USDT');
  const [transactionHash, setTransactionHash] = useState("");
  const { address } = useContext(AccountContext);

  const SEND_TO_ADDRESS = "0x574962854630D8dFAAFBe80Cdc8AF13E019a7CC3"

  const handleCloseClick = () => {
    setShowTransactionConfirmation(false);
  }

  const handleInputOnChange = (e) => {
    const value = parseFloat(e.target.value || 0);
    setTransferAmount(value.toString())
    setEnoughBalance(parseFloat(props.currentAccountBalance) > value)
  }

  const handleTransferOnClick = async () => {
    setTransactionInProgress(true)
    const transaction = await sendTransaction(transferAmount, SEND_TO_ADDRESS)
    if (!!transaction.hash){
      setShowTransactionConfirmation(true);
      setTransactionHash(transaction.hash);
    }
    setTransactionInProgress(false)
  }

  useEffect(() => { 
    const fetchTokenSymbol = async () => {
      const symbol = await getTokenSymbol();
      setTokenSymbol(symbol);
    }
    fetchTokenSymbol();
  }, []);

  return (
    <>
      <input type="checkbox" id="checkout-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="checkout-modal" onClick={handleCloseClick} className="btn btn-sm btn-circle btn-outline hover:bg-transparent hover:text-black absolute right-2 top-2 border-none bg-transparent">✕</label>
          <div className={showTransactionConfirmation ? "hidden" : "block"}>
            <h3 className="text-lg font-bold mb-5">{transactionInProgress ? "Transaccion en proceso" : "Realizar Transferencia"}</h3>
            {transactionInProgress && (
              <div className="pl-10 flex flex-col items-center justify-center absolute w-5/6 h-2/3">
                <div className="radial-progress animate-spin text-primary" style={{"--value":70, "--size": "9rem", "--thickness": "0.7rem"}}></div>
              </div>
            )}
            <div className={transactionInProgress ? "invisible" : "visible"}>
              <div className="p-8 rounded-full bg-primary bg-opacity-10 border-none">
                <div className="flex">
                  <input onChange={handleInputOnChange} type="number" placeholder="0" 
                        className="input text-4xl input-lg w-full max-w-m h-15 bg-transparent focus:outline-0" 
                  />
                  <div className="rounded-full bg-primary bg-opacity-10 flow-root w-52 p-2">
                    <img className="h-10 float-left ml-1 mt-1" src="/tether-seeklogo.com.svg"></img>
                    <span className="float-right text-lg font-bold pt-2 px-3">{tokenSymbol}</span>
                  </div>
                </div>
                <span className="absolute right-20 text-lg">Balance: {props.currentAccountBalance}</span>
              </div>
              <button className="btn btn-secondary rounded-full border-none text-xl w-full mt-5 h-20" 
                      disabled={!enoughBalance}
                      onClick={handleTransferOnClick}>
                { enoughBalance ? "TRANSFERIR" : "BALANCE INSUFICIENTE" }
              </button> 
            </div>
          </div>
          <div className={showTransactionConfirmation ? "block" : "hidden"}>
            <h3 className="text-lg font-bold">Transaccion realizada!</h3>
            <div className="mt-2">
              <div className="stat bg-base-100 rounded-lg bg-opacity-30 pl-1">
                <div className="stat-title text-xl">Se enviaron</div>
                <div className="stat-value text-4xl text-secondary">{`${transferAmount} ${tokenSymbol}`}</div>
                <div className="stat-title text-xl mt-4">Desde</div>
                <div className="stat-value text-4xl text-secondary">{address}</div>
                <div className="stat-desc text-xl mt-3">
                  <a href={"https://goerli.etherscan.io/tx/"+transactionHash} className="justify-items-center" target="blank">
                    <div className="flex mt-3">
                      <img src="/external-link.svg" className="mt-2 ml-0 w-5 h-4" alt="Etherscan"/>
                      <span className="float-left">Ver Transaccion en Etherescan</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}