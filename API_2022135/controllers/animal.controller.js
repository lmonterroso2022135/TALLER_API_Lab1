const Animal = require('../models/animal');
const {response} = require('express');



const animalesGet = async(req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, animales] = await Promise.all([
        Animal.countDocuments(query),
        Animal.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        animales
    });
}
const animalIdGet = async(req, res) =>{
    const {id} =req.params;
    const animal = await Animal.findOne({_id: id});

    if (!usuario || animal.estado === false) {
        return res.status(404).json({ message: "Usuario no encontrado o inhabilitado" });
    }

    res.status(200).json({
        animal
    });
}

const animalPost = async(req, res) =>{
    const {nombre, especie, raza, edad} = req.body;
    const animal =new Animal({nombre, especie, raza, edad});

    await animal.save();
    res.status(202).json({
        animal
    });
}

const animalPut = async(req, res = response) =>{
    const {id} = req.params;
    const {_id, ...resto} = req.body;
    
    const animal = await Animal.findByIdAndUpdate(id, resto);
    res.status(200).json({
        msg: 'Animal Actualizado Exitosamente',
        animal
    })

}

const animalDelete = async(req, res) =>{
    const {id} = req.params;
    const animal = await Animal.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Animal Adoptado',
        animal
    });
}



module.exports={
    animalesGet,
    animalIdGet,
    animalPost,
    animalPut,
    animalDelete
}

