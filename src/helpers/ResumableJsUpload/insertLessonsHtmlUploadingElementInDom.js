import $ from 'jquery';
import createLessonsHtmlUploadingElement from './createLessonsHtmlUploadingElement';

function insertLessonsHtmlUploadingElementInDom(lessonFileData=null) {
    // var uniqID = (new Date()).getTime().toString(16).slice(2);
    // console.log('insertLessonsHtmlUploadingElementInDom(lessonFileData',lessonFileData);
    let lessonsHtmlElement = createLessonsHtmlUploadingElement(lessonFileData);
    $('#lessons-uploading-list').append(lessonsHtmlElement);

    // lessonUploadProgressBar = document.querySelector(`.circular-progress-${uniqID}`);
    // lessonUploadValueContainer = document.querySelector(`.circular-value-container-${uniqID}`);
}

export default insertLessonsHtmlUploadingElementInDom;

