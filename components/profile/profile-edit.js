import { useState, useEffect, useRef, useContext } from "react";
import { storage } from "../../firebase"
import { ref, uploadBytes} from "firebase/storage"
import { v4 } from 'uuid'

export default function ProfileEdit(props){
  const [profileImg, setProfileImg] = useState(props.session["user"]["image"]);
  const [imageUpload, setImageUpload] = useState(null);
  const inputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setImageUpload(file);
    setProfileImg(URL.createObjectURL(file));
  }

  const handleImageClick = () => {
    inputRef.current.click()
  }

  const saveProfile = async () => {
    alert(JSON.stringify(process.env))
    if(imageUpload){
      const imageRef = ref(storage, `images/${imageUpload.name}${v4()}`);
      const result = await uploadBytes(imageRef, imageUpload)
      alert(result);
      // const fireRef = storageRef.child(file.name);
      // await fireRef.put(file);
      // const fileUrl = await fileRef.getDownloadURL();
    }

  }

  return(
    
    <div className="card mt-8 bg-base-100 shadow-xl">
      <input className="hidden" ref={inputRef} type="file" onChange={handleFileChange}/>
      <div className="card-body">
        <h2 className="card-title">Editar Perfil</h2>
        <img className="mask mask-squircle w-20" src={profileImg} onClick={handleImageClick} />
        <div className="form-control w-full max-w-2xl">
          <label className="label">
            <span className="label-text">Nombre de usuario</span>
          </label>
          <input type="text" value={props.session["user"]["name"]} placeholder="Nombre" className="input input-bordered w-full" />
        </div>
        <div className="form-control w-full max-w-2xl">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" value={props.session["user"]["email"]} placeholder="Email" className="input input-bordered w-full" />
        </div>
        <div className="form-control w-full max-w-2xl">
          <label className="label">
            <span className="label-text">Wallet Address</span>
          </label>
          <input type="text" value={props.session["user"]["wallet"]} placeholder="Wallet Address" className="input input-bordered w-full" />
        </div>
        <div className="card-actions justify-end">
          <button onClick={saveProfile} className="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  )
}