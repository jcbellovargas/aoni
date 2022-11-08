import { storage } from "/firebase"
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { v4 } from 'uuid'

export const isImageFile = (file) => {
  return file && file['type'] && file['type'].split('/')[0] === 'image';
}

export const uploadImgToStorage = async (image) => {
  if (!image) return;
  const imageRef = ref(storage, `images/${image.name}${v4()}`);
  await uploadBytes(imageRef, image);
  return await getDownloadURL(imageRef);
}