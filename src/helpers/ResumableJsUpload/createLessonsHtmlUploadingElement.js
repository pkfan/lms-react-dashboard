function createLessonsHtmlUploadingElement(lessonFileData=null) {
    console.log('createLessonsHtmlUploadingElement(',lessonFileData);

    let fileSize = (lessonFileData.size).toFixed(2);

    let sizeExtension = "Bytes";

    if(fileSize >= 1024 && fileSize < (1024*1024)){
      fileSize = (fileSize/(1024)).toFixed(2);
      sizeExtension = "KB";
    }
    else if(fileSize >= (1024*1024) && fileSize < (1024*1024*1024)){
      fileSize = (fileSize/(1024*1024)).toFixed(2);
      sizeExtension = "MB";
    }
    else if(fileSize >= (1024*1024*1024)){
      fileSize = (fileSize/(1024*1024*1024)).toFixed(2);
      sizeExtension = "GB";
    }

    let createdAt = (new Date(lessonFileData.lastModified)).toDateString();

    // console.log("fileSize : ",fileSize);
    // console.log("createdAt : ", createdAt);


    return (`
        <div class="flex flex-col md:flex-row items-center justify-between my-3 p-3 rounded-lg border border-gray-300 bg-gray-100">
            <div class="flex flex-col md:flex-row items-center space-x-4">
                <div id="id-${lessonFileData.size}">
                  <div class=" text-7xl animate-spin">
                      <i class=" bi bi-arrow-clockwise"></i>
                  </div>
                </div>
                <div>
                    <div id="error-${lessonFileData.size}" class="font-bold text-red-500"></div>
                    <h6>${lessonFileData.name.substring(0,45)}</h6>
                    <div>
                        <div><i class="bi bi-chevron-double-right"></i><span class=" px-2 font-bold">File Size: </span><span class=" text-blue-500"> ${fileSize}${sizeExtension}</span></div>
                        <div><i class="bi bi-chevron-double-right"></i><span class=" px-2 font-bold">File Type: </span> ${lessonFileData.type}</div>
                        <div><i class="bi bi-chevron-double-right"></i><span class=" px-2 font-bold">Created At: </span> ${createdAt}</div>
                    </div>
                </div>
            </div>
            <div class="circular-progress circular-progress-${lessonFileData.size} min-w-[100px]">
                <div class="circular-value-container circular-value-${lessonFileData.size}">0%</div>
            </div>
        </div>
    `);

  }

  export default createLessonsHtmlUploadingElement;
