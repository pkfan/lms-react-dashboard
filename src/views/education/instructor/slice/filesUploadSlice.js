import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  files: { addedFiles: [], filesProgress: {}, filesSuccess: {}, filesError: {} },
};

export const filesUploadSlice = createSlice({
  name: 'filesUpload',
  initialState,
  reducers: {
    createAddedList: (state, action) => {
      // state.value += action.payload;
      state.files.addedFiles.push(action.payload);
      // console.log('state.added.push(action.payload ); state.files', current(state));
      // console.log('state.added.push(action.payload); action', action);
    },
    createProgressObj: (state, action) => {
      // state.value += action.payload;
      state.files.filesProgress[action.payload.uniqueIdentifier] = action.payload.progress;
      // console.log('=====createProgressObj; state.files', current(state));
      // console.log('=======createProgressObj; action', action);
    },
    createSuccessObj: (state, action) => {
      // state.value += action.payload;
      state.files.filesSuccess[action.payload.uniqueIdentifier] = action.payload.success;
      // console.log('=====createSuccessObj; state.files', current(state));
      // console.log('=======createSuccessObj; action', action);
    },
    createErrorObj: (state, action) => {
      // state.value += action.payload;
      state.files.filesError[action.payload.uniqueIdentifier] = action.payload.error;
      // console.log('=====createErrorObj; state.files', current(state));
      // console.log('=======createErrorObj; action', action);
    },
    clearUploadData: (state) => {
      // state.value += action.payload;
      state.files = { addedFiles: [], filesProgress: {}, filesSuccess: {}, filesError: {} };
      // console.log('=====createErrorObj; state.files', current(state));
      // console.log('=======createErrorObj; action', action);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createAddedList,
  createProgressObj,
  createSuccessObj,
  createErrorObj,
  clearUploadData,
} = filesUploadSlice.actions;

export default filesUploadSlice.reducer;
