const $tareas = document.querySelector(".tareas")
const $vaciarBtn = document.querySelector("#vaciar");

// EVENT LISTENERS

iniciarPrograma();

function iniciarPrograma(){
    
    // Agregar tarea on submit

    document.querySelector("#formulario").addEventListener("keypress",function(e){
        if(e.key === "13"){
            agregarTarea
        }
    })
    document.querySelector("#formulario").addEventListener("submit",agregarTarea)


    // Borrar Tarea

    $tareas.addEventListener("click",borrarTarea)

    // Leer local storage al cargar la pagina

    document.addEventListener("DOMContentLoaded",localStorageListo)

    // Vaciar Tareas

    $vaciarBtn.addEventListener("click",vaciarTareas)
}

// Agregar tarea

function agregarTarea(e){
    e.preventDefault();

    // Extraer tarea de textarea

    const tarea = document.querySelector("#tarea").value;

    // Crear elemento

    const li = document.createElement("li");
    const botonBorrar = document.createElement("a");

    // Asignar contenido

    li.innerText = tarea;
    botonBorrar.href = "#";
    botonBorrar.innerText = "X";
    botonBorrar.classList.add("borrar")

    // Agregar al DOM

    li.appendChild(botonBorrar);
    $tareas.appendChild(li);

    // Agregar a local storage

    agregarTareaLocalStorage(tarea);

    // Borrar value del input

    limpiarInput();
    
}

// Limpiar input

function limpiarInput(){
    const $form = document.querySelector("#formulario");
    $form.reset();
}

// Borrar tarea del DOM

function borrarTarea(e){
    e.preventDefault();

    const tareaParaBorrar = e.target

    const tarea = e.target.parentElement.textContent.slice(0,-1);

    if (tareaParaBorrar.className === "borrar"){
        tareaParaBorrar.parentElement.classList.add("borrarAnimacion")
        setTimeout( () =>{
            tareaParaBorrar.parentElement.remove();
            borrarLocalStorage(tarea);
        },280)
    }

}

// Agregar tarea a local storage

function agregarTareaLocalStorage(tarea){
    let tareas;
    tareas = obtenerTareasLocalStorage();

    // Añadir nueva tarea

    tareas.push(tarea)

    // Convertir a string y mandarlo a local storage

    localStorage.setItem("tareas",JSON.stringify(tareas));

    console.log(tareas);
}

function obtenerTareasLocalStorage(){
    let tareas

    // Revisamos local storage

    if (localStorage.getItem("tareas") === null){
        tareas = []
    } else{
        tareas = JSON.parse(localStorage.getItem("tareas"))
    }

    return tareas;
}

// Leer los datos de local storage al cargar la pagina

function localStorageListo(){
    let tareas;

    tareas = obtenerTareasLocalStorage();

    tareas.forEach( tarea =>{

        // Crear elemento

        const li = document.createElement("li");
        const botonBorrar = document.createElement("a");

        // Asignar contenido

        li.innerText = tarea;
        botonBorrar.href = "#";
        botonBorrar.innerText = "X";
        botonBorrar.classList.add("borrar")

        // Agregar al DOM

        li.appendChild(botonBorrar);
        $tareas.appendChild(li);
    })
}

// Borrar local storage

function borrarLocalStorage(tarea_a_borrar){
    let tareas;
    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea,i){
        if (tarea_a_borrar === tarea){
            tareas.splice(i,1)
        }
    })

    localStorage.setItem("tareas",JSON.stringify(tareas))
}

function vaciarTareas(){
    while($tareas.firstChild){
        $tareas.removeChild($tareas.firstChild);
    }

    vaciarLocalStorage();
}

function vaciarLocalStorage(){
    localStorage.clear();
}