/* ==========================================================
   FUNDACIÓN PADRINOS DOC DOG
   Sistema Profesional de Adopciones
========================================================== */

// ==============================
// ELEMENTOS
// ==============================

const hero = document.querySelector(".hero");
const formSection = document.getElementById("formularioSection");
const btnComenzar = document.getElementById("btnComenzar");

const form = document.getElementById("formulario");

const steps = document.querySelectorAll(".form-step");

const nextBtns = document.querySelectorAll(".next-btn");

const prevBtns = document.querySelectorAll(".prev-btn");

const progress = document.querySelector(".progress-fill");

const stepNumber = document.getElementById("stepNumber");

const loader = document.getElementById("loader");

const successModal = document.getElementById("successModal");

const finishBtn = document.getElementById("finishBtn");

// ==============================
// VARIABLES
// ==============================

let currentStep = 0;

// ==============================
// INICIAR FORMULARIO
// ==============================

btnComenzar.addEventListener("click", () => {

    hero.style.display = "none";

    formSection.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ==============================
// MOSTRAR PASO
// ==============================

function showStep(index){

    steps.forEach(step => {

        step.classList.remove("active");

    });

    steps[index].classList.add("active");

    stepNumber.textContent = index + 1;

    const porcentaje = ((index + 1) / steps.length) * 100;

    progress.style.width = porcentaje + "%";

}

// Mostrar el primer paso
showStep(currentStep);

// ==============================
// SIGUIENTE
// ==============================

nextBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(!validarPaso(currentStep)){

            return;

        }

        if(currentStep < steps.length - 1){

            currentStep++;

            showStep(currentStep);

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    });

});

// ==============================
// ANTERIOR
// ==============================

prevBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(currentStep>0){

            currentStep--;

            showStep(currentStep);

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    });

});

/* ==========================================================
   VALIDACIÓN DE CADA PASO
========================================================== */

function validarPaso(stepIndex){

    const pasoActual = steps[stepIndex];

    const campos = pasoActual.querySelectorAll(
        "input[required], select[required], textarea[required]"
    );

    let valido = true;

    campos.forEach(campo=>{

        campo.style.borderColor = "#E5E7EB";

        if(campo.value.trim()===""){

            campo.style.borderColor="#ef4444";

            valido=false;

        }

    });

    if(!valido){

        alert("⚠️ Debes completar todos los campos obligatorios antes de continuar.");

    }

    return valido;

}

/* ==========================================================
   QUITAR ERROR AL ESCRIBIR
========================================================== */

const todosLosCampos = document.querySelectorAll(

    "input, select, textarea"

);

todosLosCampos.forEach(campo=>{

    campo.addEventListener("input",()=>{

        campo.style.borderColor="#39B54A";

    });

    campo.addEventListener("change",()=>{

        campo.style.borderColor="#39B54A";

    });

});

/* ==========================================================
   VALIDACIÓN DE EMAIL
========================================================== */

const email = document.querySelector(

    'input[name="email"]'

);

if(email){

email.addEventListener("blur",()=>{

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(

        email.value.trim()!=="" &&

        !regex.test(email.value)

    ){

        email.style.borderColor="#ef4444";

        alert("Ingresa un correo electrónico válido.");

    }

});

}

/* ==========================================================
   VALIDACIÓN CELULAR
========================================================== */

const celular = document.querySelector(

'input[name="celular"]'

);

if(celular){

celular.addEventListener("input",()=>{

    celular.value = celular.value.replace(

        /[^0-9]/g,

        ""

    );

});

}

/* ==========================================================
   EFECTO AL CAMBIAR DE PASO
========================================================== */

function animarPaso(){

    const paso = steps[currentStep];

    paso.animate(

        [

            {

                opacity:0,

                transform:"translateX(30px)"

            },

            {

                opacity:1,

                transform:"translateX(0)"

            }

        ],

        {

            duration:350,

            easing:"ease"

        }

    );

}

const mostrarOriginal = showStep;

showStep = function(index){

    mostrarOriginal(index);

    animarPaso();

};

/* ==========================================================
   ENVÍO DEL FORMULARIO
========================================================== */

const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxmwrjUVz2e60kvUoJ0uI_zigwpT1c6umoYPtJiByPZ_9WF-ajG_92VaFZnsOJmIEiiFg/exec";

form.addEventListener("submit", async function(e){

    e.preventDefault();

    if(!validarPaso(currentStep)){
        return;
    }

    loader.classList.remove("hidden");

    const formData = new FormData(form);

const response = await fetch(URL_SCRIPT, {
    method: "POST",
    body: formData
});

        const resultado = await response.json();

        loader.classList.add("hidden");

        if(resultado.success){

            successModal.classList.remove("hidden");

        }else{

            alert(resultado.error);

        }

    }catch(error){

        loader.classList.add("hidden");

        alert("Error de conexión con el servidor.");

        console.error(error);

    }

});

/* ==========================================================
   BOTÓN FINALIZAR
========================================================== */

finishBtn.addEventListener("click",()=>{

    successModal.classList.add("hidden");

    form.reset();

    currentStep=0;

    showStep(currentStep);

    formSection.style.display="none";

    hero.style.display="flex";

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ==========================================================
   REINICIAR COLORES
========================================================== */

form.addEventListener("reset",()=>{

    document

    .querySelectorAll(

        "input,select,textarea"

    )

    .forEach(campo=>{

        campo.style.borderColor="#E5E7EB";

    });

});

/* ==========================================================
   DESACTIVAR ENTER
========================================================== */

form.addEventListener("keydown",function(e){

    if(e.key==="Enter" && e.target.tagName!=="TEXTAREA"){

        e.preventDefault();

    }

});

/* ==========================================================
   EFECTO BOTONES
========================================================== */

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mousedown",()=>{

        btn.style.transform="scale(.97)";

    });

    btn.addEventListener("mouseup",()=>{

        btn.style.transform="scale(1)";

    });

});

/* ==========================================================
   MENSAJE CONSOLA
========================================================== */

console.log(

"%cFundación Padrinos Doc Dog",

"color:#0F5E9C;font-size:18px;font-weight:bold"

);

console.log(

"%cSistema Profesional de Adopciones",

"color:#39B54A;font-size:14px;"

);
