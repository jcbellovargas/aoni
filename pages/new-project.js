import { useSession } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
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
  const [projectOwnerAddress, setProjectOwnerAddress] = useState("")
  const [projectDeadline, setProjectDeadline] = useState()
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef(null);
  const loadingModalRef = useRef(null);
  const errorModalRef = useRef(null);
  const router = useRouter();

  const tagOptions = [    
    { id: 'Health', text: 'Health' },
    { id: 'Technology', text: 'Technology' },
    { id: 'Fashion', text: 'Fashion' },
    { id: 'Business', text: 'Business' },
    { id: 'Games', text: 'Games' },
    { id: 'Art', text: 'Art' },
    { id: 'Emergency', text: 'Emergency' },
    { id: 'Food', text: 'Food' },
    { id: 'Social Networks', text: 'Social Networks' },
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

  useEffect(() => {
    if(!session) return;
    setProjectOwnerAddress(session.user.walletAddress);
  },[session])

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
        showError(`We found an error trying to create the project: \n${error}`);
      } else {
        router.push("/profile")
      }
    } catch(error) {
      console.log(error);
      showError(`We found an error trying to create the project: \n${error}`);
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
              <h2 className="card-title">{`Create your new project`}</h2>
              <div className="card-body">
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Project Name</span>
                  </label>
                  <input type="text" placeholder="Name" className="input input-bordered input-primary w-full" onChange={(e) => {setProjectName(e.target.value)}} />
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea className="textarea textarea-primary" onChange={(e) => setProjectDescription(e.target.value)} placeholder="Project details and goal description"></textarea>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Project Type</span>
                  </label>
                  <TagInput suggestions={tagOptions} tags={projectTags} setTags={setProjectTags}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Funding goal (USDT)</span>
                  </label>
                  <input type="number" placeholder="Funding Goal (USDT)" className="input input-bordered input-primary w-full" onChange={(e) => {setProjectFundingGoal({token: "USDT", amount: e.target.value})}}/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Project wallet address</span>
                  </label>
                  <input type="text" onChange={(e) => {setProjectOwnerAddress(e.target.value)}} defaultValue={projectOwnerAddress} placeholder="Wallet address to collect the funding" className="input input-bordered input-primary w-full"/>
                </div>
                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Deadline</span>
                  </label>
                  <DatePicker className="input input-bordered input-primary w-full" onChange={(date) => setProjectDeadline(date)} selected={projectDeadline} placeholderText={"Project deadline"}/>
                </div>

                <div className="form-control w-full max-w-2xl">
                  <label className="label">
                    <span className="label-text">Project photo</span>
                  </label>
                  <input className="hidden" ref={fileInputRef} type="file" onChange={handleFileChange}/>
                  <input type="text" value={projectImage.name} placeholder="Recommended size 640x480" className="input input-bordered input-primary w-full cursor-pointer" onClick={handleImageInputClick}/>
                </div>

                <div className="card-actions justify-end">
                  <button onClick={createProject} className="btn btn-primary" disabled={!createButtonEnabled()}>Create Project</button>
                </div>
              </div>
            </div>
            <img onClick={handleImageInputClick} src={displayImage} className="cursor-pointer mt-40 rounded-lg shadow-2xl w-[640px] h-[480px]" />
          </div>
        )}
      </div>

      <LoadingModal msg={"Creating Project"} openRef={loadingModalRef}/>
      <ErrorModal msg={errorMessage} openRef={errorModalRef}/>
    </>
  )
}