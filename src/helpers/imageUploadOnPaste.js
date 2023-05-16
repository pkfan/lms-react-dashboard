import resumableUpload from '@/helpers/resumableUpload';
import config from '@/config';
import { IMAGE_BODY_EXTENSIONS } from '@/constants/imageExtensions';

export function imageUploadOnPaste({
  onAdded = () => {},
  onProgress = () => {},
  onSuccess = () => {},
  onError = () => {},
}) {
  // set window global variable becuase i want to execute following code MdOutlineTimeToLeave;
  if (window.tipTapImageUploadOnPaste) {
    return;
  }
  window.tipTapImageUploadOnPaste = true;

  // const createDataUrlFromFileReader = (file) => {
  //   let reader = new FileReader();
  //   reader.onload = function (event) {
  //     console.log('event.target.result : image copy', event.target.result); // data url!
  //     // after load just use function lik (setSuccess url)
  //   };

  //   reader.readAsDataURL(file);
  // };

  // get image url with paste
  // https://stackoverflow.com/questions/6333814/how-does-the-paste-image-from-clipboard-functionality-work-in-gmail-and-google-c
  document.onpaste = function (event) {
    let items = (event.clipboardData || event.originalEvent.clipboardData).items;
    console.log('JSON.stringify(items) : image copy', JSON.stringify(items)); // might give you mime types
    for (let index in items) {
      let item = items[index];
      if (item.kind === 'file') {
        let file = item.getAsFile();
        const extenstions = IMAGE_BODY_EXTENSIONS;
        let extenstion = file.type.split('/')[1]; // image/jpg

        // type :"image/svg+xml"
        if (extenstion.includes('+')) {
          extenstion = extenstion.split('+')[0];
        }

        console.log('file : ', file);
        console.log('file : ', file.type);

        if (extenstions.includes(extenstion)) {
          resumableUpload({
            //   domElement: divElement,
            url: config.baseUrl + '/body-image',
            maxFiles: 1,
            maxFileSize: config.imageUploadSize,
            fileExtenstions: extenstions,
            imageFileViaPaste: file,
            onAdded,
            onProgress,
            onSuccess,
            onError,
          });
        }

        ///////
      }
    }
  };
}

export default imageUploadOnPaste;
