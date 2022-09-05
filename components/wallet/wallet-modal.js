import { useState } from "react"
import { authWallet, scrubAddress } from "/utils/wallet-utils";
import ConnectWallet from "./connect-wallet";
import WalletDetails from "./wallet-details";

export default function WalletModal(props) {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleWalletLoginClick = async () => {
    setIsLoading(true);
    setIsWalletConnected(false);
    const address = await authWallet();
    props.setWalletAddress(scrubAddress(address));
    setIsWalletConnected(true);
    setIsLoading(false)
  }

  return (
    <>
        <input type="checkbox" id="connect-wallet" className="modal-toggle" />
        <label htmlFor="connect-wallet" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <ConnectWallet isWalletConnected={isWalletConnected} handleWalletLoginClick={handleWalletLoginClick}/>
            {/* <WalletDetails isWalletConnected={isWalletConnected}/> */}
          </label>
        </label>
    </>
  )
}