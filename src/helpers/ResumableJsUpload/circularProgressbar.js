function circularProgressbar(progressValue,lessonFileData) {
    let lessonUploadProgressBar = document.querySelector(`.circular-progress-${lessonFileData.size}`);
    let lessonUploadValueContainer = document.querySelector(`.circular-value-${lessonFileData.size}`);

    // console.log('lessonUploadProgressBar',lessonUploadProgressBar);
    // console.log('lessonUploadValueContainer',lessonUploadValueContainer);
    // console.log('progressValue',progressValue);


      lessonUploadValueContainer.textContent = `${progressValue}%`;
      lessonUploadProgressBar.style.background = `conic-gradient(
          #4d5bf9 ${progressValue * 3.6}deg,
          #cadcff ${progressValue * 3.6}deg
      )`;
}

export default circularProgressbar;
