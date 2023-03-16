import _ from 'lodash';

export default function createResponseErrors(response) {
  let errors;
  if (_.isObject(response.data.errors)) {
    // const errorsArray = Object.values(response.data.errors);
    // errors = _.flatten(errorsArray);

    const errorsArray = Object.entries(response.data.errors);

    const errorsObj = {};
    for (const [key, value] of errorsArray) {
      errorsObj[key] = String(value);
    }

    errors = errorsObj;
    // console.log('isObject errors', errors);
  } else if (_.isArray(response.data.errors)) {
    errors = _.flatten(response.data.errors);
    // console.log('isArray errors', errors);
  } else if (response.message) {
    errors = response.message;
  } else if (response.data.message) {
    errors = response.data.message;
  } else {
    errors = response.data;
  }
  console.log('createResponseErrors', response);
  console.log('createResponseErrors transform', errors);

  return { status: response.status, errors };
}
