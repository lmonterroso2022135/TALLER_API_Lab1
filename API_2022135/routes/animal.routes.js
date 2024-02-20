const { Router } = require('express');
const { check } = require('express-validator');
const {existenteAnimalId} = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');
const {animalesGet,
        animalIdGet,
        animalPost,
        animalPut,
        animalDelete
       
} = require('../controllers/animal.controller');

const router = Router();

router.get("/", animalesGet);

router.post(
    "/",
    [
        check("nombre", "El nombre no puee ir vacion").not().isEmpty(),
        check("especie", "La especie no puede estar vacia").not().isEmpty(),
        check("raza", "La raza no puede estar vacia").not().isEmpty(),
        check("edad", "La edad no puede estar vacian").not().isEmpty(),
        validarCampos
    ],animalPost)

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteAnimalId),
        validarCampos
    ], animalIdGet);

router.put(
    "/:id",
    [
        check('id', 'Id no es valido').isMongoId(),
        check('id').custom(existenteAnimalId),
        validarCampos
    ],animalPut);

router.delete(
    "/:id",
    [
        check('id', 'Id no es valido').isMongoId(),
        check('id').custom(existenteAnimalId),
        validarCampos
    ],animalDelete);

module.exports = router;