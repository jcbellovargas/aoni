import { useSession } from "next-auth/react"
import { useState, useRef } from "react"
import { useRouter } from 'next/router'
import TagInput from "../components/create-project/tag-input"
import { isImageFile, uploadImgToStorage } from "/utils/file-utils"
import { postData } from "/utils/fetch-utils"
import LoadingModal from '/components/loading-modal'
import ErrorModal from '/components/error-modal'
import { deployProjectContract } from "../utils/wallet-utils"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewProject(){
  const { data: session } = useSession({required: true})
  const [displayImage, setDisplayImage] = useState("/image-placeholder.jpg")
  const [projectImage, setProjectImage] = useState({name: ""})
  const [projectName, setProjectName] = useState()
  const [projectDescription, setProjectDescription] = useState()
  const [projectTags, setProjectTags] = useState([])
  const [projectFundingGoal, setProjectFundingGoal] = useState({})
  const [projectOwnerAddress, setProjectOwnerAddress] = useState(session.user.walletAddress || "")
  const [projectDeadline, setProjectDeadline] = useState()
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef(null);
  const loadingModalRef = useRef(null);
  const errorModalRef = useRef(null);
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
    try {
      const projectImageUrl = await uploadImgToStorage(projectImage);
      const projectAddress = await deployProjectContract(projectFundingGoal.amount, projectDeadline, projectOwnerAddress);
      const response = await postData('/api/create_project', { 
        name: projectName,
        description: projectDescription,
        fundingGoal: projectFundingGoal,
        tags: projectTags.map((t) => { return t.id }),
        ownerAddress: projectOwnerAddress,
        contract: projectAddress,
        deadline: projectDeadline,
        image: projectImageUrl,
        user: session.user.id
      });
      if (response.error){
        showError(`Hubo un error al crear el proyecto: \n${error}`);
      } else {
        router.push("/profile")
      }
    } catch(error) {
      console.log(error);
      showError(`Hubo un error al crear el proyecto: \n${error}`);
    }
    loadingModalRef.current.click();
  }

  const showError = (msg) => {
    setErrorMessage(msg)
    errorModalRef.current.click();
  }

  const createButtonEnabled = () => {
    return (projectName && projectDescription && projectFundingGoal && projectTags && projectOwnerAddress && projectDeadline && projectImage)
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
                  <input type="number" placeholder="Monto objetivo en USDT" className="input input-bordered input-primary w-full" onChange={(e) => {setProjectFundingGoal({token: "USDT", amount: e.target.value})}}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Wallet address del proyecto</span>
                  </label>
                  <input type="text" onChange={(e) => {setProjectOwnerAddress(e.target.value)}} defaultValue={session.user.walletAddress} placeholder="Wallet en la que se cobraran las recaudaciones" className="input input-bordered input-primary w-full"/>
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

      <LoadingModal msg={"Creando proyecto"} openRef={loadingModalRef}/>
      <ErrorModal msg={errorMessage} openRef={errorModalRef}/>
    </>
  )
}