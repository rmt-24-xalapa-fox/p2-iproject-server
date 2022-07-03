"use strict"

const { Movie } = require("../models/index")

const authorization = async (req, res, next) => {
    try{
        const { id: staffId, role } = req.staffs
        const { id: NovelId } = req.params

        if(!Number(NovelId)){
            throw { name: "Bad Request" }
        }

        const novel = await Movie.findByPk(NovelId)

        if(!novel){
            throw { name: "Data not found" }
        }

        if(staffId !== novel.authorId){
            if(role !== "staff"){
                throw { name: "Forbidden" }
            }
        }
        next()
    } catch(err){
        next(err)
    }
}

const adminAuthorization = async (req, res, next) => {
    try{
        const role = req.users.role
        if(role !== "staff"){
            throw { name: "Not have authorization"}
        }
        next()
    } catch(err){
        next(err)
    }
}

module.exports = { 
    authorization, 
    adminAuthorization,
}