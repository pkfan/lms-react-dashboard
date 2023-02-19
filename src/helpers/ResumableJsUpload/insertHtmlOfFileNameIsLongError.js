import $ from "jquery";

function insertHtmlOfFileNameIsLongError(lessonFileData) {
    let html = (`
        <span>File Error: File Name must be less than 60 characters.</span>
    `);
    $(`#error-${lessonFileData.size}`).html(html);

}


export default insertHtmlOfFileNameIsLongError;
