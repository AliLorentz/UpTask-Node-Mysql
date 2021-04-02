const Proyectos = require('../models/Proyectos.js');

exports.proyectoHome = async (req,res)=>{
	const proyectos = await Proyectos.findAll();
	res.render('index',{
		nombrePagina:'Proyectos',
		proyectos
	});
}

exports.formularioProyecto = async (req,res)=>{
	const proyectos = await Proyectos.findAll();
	res.render('nuevoProyecto',{
		nombrePagina:'Nuevo Proyecto',
		proyectos
	})
}

exports.nuevoProyecto = async (req,res)=>{
	const proyectos = await Proyectos.findAll();
	const {nombre} = req.body;
	let errores = [];
	if(!nombre){
		errores.push({'texto':'Agrega un nombre al proyecto'})
	}

	if(errores.length > 0){
		res.render('nuevoProyecto',{
			nombrePagina : 'Nuevo Proyecto',
			errores,
			proyectos
		})
	}else{
		
		const proyecto = await Proyectos.create({nombre});
		res.redirect('/');	
	}
}

exports.proyectoPorUrl = async (req,res)=>{
	const proyectos = await Proyectos.findAll();
	const proyecto = await  Proyectos.findOne({
		where:{
			url:req.params.url
		}
	});
	if(!proyecto) return next();
	
	//render a la vista
	res.render('tareas',{
		nombrePagina:'Tareas del proyecto',
		proyecto,
		proyectos
	})
}