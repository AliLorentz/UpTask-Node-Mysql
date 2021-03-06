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
		await Proyectos.create({nombre});
		res.redirect('/');	
	}
}

exports.proyectoPorUrl = async (req,res)=>{
	const proyectosPromise =  Proyectos.findAll();
	const proyectoPromise =   Proyectos.findOne({
		where:{
			url:req.params.url
		}
	});
	const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);
	if(!proyecto) return next();
	
	//render a la vista
	res.render('tareas',{
		nombrePagina:'Tareas del proyecto',
		proyecto,
		proyectos
	})
}
exports.formularioEditar = async(req,res)=>{
	const proyectosPromise =  Proyectos.findAll();
	const proyectoPromise =   Proyectos.findOne({
	
		where:{
			id:req.params.id
		}
	});
	const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise]);


	res.render('nuevoProyecto',{
		nombrePagina:'Nuevo Proyecto',
		proyectos,
		proyecto
	})
}

exports.actualizarProyecto = async (req,res)=>{
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
		
		await Proyectos.update(
			{nombre:nombre},
			{where:{
				id:req.params.id
			}}
			);
		res.redirect('/');	
	}
}

exports.eliminarProyecto =  async(req,res,next)=>{
	const {urlProyecto} = req.query;

	const resultado = await Proyectos.destroy({
		where:{
			url:urlProyecto
		}
	});

	if(!resultado){
		next();
	}

	res.status(200).send('Proyecto Eliminado Correctamentes');
}