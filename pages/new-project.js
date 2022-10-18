import { useSession } from "next-auth/react"
import { useState, useRef } from "react"
import { useRouter } from 'next/router'
import TagInput from "../components/create-project/tag-input"
import { isImageFile, uploadImgToStorage } from "/utils/file-utils"
import { postData } from "/utils/fetch-utils"
import LoadingModal from '/components/loading-modal'


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const loadingModalRef = useRef(null);
  const router = useRouter();

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
    if (!isImageFile(file)) return;
  
    setProjectImage(file);
    setDisplayImage(URL.createObjectURL(file));
  }

  const handleImageInputClick = () => {
    fileInputRef.current.click()
  }

  const createProject = async () => {
    loadingModalRef.current.click();
    const projectImageUrl = await uploadImgToStorage(projectImage);
    const result = await postData('/api/create_project', { 
      name: projectName,
      description: projectDescription,
      fundingGoal: projectFundingGoal,
      tags: projectTags,
      wallet: projectWallet,
      deadline: projectDeadline,
      image: projectImageUrl
    })
    console.log(result)
    router.reload(window.location.pathname)
  }

  const createButtonEnabled = () => {
    return (projectName && projectDescription && projectFundingGoal && projectTags && projectWallet && projectDeadline && projectImage)
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
                  <input type="text" value={projectImage.name} placeholder="Tamaño recomendado de 640x480" className="input input-bordered input-primary w-full cursor-pointer" onClick={handleImageInputClick}/>
                </div>

                <div className="card-actions justify-end">
                  <button onClick={createProject} className="btn btn-primary" disabled={!createButtonEnabled()}>Crear Proyecto</button>
                </div>
              </div>
            </div>
            <img onClick={handleImageInputClick} src={displayImage} className="cursor-pointer mt-40 rounded-lg shadow-2xl w-[640px] h-[480px]" />
          </div>
        )}
      </div>
      <label ref={loadingModalRef} htmlFor="loading-modal" className="h-0 w-0 invisible"/>
      <LoadingModal msg={"Creando proyecto"}/>
    </>
  )
}