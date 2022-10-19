export default function ErrorModal(props) {
  return (
    <>
      <label ref={props.openRef} htmlFor="error-modal" className="btn modal-button hidden"/>

      <input type="checkbox" id="error-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-red-300">
          <label htmlFor="error-modal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-red-500">✕</label>
          <h3 className="text-lg font-bold">Error</h3>
          <p className="py-4">{props.msg}</p>
          
        </div>
      </div>
    </>
  )
}


