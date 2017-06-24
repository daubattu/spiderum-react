import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(post) {
  let errors = {};

  if(Validator.isEmpty(post.title)) {
    errors.title = 'This field is required!!!';
  }

  if(Validator.isEmpty(post.content)) {
    errors.content = 'This field is required!!!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
