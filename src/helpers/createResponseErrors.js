import _ from 'lodash';

export default function createResponseErrors(response) {
  let errors;
  if (_.isObject(response.data.errors)) {
    const errorsArray = Object.values(response.data.errors);
    errors = _.flatten(errorsArray);
    // console.log('isObject errors', errors);
  } else if (_.isArray(response.data.errors)) {
    errors = _.flatten(response.data.errors);
    // console.log('isArray errors', errors);
  } else if (response.data.message) {
    errors = response.data.message;
  } else {
    errors = response.data;
  }
  console.log('updatePasswordQuery transformErrorResponse', response);

  return { status: response.status, errors };
}
