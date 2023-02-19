import $ from "jquery";

function fileErrorFromServerSide(lessonFileData, errorMessage) {
    let html = null;

    if(errorMessage.toLowerCase().includes("unable to probe")){
      html = (`<span>File is Currupt: Unable to open with FFMPEG</span>`);
    }
    else{
      html = (`<span>${errorMessage.substring(0,80)}</span>`);
    }

    $(`#error-${lessonFileData.size}`).html(html);

}

export default fileErrorFromServerSide;
