import UserModel from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserController{
    static userReginstration = async (req, res) =>{
        const {name,email,phone,password,cpassword} = req.body
        console.log(req.body)
        const userCheck = await UserModel.findOne({email:email})
        if(userCheck){
            res.send({
                status:"Failed",
                message:"Email is Already Exist"
            })
        }else{
            if(name && email && password){
                if(password === cpassword){
                    try{
                        const salt = await bcrypt.genSalt(10)
                        const encriptPassword =  await bcrypt.hash(password,salt)
                        const createUser = await new UserModel({
                            name:name,
                            email:email,
                            phoneNumber:phone,
                            password:encriptPassword,
                        })
                        await createUser.save()
                        const getUser = await UserModel.findOne({email:email})
                        // Generate JWT Token
                        const token = jwt.sign({userID:getUser._id}, process.env.JWT_SECRET_KEY,{expiresIn: '2d'})

                        res.status(200).send({
                            status:"Success",
                            message:"User Register Successfully",
                            token:token
                        })
                    }catch (error){
                        console.log(error)
                        res.status(500).send({
                            status:"Failed",
                            message:"Server Error"
                        })
                    }

                }else{
                    res.status(400).send({
                        status:"Failed",
                        message:"Confirmed Password or Password is Not Matched"
                    })
                }
            }else{
                res.status(400).send({
                    status:"Failed",
                    message:"User Input Are Empty"
                })
            }
        }
    }

    static userLogin = async (req, res) =>{
        try{
            const {email,password} = req.body
            if(email && password ){
                const userCheck = await UserModel.findOne({email:email})
                if(userCheck != null){
                    const matechPassword = await bcrypt.compare(password, userCheck.password)
                    if((userCheck.email === email) && matechPassword){
                        const token = jwt.sign({userID:userCheck._id}, process.env.JWT_SECRET_KEY,{expiresIn: '2d'})
                        console.log(token)
                        res.status(200).send({
                            status:"Success",
                            message:"Login Successfully",
                            token:token
                        })
                    }else{
                        res.status(400).send({
                            status:"Failed",
                            message:"User Credential Not Match"
                        })
                    }
                }else{
                    res.status(400).send({
                        status:"Failed",
                        message:"User is Not Register"
                    })
                }
            }else{
                res.status(400).send({
                    status:"Failed",
                    message:"Fill All Fields"
                })
            }
        }catch (error){
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

    static GetloginUserInfo = async (req,res) => {
        try{
            const userCheck = await UserModel.findOne({_id:req.body.id})

            res.status(200).send({
                status:"Success",
                message:"Login Successfully",
                data:userCheck
            })
        }catch (e) {
            res.status(500).send({
                status:"Failed",
                message:"Server Error"
            })
        }
    }

}

export default UserController
