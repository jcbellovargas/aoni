import { useState, useEffect } from "react";
import { getTokenSymbol, sendEth, sendTransaction } from "../utils/wallet-utils";

export default function CheckoutModal(props) {
  const [enoughBalance, setEnoughBalance] = useState(true);
  const [transferAmount, setTransferAmount] = useState('0.0');
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [tokenSymbol, setTokenSymbol] = useState('asd');

  const handleInputOnChange = (e) => {
    const value = parseFloat(e.target.value || 0);
    setTransferAmount(value.toString())
    setEnoughBalance(parseFloat(props.currentBalance) > value)
  }

  const handleTransferOnClick = async () => {
    setTransactionInProgress(true)
    const transaction = await sendTransaction(transferAmount, "0x574962854630D8dFAAFBe80Cdc8AF13E019a7CC3")
    if (!!transaction.hash){
      const receipt = await transaction.wait();
    }
    setTransactionInProgress(false)
  }
  useEffect(() => { 
    const fetchSymbol = async () => {
      const symbol = await getTokenSymbol();
      setTokenSymbol(symbol);
    }
    fetchSymbol();
  }, []);
  

  return (
    <>
      <input type="checkbox" id="checkout-modal" className="modal-toggle" />
      <label htmlFor="checkout-modal" className="modal cursor-pointer">
        <label className="modal-box relative" for="">
          <h3 className="text-lg font-bold mb-5">{transactionInProgress ? "Transaccion en progreso" : "Realizar Transferencia"}</h3>
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
            <span className="absolute right-20 text-lg">Balance: {props.currentBalance}</span>
          </div>
          <button className="btn btn-secondary rounded-full border-none text-xl w-full mt-5 h-20" 
                  disabled={!enoughBalance}
                  onClick={handleTransferOnClick}>
            { enoughBalance ? "TRANSFERIR" : "BALANCE INSUFICIENTE" }
          </button> 
          </div>
        </label>
      </label>
    </>
  )
}
