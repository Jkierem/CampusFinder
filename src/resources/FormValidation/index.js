export const isEmailAddress = (string) =>{
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(string)
}

export const isAlphaNumeric = (string) =>{
  return /^[a-zA-Z0-9]+$/.test(string)
}

export const validateRegister = (values) =>{
  let errors = {};
  errors.valid = true;
  const { name , username , email , password , passwordConfirm } = values
  if( name !== undefined ){
    if( name.trim() === '' ){
      errors.name = true
      errors.valid = false
    }
  }else{
    errors.name = true
    errors.valid = false
  }
  if( username !== undefined ){
    if( username.trim() === '' ){
      errors.username = true
      errors.valid = false
    }
    if( !isAlphaNumeric(username) ){
      errors.username = true
      errors.valid = false
    }
  }else{
    errors.username = true
    errors.valid = false
  }
  if( !isEmailAddress(email) ){
    errors.email = true
    errors.valid = false
  }
  if( password !== passwordConfirm ){
    errors.confirm = true
    errors.valid = false
  }
  if( password === undefined ){
    errors.password = true
    errors.valid = false
  }else{
    if( password.includes(" ") === true ){
      errors.password = true
      errors.valid = false
    }
  }
  return errors
}
