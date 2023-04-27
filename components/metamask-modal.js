import { useRef, useEffect, useState } from 'react'

export default function MetamaskModal(props) {

  const openRef = useRef(null);

  useEffect(() => {
    if (typeof window.ethereum == 'undefined') {
      openRef.current.click();
    }
  },[])

  return (
    <>
      <label ref={openRef} htmlFor="metamask-modal" className="btn modal-button hidden"/>

      <input type="checkbox" id="metamask-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="metamask-modal" className="hidden btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <img className="mr-2 object-scale-down h-6 w-6 float-left" src="/metamask_icon.png" alt="Icon" />
          <h3 className="text-lg font-bold">This application requires Metamask installed on your browser.</h3>
          <p className="py-4">You can download it
            <a className="text-primary" href="https://metamask.io/download/" target="blank"> clicking here</a>
          </p>
        </div>
      </div>
    </>
  )
}


