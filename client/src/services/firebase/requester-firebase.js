//import { storage } from './firebase';
import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';

export const uploadImage = async (imageURL, folderName) => {
  const imageRef = ref(storage, `${folderName}/${imageURL.name + v4()}`);
  await uploadBytes(imageRef, imageURL);
  const downloadURL = await getDownloadURL(imageRef);

  return downloadURL;
};

export const deleteImage = async (light) => {
  const storage = getStorage();

  const desertRef = ref(storage, light.imageURL);
  
  deleteObject(desertRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    throw new Error(`${light.name} could NOT be deleted successfully! Try again please!`);
  });
};
