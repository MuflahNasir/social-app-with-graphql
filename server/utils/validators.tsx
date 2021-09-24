type IErrors = {
    username?: String,
    email?: String,
    password?: String,
}

module.exports.validateRegisterInput = (
    username: String,
    email: String,
    password: String,
    confirmPassword: String
) => {
    let errors: IErrors = {};
    if(username.trim() === ''){
        errors.username = 'Username is required'
    }
    if(email.trim() === ''){
        errors.email = 'Email is required'
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if(!email.match(regEx)){
            errors.email = "Email must be valid"
        }
    }
    if(password === ''){
        errors.password = 'Password is required'
    }else if(password !== confirmPassword){
        errors.password = "Password must match"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (email: String, password: String) => {
    let errors: IErrors = {}
    if(email.trim() === ''){
        errors.email = 'Email is required'
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if(!email.match(regEx)){
            errors.email = "Email must be valid"
        }
    }
    if(password.trim() === ''){
        errors.password = 'Password is required'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}