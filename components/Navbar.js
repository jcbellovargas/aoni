import { useState } from "react";
import ConnectWalletModal from "./ConnectWalletModal";
const { ethers } = require("ethers");
import { loadWallet } from "/utils/wallet_connection"

export default function Navbar(){


    const handleClick = async () => {

      // Connect with Metamask
      if(!walletConnected){
        const address = await loadWallet();
        const srubbed_address = address.substr(0,3) + "..." + address.substr(-4,4);
        setWalletConnected(true);
        setWalletAddress(srubbed_address)
      }else{

      }
      

    }

    const [walletAddress, setWalletAddress] = useState("connectar wallet");
    const [walletConnected, setWalletConnected] = useState(false);

    return (
      <div className="navbar bg-100 gap-4 p-6">
        <div className="flex-1">
          <a className="btn btn-ghost rounded-full normal-case text-3xl text-primary">aoni</a>
        </div>
        <div className="flex-none">
          <a className="btn btn-primary rounded-full normal-case text-l text-white">explorar</a>
        </div>
        <div className="flex-none">
          <label htmlFor="connect-wallet" className="btn btn-primary rounded-full normal-case text-l text-white">{walletAddress}</label>
          <ConnectWalletModal/>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
            <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li><a>Ajustes</a></li>
              <li><a>Ver Perfil</a></li>
              <li><a>Cerrar Sesion</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
}