export default function LoadingModal(props) {
  return (
    <>
      <input type="checkbox" id="loading-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-full">
          <h3 className="font-bold text-lg">{props.msg}</h3>
          <div className="pl-14 flex flex-col items-center justify-center  w-5/6 h-2/3 my-10">
            <div className="radial-progress animate-spin text-primary" style={{"--value":70, "--size": "7rem", "--thickness": "0.7rem"}}></div>
          </div>
        </div>
      </div>
    </>
  )
}