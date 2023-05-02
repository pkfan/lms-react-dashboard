import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  lessonFiles: { addedFiles: [], filesProgress: {}, filesSuccess: {}, filesError: {} },
};

export const lessonsUploadSlice = createSlice({
  name: 'lessonsUpload',
  initialState,
  reducers: {
    createLessonsAddedList: (state, action) => {
      // state.value += action.payload;
      state.lessonFiles.addedFiles.push(action.payload);
      // console.log('state.added.push(action.payload ); state.lessonFiles', current(state));
      // console.log('state.added.push(action.payload); action', action);
    },
    createLessonsProgressObj: (state, action) => {
      // state.value += action.payload;
      state.lessonFiles.filesProgress[action.payload.uniqueIdentifier] = action.payload.progress;
      // console.log('=====createLessonsProgressObj; state.lessonFiles', current(state));
      // console.log('=======createLessonsProgressObj; action', action);
    },
    createLessonsSuccessObj: (state, action) => {
      // state.value += action.payload;
      state.lessonFiles.filesSuccess[action.payload.uniqueIdentifier] = action.payload.success;
      // console.log('=====createLessonsSuccessObj; state.lessonFiles', current(state));
      // console.log('=======createLessonsSuccessObj; action', action);
    },
    createLessonsErrorObj: (state, action) => {
      // state.value += action.payload;
      state.lessonFiles.filesError[action.payload.uniqueIdentifier] = action.payload.error;
      // console.log('=====createLessonsErrorObj; state.lessonFiles', current(state));
      // console.log('=======createLessonsErrorObj; action', action);
    },
    clearUploadLessonsData: (state) => {
      // state.value += action.payload;
      state.lessonFiles = { addedFiles: [], filesProgress: {}, filesSuccess: {}, filesError: {} };
      // console.log('=====createLessonsErrorObj; state.lessonFiles', current(state));
      // console.log('=======createLessonsErrorObj; action', action);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createLessonsAddedList,
  createLessonsProgressObj,
  createLessonsSuccessObj,
  createLessonsErrorObj,
  clearUploadLessonsData,
} = lessonsUploadSlice.actions;

export default lessonsUploadSlice.reducer;
