import { useState } from "react"
import { authWallet, scrubAddress } from "/utils/wallet-utils";
import ConnectWallet from "./connect-wallet";

export default function WalletModal(props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleWalletLoginClick = async () => {
    setIsLoading(true);
    // setIsWalletConnected(false);
    const address = await authWallet();
    props.setWalletAddress(scrubAddress(address));
    // setIsWalletConnected(true);
    setIsLoading(false)
  }

  return (
    <>
        <input type="checkbox" id="connect-wallet" className="modal-toggle" />
        <label htmlFor="connect-wallet" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <ConnectWallet isWalletConnected={props.isWalletConnected} handleWalletLoginClick={handleWalletLoginClick}/>
          </label>
        </label>
    </>
  )
}