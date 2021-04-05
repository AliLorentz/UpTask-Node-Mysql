import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click',()=>{
	Swal.fire({
  title: '¿Deseas borrar este proyecto?',
  text: "Un proyecto eliminado no se puede recuperar!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Eliminalo!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Borrado!',
      'Tu tarea ha sido eliminado',
      'Realizado'
    );
    setTimeout(()=>{
    	window.location.href="/";
    },1000)
  }
})
});