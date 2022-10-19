export default function LoadingModal(props) {
  return (
    <>
      <label ref={props.openRef} htmlFor="loading-modal" className="btn modal-button hidden"/>

      <input type="checkbox" id="loading-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="loading-modal" className="hidden btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold">{props.msg}</h3>
          <div className="pl-14 flex flex-col items-center justify-center  w-5/6 h-2/3 my-10">
            <div className="radial-progress animate-spin text-primary" style={{"--value":70, "--size": "7rem", "--thickness": "0.7rem"}}></div>
          </div>
        </div>
      </div>
    </>
  )
}


