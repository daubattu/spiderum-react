import _ from 'lodash';

export default function validateInput(post) {
  let errors = {};

  if(_.isEmpty(post.title)) {
    errors.title = 'This field is required!!!';
  }

  if(_.isEmpty(post.content)) {
    errors.content = 'This field is required!!!';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}
