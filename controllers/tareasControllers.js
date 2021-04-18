const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas.js');

exports.agregarTarea = async (req,res)=>{
	const proyecto = await req.params.url;
}