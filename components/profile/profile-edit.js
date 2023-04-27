import { useState, useEffect, useRef, useContext } from "react";
import { postData } from "/utils/fetch-utils"
import { uploadImgToStorage } from "/utils/file-utils"
import { useRouter } from 'next/router'

export default function ProfileEdit(props){
  const router = useRouter()
  const [profileImg, setProfileImg] = useState(props.session["user"]["image"]);
  const [imageUpload, setImageUpload] = useState(null);
  const inputRef = useRef(null);

  const [userName, setUserName] = useState(props.session["user"]["name"]);
  const [userWalletAddress, setUserWalletAddress] = useState(props.session["user"]["walletAddress"]);
  
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setImageUpload(file);
    setProfileImg(URL.createObjectURL(file));
  }

  const handleImageClick = () => {
    inputRef.current.click()
  }

  const updateUser = async (imageUrl) => {
    postData('/api/update_user', { 
      id: props.session["user"]["id"],
      name: userName,
      image: imageUrl,
      walletAddress: userWalletAddress
    })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }

  const disableSave = () => {
    return (!!!userWalletAddress || !!!userName);
  }

  const saveProfile = async () => {
    const imageUrl = await uploadImgToStorage(imageUpload);
    await updateUser(imageUrl);
    router.reload(window.location.pathname)
  }

  return(
    
    <div className="card mt-8 bg-base-100 shadow-xl">
      <input className="hidden" ref={inputRef} type="file" onChange={handleFileChange}/>
      <div className="card-body">
        <h2 className="card-title">Edit Profile</h2>
        <img className="mask mask-squircle w-20 cursor-pointer" src={profileImg} onClick={handleImageClick} />
        <div className="form-control w-full max-w-2xl">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" defaultValue={userName} placeholder="Name" className="input input-bordered w-full" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="form-control w-full max-w-2xl">
          <label className="label">
            <span className="label-text">Default wallet for all projects</span>
          </label>
          <input type="text" defaultValue={userWalletAddress} placeholder="Wallet Address" className="input input-bordered w-full" onChange={(e) => setUserWalletAddress(e.target.value)}/>
        </div>
        <div className="card-actions justify-end">
          <button onClick={saveProfile} className="btn btn-primary" disabled={disableSave()}>Save</button>
        </div>
      </div>
    </div>
  )
}