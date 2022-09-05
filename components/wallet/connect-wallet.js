import { render } from "react-dom"
import { selectedAddress } from "../../utils/wallet-utils";
import { getBalance, scrubAddress } from "/utils/wallet-utils";

export default function ConnectWallet(props) {
  return (
    <>
      {!props.isWalletConnected && (
        <div>
          <h3 className="text-lg font-bold">Conectar a una wallet</h3>
          <button onClick={props.handleWalletLoginClick} className="btn btn-secondary border-transparent w-max gap-80 my-8 mr bg-opacity-70 text-white">
            <span>MetaMask</span>
            <img className="mr-0 object-scale-down h-10 w-8" src="metamask_icon.png" alt="Icon" />
          </button>
        </div>
      )}
      {props.isWalletConnected && (
        <div className="my-5">
            <div class="stat bg-base-100 rounded-lg bg-opacity-30">
              <div class="stat-title">Address</div>
              <div class="stat-value text-secondary">{scrubAddress(selectedAddress())}</div>
              <div class="stat-desc text-lg">
                <a href={"https://goerli.etherscan.io/address/"+selectedAddress()} target="blank">
                  <span class="float-left">Ver en Etherescan</span>
                  <img src="external-link.svg" class="ml-39 mt-1 w-5 h-4" alt="Etherscan"/>
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
    </>
  )

}