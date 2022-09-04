import { useState } from "react"
import { connectWallet } from "../utils/wallet-connection";


export default function WalletModal(props) {
  const [walletConnected, setWalletConnected] = useState(false);

  const handleClick = async () => {
    const address = await connectWallet();
    const srubbed_address = address.slice(0, 3) + "..." + address.slice(-4);
    setWalletConnected(true);
    console.log(srubbed_address);
    props.setWalletAddress(srubbed_address)
  }
  return (
    <>
      <input type="checkbox" id="connect-wallet" className="modal-toggle" />
      <label htmlFor="connect-wallet" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Conectar a una wallet</h3>

          <button onClick={handleClick} className="btn btn-secondary border-transparent w-max gap-80 my-8 mr bg-opacity-70 text-white">
            <span>MetaMask</span>
            <img className="mr-0 object-scale-down h-10 w-8" src="metamask_icon.png" alt="Icon" />
          </button>
          <div className="border-transparent text-black rounded-lg bg-base-200">
            <p className="p-4">El manejo de las claves privadas y confirmacion de transacciones se realiza a traves de la wallet elegida, y no por AONI. </p>
          </div>
        </label>
      </label>
    </>
  )
}