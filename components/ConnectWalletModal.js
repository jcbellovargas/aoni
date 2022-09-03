import { useState } from "react"


export default function ConnectWalletModal(props) {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <>

    <input type="checkbox" id="connect-wallet" class="modal-toggle" />
    <label for="connect-wallet" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <h3 class="text-lg font-bold">Conectar a una wallet</h3>

        <button class="btn btn-secondary border-transparent w-max gap-80 my-8 mr bg-opacity-80 text-white">
          <span>MetaMask</span>
          <img  class="mr-0 object-scale-down h-10 w-8" src="https://app.uniswap.org/static/media/metamask.02e3ec27.png" alt="Icon"/>
        </button>
        <div class="border-transparent text-black rounded-lg bg-base-200">
          <p class="p-4">El manejo de las claves privadas y confirmacion de transacciones se realiza a traves de la wallet elegida, y no por AONI. </p>
        </div>
      </label>
    </label>
    </>
  )
}