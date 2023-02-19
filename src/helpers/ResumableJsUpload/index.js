import Resumable from "resumablejs";
import $ from "jquery";
import insertLessonsHtmlUploadingElementInDom from './insertLessonsHtmlUploadingElementInDom';
import updateProgress from './updateProgress';
import insertTickMarkOnFileSuccess from './insertTickMarkOnFileSuccess';
import insertCrossMarkOnFileError from "./insertCrossMarkOnFileError";
import fileErrorFromServerSide from './fileErrorFromServerSide';
import hideUploadImageWhenFileAdded from './hideUploadImageWhenFileAdded';
import hideUploadImageOnDropFiles from './hideUploadImageOnDropFiles';

let dropLessonsFile = $('#drag-drop-lessons');
let browseLessonFiles = $('#browseLessonFiles');



let resumable = new Resumable({
//   target: '{{ route('dashboard.upload-lessons.upload') }}',
    target: window.file_uploading_url_route,
    query:{_token: window.csrf_token} ,// CSRF token
    // fileType: ['ts','mp4','html'],
    // fileType: ['mp4','mp3'],
    // fileType: ['ts'],
    simultaneousUploads: 20,
    chunkSize: 10 * 1024 * 1024, // 5MB
    headers: {
        'Accept' : 'application/json'
    },
    testChunks: false,
    throttleProgressCallbacks: 1,
});

if(browseLessonFiles[0] && dropLessonsFile[0]){
    resumable.assignBrowse(browseLessonFiles[0]);
    resumable.assignDrop(dropLessonsFile[0]);
}


resumable.on('fileAdded', function (lessonFile) { // trigger when lessonFile picked

// showProgress(lessonFile.file.uniqueIdentifier);
// console.log("resumable.on('lessonFileAdded' :  lessonFile : ",lessonFile );

    hideUploadImageWhenFileAdded();


// storelessonFileData(lessonFile.lessonFile);
// create and show unique html uploading elements when file is added or drop
    insertLessonsHtmlUploadingElementInDom(lessonFile.file);

    // if file size name is big then cancel uploading to server
    // checkLessonNameSize(lessonFile);
    resumable.upload() // to actually start uploading.
});

resumable.on('fileProgress', function (lessonFile) { // trigger when file progress update
    // console.log("resumable.on('fileProgress' :  file : ",lessonFile );
    updateProgress(Math.floor(lessonFile.progress() * 100), lessonFile.file);
});

resumable.on('fileSuccess', function (lessonFile, response) { // trigger when file upload complete
    // console.log("resumable.on('fileSuccess' :  file : ",lessonFile );
    // console.log("resumable.on('fileSuccess' :  response : ",response );


    response = JSON.parse(response)
    // console.log("response.path : ", response);
    insertTickMarkOnFileSuccess(lessonFile.file);

});

resumable.on('fileError', function (lessonFile, response) { // trigger when there is any error
    // alert('file uploading error.')
    // console.log('fileError response : ', JSON.parse(response)["message"]);
    // console.log('fileError response : ', response);
    insertCrossMarkOnFileError(lessonFile.file)
    fileErrorFromServerSide(lessonFile.file, JSON.parse(response)["message"]);
});


$( document ).ready(function() {
    hideUploadImageOnDropFiles();
});
