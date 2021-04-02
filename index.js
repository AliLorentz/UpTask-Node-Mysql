const express = require("express");
const routes = require('./routes/index.js');
const path = require('path')
const bodyParser = require('body-parser');

//helpers
const helpers = require('./helper.js');

//crear la conexion a la bd
const db=require('./config/db.js');
//importar el modelo
require('./models/Proyectos.js');

db.sync()
	.then(()=>console.log('Conectado al servidor'))
	.catch(error=>console.log(error));
//crear un app de express
const app = express();

//Donde cargar los archivos estaticos
app.use(express.static('public'));

//Habilitar Pug
app.set('view engine','pug')

//añadir la carpeta a las vistas
app.set('views',path.join(__dirname,'./views'));

//pasar var dump a la aplicacion
app.use((req,res,next)=>{
	res.locals.vardump = helpers.vardump;
	next();
})

//Habilitar bodyParser para leer los datos enviados al formulario
app.use(bodyParser.urlencoded({extend:true}))

//ruta para el home 
app.use('/',routes());

app.listen(3000);
