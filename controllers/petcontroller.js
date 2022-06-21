"use strict";

const { Pet } = require("../models/index");
class PetController {
    static async listAllPets(req, res, next) {
        try {
            const pets = await Pet.findAll();

            res.status(200).json({
                statusCode: 200,
                pets: pets,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getPetDetail(req, res, next) {
        try {
            let id = +req.params.id;
            const pet = await Pet.findOne({
                where: {
                    id: id,
                },
            });

            if (!pet) {
                throw { code: 404 };
            }

            res.status(200).json({
                statusCode: 200,
                pet: pet,
            });
        } catch (err) {
            next(err);
        }
    }

    static async addPet(req, res, next) {
        try {
            const {
                name,
                gender,
                age,
                size,
                primaryBreed,
                secondaryBreed,
                mixedBreed,
                unknownBreed,
                spayed,
                houseTrained,
                declawed,
                specialNeeds,
                shots,
                goodWithChildren,
                goodWithDogs,
                goodWithCats,
                imageUrl,
                description,
            } = req.body;

            const newPet = await Pet.create({
                name,
                gender,
                age,
                size,
                primaryBreed,
                secondaryBreed,
                mixedBreed,
                unknownBreed,
                spayed,
                houseTrained,
                declawed,
                specialNeeds,
                shots,
                goodWithChildren,
                goodWithDogs,
                goodWithCats,
                imageUrl,
                description,
            });

            res.status(201).json({
                statusCode: 201,
                message: `Pet ${newPet.name} succesfully added`,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = PetController;
