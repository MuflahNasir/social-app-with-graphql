const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {UserInputError} = require("apollo-server")

const {validateRegisterInput, validateLoginInput} = require("../../utils/validators")
const User = require("../../models/User.tsx")
const {SECRET_KEY} = require("../../config")

type IRegister = {
    registerInput: IRegisterInput
}
type IRegisterInput = {
    username: String,
    email: String,
    password: String,
    confirmPassword: String
}

type ILoginInput = {
    email:  String,
    password: String
}

type IUser = {
    id: String,
    username: String,
    email: String
}

function generateToken(user: IUser){
    return jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email
    }, SECRET_KEY, {expiresIn: '1h'})
}

module.exports = {
    Mutation: {
        async login(_: any, {email, password}: ILoginInput) {
            //valid login data
            const {valid, errors} = validateLoginInput(email, password)
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            //check if user exist
             const user = await User.findOne({email})
            if(!user){
                throw new UserInputError("User doesn't exist", {
                    errors: {
                        email: 'User is not registered'
                    }
                })
            }

            //check if password is correct
            const match = await bcrypt.compare(password, user.password)
            if(!match){
                throw new UserInputError("Wrong credentials", {
                    errors: {
                        email: 'Wrong credentials'
                    }
                })
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_: any, {registerInput: {username, email, password, confirmPassword}}: IRegister){
            
            //valid user data
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            //Make sure user doesn't exist
            const user = await User.findOne({email})
            if(user){
                throw new UserInputError('Email already exist', {
                    errors: {
                        email: 'This email already exist'
                    }
                })
            }

            //Hash password
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            const result = await newUser.save()

            const token = generateToken(result)

            return {
                ...result._doc,
                id: result._id,
                token
            }
        }
    }
}