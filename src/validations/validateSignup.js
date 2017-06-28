import _ from 'lodash';
import Validator from 'validator';

export default function validateSignup(user) {
  let errors = {};
  if(_.isEmpty(user.username)) {
    errors.username = 'This field is require!!!';
  }
  if(_.isEmpty(user.email)) {
    errors.email = 'This field is reuired!!!';
  }
  if(!Validator.isEmail(user.email)) {
    errors.email = 'This field need format of email!!!'
  }
  if(_.isEmpty(user.password)) {
    errors.password = 'This field is require!!!';
  }
  if(_.isEmpty(user.passwordConfirm)) {
    errors.passwordConfirm = 'This field is require!!!';
  }
  if(user.password !== user.passwordConfirm) {
    errors.passwordConfirm = 'Dont match with password';
  }
  if(_.isEmpty(user.birthday)) {
    errors.birthday = 'This field is require!!!';
  }
  if(_.isEmpty(user.gender)) {
    errors.gender = 'This field is require!!!';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}
