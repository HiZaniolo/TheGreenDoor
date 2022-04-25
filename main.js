//Selectores
const contenedorFormulario = $('#formContainer');
const contenedorDatos = $('#detailsContainer');

//Array de Reservas
let reservas = [];

// //Validacion de contenido en Storage(si hay algo en storage queda la card reflejada)
// if (localStorage.getItem('reserva')){
//     let reserva = JSON.parse(localStorage.getItem('reserva'));
//     crearCard(reserva, contenedorDatos);
// }

//Class Reserva
class Reserva{
    constructor(name, email, people, date, time){
        this.name = name;
        this.email = email;
        this.people = people;
        this.date = date;
        this.time = time;
    }
}


/**************
 * FUNCIONES*
 * ************/


//Creo formulario con jquery
function crearFormulario(contenedor){
    contenedor.append(`
        <form id="formulario">
        <div class="row">
        <div class="col-lg-6">
            <div class="form-group">
                <label for="title">Name</label>
                <input type="text" id="name" class="form-control">
            </div>
            <div class="form-group">
                <label for="title">Email</label>
                <input type="text" id="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="people">Number of people</label>
                <select name="people" id="people" class="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="+8">+8</option>
                </select>
            </div>
            </div>
            <div class="col-lg-6">
            <div class="form-group">
                <label for="date">Date</label>
                <input type="date" id="date" class="form-control">
            </div>
            <div class="form-group">
            <label for="date">Time</label>
            <input type="time" id="time" class="form-control">
            </div>
        </div>
            <input type="submit" value="Find a table" id="btnConfirm" class="btn btn-primary btn-block !important">
            
            </div>
            </form>

    `);
}

crearFormulario(contenedorFormulario);

//seleccionar el formulario e inputs
const formulario = $('#formulario');
const inputName = $('#name');
const inputEmail = $('#email');
const inputPeople = $('#people');
const inputDate = $('#date');
const inputTime = $('#time');

//Evento submit del formulario
formulario.submit(validarFormulario);


//Valido datos de ingreso en formulario
function validarFormulario(e){
    e.preventDefault();

    //Validacion de campos
    if(inputName.val() == ''){
        alert('Please fill with your name');
        inputName.focus();
        return false;
    }
    if(inputEmail.val() == ''){
        alert('Please fill with your email');
        inputEmail.focus();
        return false;
    }
    if(inputPeople.val() == ''){
        alert('Please choose number of people');
        inputPeople.focus();
        return false;
    }
    if(inputDate.val() == ''){
        alert('Please choose the day');
        inputDate.focus();
        return false;
    }
    if(inputTime.val() == ''){
        alert('Please choose the time');
        inputTime.focus();
        return false;
    }

//Valores ingresados
let name = inputName.val();
let email = inputEmail.val();
let people = inputPeople.val();
let date = inputDate.val();
let time = inputTime.val();

// Resetear formulario
formulario[0].reset();

crearReserva(name, email, people, date, time);

}

//Crear Reserva
function crearReserva(name, email, people, date, time){
    let reserva = new Reserva(name, email, people, date, time);

    //Agrega la nueva reserva al array
    reservas.push(reserva);


    guardarStorage('reservas', reservas);
    reservas = recuperarStorage('reservas');
    crearCard(reservas, contenedorDatos);
    
}

//Guardar en Storage
function guardarStorage(clave, valor){
    localStorage.setItem(clave, JSON.stringify (valor));
}

//Recuperar del Storage
function recuperarStorage(clave){
    const reservas = JSON.parse(localStorage.getItem(clave));
    return reservas
}

//Creacion de card en Pantalla
function crearCard(reservas, contenedor){
    //limpio lo anterior
    contenedor.html('');

    $(reservas).each((index, reserva) => {
        contenedor.append(`
        <div class="row">
        <div class="col-md-4">
          <img src="./img/card.jpg" class="img-fluid">
        </div>
        <div class="col-md-8">
          <h2 class="card-title mt-2">YOUR BOOKING DETAILS</h2>
          <h5 class="card-text">Name: ${reserva.name}</h5>
          <h5 class="card-text">Email: ${reserva.email}</h5>
          <h5 class="card-text">Number of People: ${reserva.people}</h5>
          <h5 class="card-text">Date: ${reserva.date}</h5>
          <h5 class="card-text">Time: ${reserva.time}</h5>
          <button type="button" class="btn btn-secondary">Confirm reserve</button>
        </div>
      </div>
        `) 
    });

    $(".btn-secondary").on("click",function() {
        contenedor.html('');
        contenedor.append(`
            <div class="row">
            <div class="col-lg-12 text-center">
            <h1>Thank you for your reservation!</h1>
            </div>
            </div>
        `)
    })
}



/***************************************************************
 * ANIMACIONES
 * *********************************************/
 $(document).ready(function(){

    $('.ourSpace').click(function() {
        $('html, body').animate({
            scrollTop: $(".space").offset().top
        },3000);
    });

    $('.aboutUs').click(function() {
        $('html, body').animate({
            scrollTop: $(".about").offset().top
        },3000);
    });

    $('.photoGallery').click(function() {
        $('html, body').animate({
            scrollTop: $(".gallery").offset().top
        },3000);
    });

    $('.bigNews').click(function() {
        $('html, body').animate({
            scrollTop: $(".news").offset().top
        },3000);
    });

    $('.bookTable').click(function() {
        $('html, body').animate({
            scrollTop: $(".reserve").offset().top
        },3000);
    });

    $('.seeReviews').click(function() {
        $('html, body').animate({
            scrollTop: $(".reviews").offset().top
        },3000);
    });



 });


/***************************************************************
 * FETCH
 * *********************************************/

//Mostrar las reviews a traves de un archivo local json
const btn = document.querySelector("#btn");
const container = document.querySelector(".displayReviews");

btn.onclick = () => {
    getReviews();
} 

const getReviews = async () => {
    try{
        let response = await fetch("json.json");
        let result = await response.json();
        result.forEach(review => {
            container.innerHTML += `<br><br><h4>${review.title}</h4>  <p>${review.review}</p> <h5> -${review.name}- </h5></br></br>`
        })
    } catch (error) {
    }
}