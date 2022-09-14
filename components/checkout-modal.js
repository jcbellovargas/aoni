export default function CheckoutModal(props) {
  return (
    <>
      <input type="checkbox" id="checkout-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="checkout-modal" className="btn btn-sm btn-circle bg-primary border-none absolute right-2 top-2">✕</label>

          <h3 className="text-lg font-bold mb-5">Realizar Transferencia</h3>
          <div className="p-8 rounded-full bg-primary bg-opacity-10 border-none">
            <div className="flex">
              <input type="number" inputmode="numeric" placeholder="0" className="input text-4xl input-lg w-full max-w-m h-15 bg-transparent focus:outline-0" />
              <div className="rounded-full bg-primary bg-opacity-10 flow-root w-52 p-2">
                <img className="h-10 float-left ml-1 mt-1" src="/tether-seeklogo.com.svg"></img>
                <span className="float-right text-lg font-bold pt-2 px-3">USDT</span>
              </div>
            </div>
            <span className="absolute right-20 text-lg">Balance: 30000</span>
          </div>

          {/* <div className="border-transparent text-black rounded-full bg-primary bg-opacity-10 px-4 mt-5 text-sm">
            <p className="p-4">El manejo de las claves privadas y confirmacion de transacciones se realiza a traves de la wallet elegida, y no por AONI. </p>
          </div> */}

          <button className="btn btn-secondary rounded-full  border-none text-xl w-full mt-5 h-20">TRANSFERIR</button>



        </div>
      </div>
    </>
  )
}