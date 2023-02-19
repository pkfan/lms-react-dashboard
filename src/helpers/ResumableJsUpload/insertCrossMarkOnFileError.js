import $ from "jquery";

function insertCrossMarkOnFileError(lessonFileData){
    // console.log('insertTickMarkOnFileSuccess called..:',insertTickMarkOnFileSuccess);

    let html = (`
       <div class=" text-7xl rotate-45">
            <svg class=" w-[72px] h-[72px] stroke-red-600 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>            </div>
        <div>
    `);

    $(`#id-${lessonFileData.size}`).html(html);
  }

  export default insertCrossMarkOnFileError;
