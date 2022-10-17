import { useSession } from "next-auth/react"
import { useState, useRef } from "react"
import TagInput from "../components/create-project/tag-input"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function NewProject(){
  const { data: session } = useSession({required: true})
  const [startDate, setStartDate] = useState(new Date());
  const [imageUpload, setImageUpload] = useState({name: ""})
  const [displayImage, setDisplayImage] = useState("/image-placeholder.jpg")
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setImageUpload(file);
    setDisplayImage(URL.createObjectURL(file));
  }

  const handleImageInputClick = () => {
    fileInputRef.current.click()
  }

  return(
    <>
      <div className="grid justify-items-center mb-10">
        { session && (
          <div className="card w-2/3 bg-base-100 shadow-xl grid grid-cols-2">
            <div className="card-body">
              <h2 className="card-title">{`Crea tu nuevo proyecto`}</h2>
              <div className="card-body">
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Nombre del proyecto</span>
                  </label>
                  <input type="text" defaultValue={""} placeholder="Nombre" className="input input-bordered input-primary w-full" onChange={() => {}} />
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Descripcion</span>
                  </label>
                  <textarea className="textarea textarea-primary" placeholder="Detalles del proposito del proyecto y sus caracteristicas"></textarea>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Tipo de proyecto</span>
                  </label>
                  <TagInput/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Objetivo a recaudar (USDT)</span>
                  </label>
                  <input type="number" defaultValue={""} placeholder="Monto objetivo en USDT" className="input input-bordered input-primary w-full" onChange={() => {}}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Wallet address del proyecto</span>
                  </label>
                  <input type="text" defaultValue={""} placeholder="Wallet en la que se cobraran las recaudaciones" className="input input-bordered input-primary w-full" onChange={() => {}}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Fecha limite</span>
                  </label>
                  <DatePicker className="input input-bordered input-primary w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>

                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Imagen del proyecto</span>
                  </label>
                  <input className="hidden" ref={fileInputRef} type="file" onChange={handleFileChange}/>
                  <input type="text" value={imageUpload.name} placeholder="Tamaño recomendado de 640x480" className="input input-bordered input-primary w-full" onClick={handleImageInputClick}/>
                </div>

                <div className="card-actions justify-end">
                  <button onClick={() => {}} className="btn btn-primary" disabled={false}>Crear Proyecto</button>
                </div>
              </div>
            </div>
            <img onClick={handleImageInputClick} src={displayImage} className=" mt-40 rounded-lg shadow-2xl w-[640px] h-[480px]" />
          </div>
        )}
      </div>
      
    </>
  )
}