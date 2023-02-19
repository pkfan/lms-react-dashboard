import insertCrossMarkOnFileError from './insertCrossMarkOnFileError';
import insertHtmlOfFileNameIsLongError from './insertHtmlOfFileNameIsLongError';


function checkLessonNameSize(lessonFile, charLength=65){
    // if file name is greater than 60 character then cancel uploading file
    if(lessonFile.file.name.length > charLength){
      lessonFile.cancel();
      insertCrossMarkOnFileError(lessonFile.file);
      insertHtmlOfFileNameIsLongError(lessonFile.file);
      return "cancel";
    }
    return "success";
}

export default checkLessonNameSize;
