import {
  BsFileEarmarkImage,
  BsFileEarmarkPlayFill,
  BsFileEarmarkMusicFill,
  BsFileEarmarkPdfFill,
  BsFileEarmarkPptFill,
  BsFileEarmarkTextFill,
  BsFileEarmarkWordFill,
  BsFileEarmarkZipFill,
} from 'react-icons/bs';

import { GrDatabase } from 'react-icons/gr';

export function ExtensionFileSvg({ extension, ...others }) {
  const imageExtensions = 'jpg,jpeg,png,webp,gif,svg';
  const videosExtension =
    'mp4,m4p,m4v,webm,avi,wmv,mov,qt,flv,f4v,swf,mpg,mp2,mpe,mpv,avchd,mkv,mpeg-2,mpeg-4,3gp,h.264';
  const allAudioExtension = 'mp3,aac,ogg,wma,flac,alac,aif,cda,mid,mpa,wav,wpl';

  const zipExtension =
    'rar,zip,7z,gzip,ace,arj,bz2,cap,iso,jar,lzh,tar,uue,xz,z,deb,pkg,rpm,tar.gz,  '; //from winrar software

  const dataFilesExtension = 'csv,dat,db,dbf,log,mdb,sav,sql,tar,xml';

  if (imageExtensions.includes(extension)) {
    return <BsFileEarmarkImage {...others} />;
  } else if (videosExtension.includes(extension)) {
    return <BsFileEarmarkPlayFill {...others} />;
  } else if (allAudioExtension.includes(extension)) {
    return <BsFileEarmarkMusicFill {...others} />;
  } else if (extension == 'pdf') {
    return <BsFileEarmarkPdfFill {...others} />;
  } else if ('ppt,pptx'.includes(extension)) {
    return <BsFileEarmarkPptFill {...others} />;
  } else if ('doc,docx'.includes(extension)) {
    return <BsFileEarmarkWordFill {...others} />;
  } else if (zipExtension.includes(extension)) {
    return <BsFileEarmarkZipFill {...others} />;
  } else if (dataFilesExtension.includes(extension)) {
    return <GrDatabase {...others} />;
  } else {
    return <BsFileEarmarkTextFill {...others} />;
  }
}

export default ExtensionFileSvg;
