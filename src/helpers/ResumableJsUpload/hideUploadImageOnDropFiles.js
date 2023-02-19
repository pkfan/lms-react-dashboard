import $ from "jquery";

function hideUploadImageOnDropFiles(){
    $('#drag-drop-lessons').on('dragover',()=>{
      // console.log("$.on('dragover',()=> called..");
      $("#drag-drop-overlay").removeClass('hidden');
    });
    // $('#drag-drop-lessons').on('dragleave',()=>{
      // console.log("$.on('dragleave',()=> called..");
    // });
    $('#drag-drop-lessons').on('drop',()=>{
      // console.log("$.on('drop',()=> called..");
      $("#drag-drop-overlay").addClass('hidden');
      $("#drag-upload-image").remove('');

    });
}

export default hideUploadImageOnDropFiles;
