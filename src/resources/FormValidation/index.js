export const isEmailAddress = (string) =>{
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(string)
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
    if( password.trim() === '' ){
      errors.password = true
      errors.valid = false
    }
  }
  if( passwordConfirm === undefined ){
    errors.confirm = true
    errors.valid = false
  }else{
    if( passwordConfirm.trim() === '' ){
      errors.confirm = true
      errors.valid = false
    }
  }
  return errors
}
