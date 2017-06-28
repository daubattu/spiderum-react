import _ from 'lodash';

export default function validateLogin(user) {
  let errors = {};
  if(_.isEmpty(user.username)) {
    errors.username = 'This field is require!!!';
  }
  if(_.isEmpty(user.password)) {
    errors.password = 'This field is require!!!';
  }
   return {
     errors,
     isValid: _.isEmpty(errors)
   }
}
