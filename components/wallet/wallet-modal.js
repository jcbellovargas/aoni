import { useState } from "react"
import { authWallet, scrubAddress } from "/utils/wallet-utils";
import { getScrubbedSelectedAddress, getSelectedAddress } from "../../utils/wallet-utils";

export default function WalletModal(props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleWalletLoginClick = async () => {
    setIsLoading(true);
    const address = await authWallet();
    props.setWalletAddress(scrubAddress(address));
    setIsLoading(false)
  }

  return (
    <>
        <input type="checkbox" id="connect-wallet" className="modal-toggle" />
        <label htmlFor="connect-wallet" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            {!props.isWalletConnected && (
              <div>
                <h3 className="text-lg font-bold">Conectar a una wallet</h3>
                <button onClick={handleWalletLoginClick} className="btn btn-secondary border-transparent w-max gap-80 my-8 mr bg-opacity-70 text-white">
                  <span>MetaMask</span>
                  <img className="mr-0 object-scale-down h-10 w-8" src="metamask_icon.png" alt="Icon" />
                </button>
              </div>
            )}
            {props.isWalletConnected && (
              <div className="my-5">
                <h3 className="text-lg font-bold">Wallet conectada</h3>
                  <div class="stat bg-base-100 rounded-lg bg-opacity-30 pl-1">
                    <div class="stat-title text-2xl">Address</div>
                    <div class="stat-value text-5xl text-secondary">{getScrubbedSelectedAddress()}</div>
                    <div class="stat-desc text-xl">
                      <a href={"https://goerli.etherscan.io/address/"+getSelectedAddress()} class="justify-items-center" target="blank">
                        <div class="flex mt-3">
                          <img src="external-link.svg" class="mt-2 ml-0 w-5 h-4" alt="Etherscan"/>
                          <span class="float-left">Ver en Etherescan</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="stats bg-primary text-primary-content">
                  </div>
              </div>
            )}
            <div className="border-transparent text-black rounded-lg bg-base-200">
              <p className="p-4">El manejo de las claves privadas y confirmacion de transacciones se realiza a traves de la wallet elegida, y no por AONI. </p>
            </div>
          </label>
        </label>
    </>
  )
}