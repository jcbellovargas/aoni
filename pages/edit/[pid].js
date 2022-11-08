import { useSession } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from 'next/router'
import TagInput from "/components/create-project/tag-input"
import { isImageFile, uploadImgToStorage } from "/utils/file-utils"
import { postData, getData } from "/utils/fetch-utils"
import LoadingModal from '/components/loading-modal'
import ErrorModal from '/components/error-modal'

export default function NewProject(){
  const { data: session } = useSession({required: true})
  const [displayImage, setDisplayImage] = useState("/image-placeholder.jpg")
  const [projectImage, setProjectImage] = useState({name: ""})
  const [projectName, setProjectName] = useState()
  const [projectDescription, setProjectDescription] = useState()
  const [projectTags, setProjectTags] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef(null);
  const loadingModalRef = useRef(null);
  const errorModalRef = useRef(null);
  const router = useRouter();
  const { pid } = router.query;

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
    debugger;
    setDisplayImage(URL.createObjectURL(file));
  }

  const handleImageInputClick = () => {
    fileInputRef.current.click()
  }

  useEffect(() => {
    if(!pid) return;
    const fetchProjectDetails = async (id) => {
      try {
        const response = await getData('/api/get_project', { id: id });
        setProjectName(response.project.name);
        setProjectDescription(response.project.description);
        setProjectTags(response.project.tags.map((t) => { return {id: t, text: t} }));
        setDisplayImage(response.project.image);
        setProjectImage({ name: response.project.image });
      } catch(error) {
        console.log(error);
      }
    }
    fetchProjectDetails(pid);
  },[pid])

  const updateProject = async () => {
    loadingModalRef.current.click();
    try {
      let projectImageUrl;
      debugger;
      if (isImageFile(projectImage)) {
        projectImageUrl = await uploadImgToStorage(projectImage);
      } else {
        projectImageUrl = projectImage.name;
      }
      debugger;
      const response = await postData('/api/update_project', {
        id: pid,
        name: projectName,
        description: projectDescription,
        tags: projectTags.map((t) => { return t.id }),
        image: projectImageUrl,
      });
      debugger;
      if (response.error){
        showError(`Hubo un error al actualizar el proyecto: \n${error}`);
      } else {
        router.push("/profile")
      }
    } catch(error) {
      console.log(error);
      showError(`Hubo un error al actualizar el proyecto: \n${error}`);
    }
    loadingModalRef.current.click();
  }

  const showError = (msg) => {
    setErrorMessage(msg)
    errorModalRef.current.click();
  }

  const updateButtonEnabled = () => {
    return (projectName && projectDescription && projectTags && projectImage)
  }

  return(
    <>
      <div className="grid justify-items-center mb-10">
        { session && (
          <div className="card w-2/3 bg-base-100 shadow-xl grid grid-cols-2">
            <div className="card-body">
              <h2 className="card-title">{`Editar Proyecto`}</h2>
              <div className="card-body">
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Nombre del proyecto</span>
                  </label>
                  <input type="text" defaultValue={projectName} placeholder="Nombre" className="input input-bordered input-primary w-full" onChange={(e) => {setProjectName(e.target.value)}} />
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Descripcion</span>
                  </label>
                  <textarea defaultValue={projectDescription} className="textarea textarea-primary" onChange={(e) => setProjectDescription(e.target.value)} placeholder="Detalles del proposito del proyecto y sus caracteristicas"></textarea>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Tipo de proyecto</span>
                  </label>
                  <TagInput suggestions={tagOptions} tags={projectTags} setTags={setProjectTags}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Imagen del proyecto</span>
                  </label>
                  <input className="hidden" ref={fileInputRef} type="file" onChange={handleFileChange}/>
                  <input type="text" value={projectImage.name} placeholder="Tamaño recomendado de 640x480" className="input input-bordered input-primary w-full cursor-pointer" onClick={handleImageInputClick}/>
                </div>

                <div className="card-actions justify-end">
                  <button onClick={updateProject} className="btn btn-primary mt-10" disabled={!updateButtonEnabled()}>Actualizar Proyecto</button>
                </div>
              </div>
            </div>
            <img onClick={handleImageInputClick} src={displayImage} className="cursor-pointer mt-20 rounded-lg shadow-2xl w-[640px] h-[480px]" />
          </div>
        )}
      </div>

      <LoadingModal msg={"Creando proyecto"} openRef={loadingModalRef}/>
      <ErrorModal msg={errorMessage} openRef={errorModalRef}/>
    </>
  )
}