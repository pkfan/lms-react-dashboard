import $ from "jquery";

function insertTickMarkOnFileSuccess(lessonFileData){
    // console.log('insertTickMarkOnFileSuccess called..:',insertTickMarkOnFileSuccess);

    let html = (`
        <div class=" text-7xl">
            <svg class=" w-[72px] h-[72px] stroke-green-600" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
    `);

    $(`#id-${lessonFileData.size}`).html(html);
}

export default insertTickMarkOnFileSuccess;
