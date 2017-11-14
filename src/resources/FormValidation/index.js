export const isEmailAddress = (string) =>{
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(string)
}

export const isAlphaNumeric = (string) =>{
  return /^[a-zA-Z0-9]+$/.test(string)
}

export const isName = (string) =>{
  if( string.includes("'") ){
    var apos = string.split("'")
    for (var h = 0; h < apos.length; h++) {
      if( apos[h].includes("-") ){
        var guiones = apos[h].split("-")
        for (var j = 0; j < guiones.length; j++) {
          if( !isAlphaNumeric(guiones[j]) ){
            return false;
          }
        }
      }else{
        if( !isAlphaNumeric(apos[h]) ){
          return false;
        }
      }
    }
  }
  for (var i = 0; i < string.length; i++) {
    if( !isNaN(string[i]) ){
      return false;
    }
  }
  return true;
}

export const validateRegister = (values) =>{
  let errors = {};
  errors.valid = true;
  const { name , username , email , password , passwordConfirm } = values
  if( name !== undefined ){
    if( name.trim() === '' ){
      errors.name = "El Nombre no puede estar vacío"
      errors.valid = false
    }
    if( name.includes(" ") ){
      var toks = name.split(" ");
      for (var i = 0; i < toks.length; i++) {
        if( !isName(toks[i]) ){
          errors.name = "El nombre no debe contener caracteres especiales"
          errors.valid = false
        }
      }
    }else{
      if( !isName(name) ){
        errors.name = "El nombre no debe contener caracteres especiales"
        errors.valid = false
      }
    }
  }else{
    errors.name = "El Nombre no puede estar vacío"
    errors.valid = false
  }
  if( username !== undefined ){
    if( username.trim() === '' ){
      errors.username = "El nickname no puede estar vacío"
      errors.valid = false
    }
    if( !isAlphaNumeric(username) ){
      errors.username = "El nickname no puede tener caracteres especiales"
      errors.valid = false
    }
  }else{
    errors.username = "Nickname no puede estar vacio"
    errors.valid = false
  }
  if( !isEmailAddress(email) ){
    errors.email = "Correo electronico no es valido"
    errors.valid = false
  }
  if( password !== passwordConfirm ){
    errors.confirm = "Las contraseñas no coinciden"
    errors.valid = false
  }
  if( password === undefined ){
    errors.password = "Contraseña no puede estar vacía"
    errors.valid = false
  }else{
    if( password.includes(" ") === true ){
      errors.password = "Contraseña no debe contener espacios"
      errors.valid = false
    }
  }
  return errors
}

export const validatePasswordChange = (values) => {
  let errors = {}
  errors.valid = true
  const { newPassword , confirmPassword } = values
  if( newPassword !== confirmPassword ){
    errors.confirmPassword = "Las contraseñas no coinciden"
    errors.valid = false
  }
  if( newPassword === '' || newPassword === null || newPassword === undefined ){
    errors.newPassword = "Contraseña no puede estar vacía"
    errors.valid = false
  }else{
    if( newPassword.includes(" ") === true ){
      errors.newPassword = "Contraseña no debe contener espacios"
      errors.valid = false
    }
  }
  return errors;
}

export const validateInputs = (values) =>{
  let errors = {}
  errors.valid = true
  errors.valor = false
  errors.peso = false
  if( values.valor === '' || values.valor === undefined
      || values.valor === null || isNaN(values.valor) ){
    errors.valor = true
    errors.valid = false
  }else{
    if( values.valor < 0 || Math.round(values.valor) === -0){
      errors.valor = true
      errors.valid = false
    }else{
      if( values.valor > 5){
        errors.valor = true
        errors.valid = false
      }
    }
  }

  if( values.peso === '' || values.peso === undefined
      || values.peso === null || isNaN(values.peso) ){
    errors.peso = true
    errors.valid = false
  }else{
    if( values.peso <= 0 ){
      errors.peso = true
      errors.valid = false
    }
  }

  return errors
}

export const validateEventForm = (values) =>{
  let errors = {}
  errors.valid = true
  return errors
}
