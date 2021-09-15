import { StyledUploadImage } from './UploadImage.styles';
import { useState, useContext, useRef } from 'react';
import { postImageToAPI } from 'API';
import { ImagesContext } from 'contexts/imagesContext';
import { Button } from 'assets/styles/style';

const validateFile = (extension, size) => {
  const acceptableSize = 5000000;
  const acceptableExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

  if (!acceptableExtensions.includes(extension)) throw new Error('Unsupported file');

  if (size > acceptableSize) throw new Error('File is too large');
};

const convertImageToBase64 = (image) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);

    fileReader.onload = () => {
      return resolve(fileReader.result);
    };

    fileReader.onerror = () => {
      reject(new Error('Something went wrong. Please, try again :('));
    };
  });
};

export const createExtension = (file) => file.name.substr(file.name.lastIndexOf('.'));

const UploadImage = () => {
  const [base64Image, setBase64Image] = useState('');
  const [disabledButton, setDisableButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { getImages } = useContext(ImagesContext);
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const urlRef = useRef();

  const callAPIPost = async () => {
    setDisableButton(true);
    try {
      await postImageToAPI(base64Image);
      await getImages();
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong');
    }
  };

  const handleImageUpload = async (event) => {
    if (event.target.files.length !== 0) {
      const image = event.target.files[0];
      try {
        const extension = createExtension(image);
        const size = image.size;
        const name = image.name;

        validateFile(extension, size);
        const convertedImage = await convertImageToBase64(image);
        await setBase64Image(convertedImage);
        setDisableButton(false);
        setErrorMessage('');
        setFileName(name);
        console.log(base64Image);
      } catch (err) {
        setErrorMessage(err.message);
        setBase64Image('');
        setDisableButton(true);
      }
    } else {
      setFileName('');
      setErrorMessage('');
      setBase64Image('');
      setDisableButton(true);
    }
  };

  const getUrl = (event) => {
    setFileUrl(event.target.value);
    setDisableButton(false);
    setErrorMessage('');
  };

  const getBase64Url = () => {
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    var img = document.getElementById('preview');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    const base64 = c.toDataURL();
    //console.log(base64);
    setBase64Image(base64);
  };

  return (
    <StyledUploadImage>
      <h3>Upload an image </h3>
      <h5>Acceptable files: png, gif, jpg</h5>
      <form className="file-form">
        <p className="file-message">Choose a file or drag and drop</p>
        {fileName && <p className="file-name">{fileName}</p>}
        <input size={0} className="file-input" type="file" accept="image/png, image/gif, image/jpg" onChange={handleImageUpload} />
      </form>
      {base64Image && <img src={base64Image} alt="Chosen file" />}
      <p>{errorMessage}</p>
      <form className="url-form">
        <label>
          Paste URL
          <input type="text" onBlur={getUrl} />
        </label>
      </form>
      <img src={fileUrl} ref={urlRef} crossOrigin="anonymous" id="preview" alt="Chosen file" onLoad={getBase64Url} />
      <canvas id="myCanvas" />
      <Button disabled={disabledButton} onClick={callAPIPost}>
        POST
      </Button>
    </StyledUploadImage>
  );
};

export default UploadImage;
