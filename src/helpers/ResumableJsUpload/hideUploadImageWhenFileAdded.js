import $ from "jquery";

function hideUploadImageWhenFileAdded(){
    // console.log("$.on('drop',()=> called..");
    $("#drag-drop-overlay").addClass('hidden');
    $("#drag-upload-image").remove('');
}

export default hideUploadImageWhenFileAdded;
