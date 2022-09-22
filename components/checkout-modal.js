import { useState } from "react";
import { sendEth, sendTransaction } from "../utils/wallet-utils";
import { getBalance } from "/utils/wallet-utils";

export default function CheckoutModal(props) {
  const [enoughBalance, setEnoughBalance] = useState(true);
  const [transferAmount, setTransferAmount] = useState('0.0');

  const handleInputOnChange = (e) => {
    const value = parseFloat(e.target.value || 0);
    setTransferAmount(value.toString())
    setEnoughBalance(parseFloat(props.currentBalance) > value)
  }

  const handleTransferOnClick = async () => {
    await sendTransaction(transferAmount, "0x574962854630D8dFAAFBe80Cdc8AF13E019a7CC3")
  }

  return (
    <>
      <input type="checkbox" id="checkout-modal" className="modal-toggle" />
      <label htmlFor="checkout-modal" className="modal cursor-pointer">
        <label className="modal-box relative" for="">
          <h3 className="text-lg font-bold mb-5">Realizar Transferencia</h3>
          <div className="p-8 rounded-full bg-primary bg-opacity-10 border-none">
            <div className="flex">
              <input onChange={handleInputOnChange} type="number" placeholder="0" 
                     className="input text-4xl input-lg w-full max-w-m h-15 bg-transparent focus:outline-0" 
              />
              <div className="rounded-full bg-primary bg-opacity-10 flow-root w-52 p-2">
                <img className="h-10 float-left ml-1 mt-1" src="/tether-seeklogo.com.svg"></img>
                <span className="float-right text-lg font-bold pt-2 px-3">USDT</span>
              </div>
            </div>
            <span className="absolute right-20 text-lg">Balance: {props.currentBalance}</span>
          </div>
          <button className="btn btn-secondary rounded-full border-none text-xl w-full mt-5 h-20" 
                  disabled={!enoughBalance}
                  onClick={handleTransferOnClick}>
            { enoughBalance ? "TRANSFERIR" : "BALANCE INSUFICIENTE" }
          </button> 
        </label>
      </label>
    </>
  )
}
