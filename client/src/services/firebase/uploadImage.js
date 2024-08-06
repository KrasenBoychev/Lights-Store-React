//import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';

export const uploadImage = async (imageURL, folderName) => {
  const imageRef = ref(storage, `${folderName}/${imageURL.name + v4()}`);
  await uploadBytes(imageRef, imageURL);
  const downloadURL = await getDownloadURL(imageRef);

  return downloadURL;
};
