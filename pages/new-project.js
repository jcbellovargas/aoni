import { useSession } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import TagInput from "../components/create-project/tag-input"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getSystemErrorName } from "util";



export default function NewProject(){
  const { data: session } = useSession({required: true})
  const [displayImage, setDisplayImage] = useState("/image-placeholder.jpg")
  const [projectImage, setProjectImage] = useState({name: ""})
  const [projectName, setProjectName] = useState()
  const [projectDescription, setProjectDescription] = useState()
  const [projectTags, setProjectTags] = useState([])
  const [projectFundingGoal, setProjectFundingGoal] = useState()
  const [projectWallet, setProjectWallet] = useState()
  const [projectDeadline, setProjectDeadline] = useState()
  const fileInputRef = useRef(null);

  const tagOptions = [    
    { id: 'Salud', text: 'Salud' },
    { id: 'Tecnologia', text: 'Tecnologia' },
    { id: 'Moda', text: 'Moda' },
    { id: 'Negocios', text: 'Negocios' },
    { id: 'Juegos', text: 'Juegos' },
    { id: 'Arte', text: 'Arte' },
    { id: 'Emergencia', text: 'Emergencia' },
    { id: 'Comida', text: 'Comida' },
    { id: 'Redes Sociales', text: 'Redes Sociales' },

  ];

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // if (!isImageFile(file)) throw new Error("Not an image");
    setProjectImage(file);
    setDisplayImage(URL.createObjectURL(file));
  }

  function isImageFile(file) {
    return file && file['type'].split('/')[0] === 'image';
  }

  const handleImageInputClick = () => {
    fileInputRef.current.click()
  }

  const handleCreateButtonClick = () => {
    alert([projectName, projectDescription, projectTags, projectFundingGoal, projectWallet, projectDeadline, projectImage])
  }

  const createButtonEnabled = () => {
    return (projectName && projectDescription && projectFundingGoal && projectWallet && projectDeadline && projectImage)
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
                  <input type="text" placeholder="Nombre" className="input input-bordered input-primary w-full" onChange={(e) => {setProjectName(e.target.value)}} />
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Descripcion</span>
                  </label>
                  <textarea className="textarea textarea-primary" onChange={(e) => setProjectDescription(e.target.value)} placeholder="Detalles del proposito del proyecto y sus caracteristicas"></textarea>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Tipo de proyecto</span>
                  </label>
                  <TagInput suggestions={tagOptions} tags={projectTags} setTags={setProjectTags}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Objetivo a recaudar (USDT)</span>
                  </label>
                  <input type="number" placeholder="Monto objetivo en USDT" className="input input-bordered input-primary w-full" onChange={(e) => {setProjectFundingGoal(e.target.value)}}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Wallet address del proyecto</span>
                  </label>
                  <input type="text" onChange={(e) => {setProjectWallet(e.target.value)}} placeholder="Wallet en la que se cobraran las recaudaciones" className="input input-bordered input-primary w-full"/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Fecha limite</span>
                  </label>
                  <DatePicker className="input input-bordered input-primary w-full" onChange={(date) => setProjectDeadline(date)} selected={projectDeadline} placeholderText={"Fecha limite para alcanzar el objetivo"}/>
                </div>

                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Imagen del proyecto</span>
                  </label>
                  <input className="hidden" ref={fileInputRef} type="file" onChange={handleFileChange}/>
                  <input type="text" value={projectImage.name} placeholder="Tamaño recomendado de 640x480" className="input input-bordered input-primary w-full" onClick={handleImageInputClick}/>
                </div>

                <div className="card-actions justify-end">
                  <button onClick={handleCreateButtonClick} className="btn btn-primary" disabled={!createButtonEnabled()}>Crear Proyecto</button>
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