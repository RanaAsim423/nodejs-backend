import UserModel from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController{
    static portalhReginstration = async (req, res) =>{
        const {fname,lname,email,phoneNumber,country,city,zipcode,address,termsCondition,newsLetter,password,cpassword} = req.body
        console.log(req.body)
        const userCheck = await UserModel.findOne({email:email})
        if(userCheck){
            res.send({
                status:"Failed",
                message:"Email is Already Exist"
            })
        }else{
            if(fname && lname && email && termsCondition && password && cpassword){
                if(password === cpassword){
                    try{
                        const salt = await bcrypt.genSalt(10)
                        const encriptPassword =  await bcrypt.hash(password,salt)
                        const createUser = await new UserModel({
                            fname:fname,
                            lname:lname,
                            email:email,
                            phoneNumber:phoneNumber,
                            country:country,
                            city:city,
                            zipcode:zipcode,
                            address:address,
                            termsCondition:termsCondition,
                            newsLetter:newsLetter,
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

    static portalLogin = async (req, res) =>{
        try{
            const {email,password} = req.body
            if(email && password ){
                const userCheck = await UserModel.findOne({email:email}).where({userRole:"admin"})
                if(userCheck != null){
                    const matechPassword = await bcrypt.compare(password, userCheck.password)
                    if((userCheck.email === email) && matechPassword){
                        const token = jwt.sign({userID:userCheck._id, role:userCheck.userRole,username:userCheck.fname+userCheck.lname}, process.env.JWT_SECRET_KEY,{expiresIn: '2d'})
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

}

export default AuthController
