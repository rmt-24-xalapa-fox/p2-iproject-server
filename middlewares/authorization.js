`use strict`
const { Report } = require("../models");

const authorization = async (req,res,next)=>{
    try{
        // console.log(`ini di authorization atas`)
        const {id: UserId, role} = req.user
        const {id: id} = req.params
        console.log(`role`,role)

        
        if(role !== `admin` && role !== `staff`){
            // console.log('test')
            throw {name:`Forbidden`}
        }
        
        if(id){
            if(!Number(id)){
                throw {name: `BadRequest`}
            }

        }
        
        const report = await Report.findByPk(id)
        
        if (!report){
            throw {name:`NotFound`}
        }
        
        
        console.log(`ini di authorization bawah`)
        next()

    }catch(err){
        console.log(`%%%%%%%%%%%%%%%%%%%%%%%%%%`,err)
        next(err)

    }
}


const adminOnly = async (req,res,next)=>{
    try{
        const {role} = req.user
        if(role !== `admin`){
            // console.log('test')
            throw {name:`Forbidden`}
        }
    
        console.log(`ini di adminOnly bawah`)
        next()

    }catch(err){
        console.log(`%%%%%%%%%%%%%%%%%%%%%%%%%%`,err)
        next(err)

    }
}


const historyAuthorization = async (req,res,next)=>{
    try{
        const {id: UserId, role} = req.user
        
        if(role !== `admin` && role !== `staff`){
            // console.log('test')
            throw {name:`Forbidden`}
        }

        // console.log(`di history auth`)
        next()

    }catch(err){
        console.log(`%%%%%%%%%%%%%%%%%%%%%%%%%%`,err)
        next(err)

    }
}


module.exports = {authorization,adminOnly, historyAuthorization}