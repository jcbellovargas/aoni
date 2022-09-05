import { useEffect, useState } from "react";
import { getScrubbedSelectedAddress } from "../utils/wallet-utils";
import WalletModal from "./wallet/wallet-modal";
import Link from 'next/link'

export default function Navbar(){

  const [walletAddress, setWalletAddress] = useState("connectar wallet");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const selectedAddress = getScrubbedSelectedAddress();
    if(!!selectedAddress){
      setWalletAddress(selectedAddress);
      setIsWalletConnected(true);
    }
  })

  return (
    <div className="navbar bg-100 gap-4 p-6">
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost rounded-full normal-case text-3xl text-primary">aoni</a>
        </Link>

      </div>
      <div className="flex-none">
        <Link href="/explorar">
          <a className="btn btn-primary rounded-full normal-case text-l text-white">explorar</a>
        </Link>
      </div>
      <div className="flex-none">
        <label htmlFor="connect-wallet" className="btn btn-primary rounded-full normal-case text-l text-white">{walletAddress}</label>
        <WalletModal isWalletConnected={isWalletConnected} setWalletAddress={setWalletAddress} selectedAddress={walletAddress}/>
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