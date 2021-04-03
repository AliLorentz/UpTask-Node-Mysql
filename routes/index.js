const express = require("express");
const router = express.Router();

//importar express validator
const {body} = require('express-validator');

const proyectosController = require ("../controllers/proyectoControllers.js");

module.exports=function(){
	router.get('/',proyectosController.proyectoHome);
	router.get('/nuevo-proyecto',proyectosController.formularioProyecto);
	router.post('/nuevo-proyecto',
		body('nombre').not().isEmpty().trim().escape(),
		proyectosController.nuevoProyecto);

	//Listar proyecto
	router.get('/proyectos/:url',proyectosController.proyectoPorUrl);
	//Actualizar Proyecto
	router.get('/proyecto/editar/:id',proyectosController.formularioEditar);
	router.post('/nuevo-proyecto/:id',
		body('nombre').not().isEmpty().trim().escape(),
		proyectosController.actualizarProyecto);

	return router;
}
