// ! element------------------------------------------------------------------------------------------------
let searchLink = document.querySelector("#search");
let categoriesLink = document.querySelector("#categories");
let areaLink = document.querySelector("#area");
let ingredientsLink =document.querySelector("#ingredients");
let contact = document.querySelector("#contact");

let searchName = document.querySelector("#searchName");
// console.log(searchName)
let searchLetter = document.querySelector("#searchLetter");
// console.log(searchLetter)

let nameOfSearch;
let letterOfSearch;
// let index = 0;

let nameInput=document.querySelector("#nameInput");
let emailInput =document.querySelector("#emailInput");
let phoneInput =document.querySelector("#phoneInput");
let ageInput =document.querySelector("#ageInput");
let passInput =document.querySelector("#passInput");
let rePassword =document.querySelector("#Repassword");

/****************************var********************************* */
let res;
let response;
let areaRes;
let ingredRes;
let letterRes;
let catMealsRes;
let ingredientsMealRes;
let areaMealsRes;


//!events----------------------------------------------------------------------------------------------------
searchLink.addEventListener("click",async ()=>{
    document.querySelector(".my-search").classList.remove("d-none")
    document.querySelector(".my-row").innerHTML="";
    document.querySelector(".my-main-page").classList.remove("d-none");
    document.querySelector(".my-contact-us").classList.add("d-none")
    document.querySelector(".my-contact-us").classList.add("d-none")




})

categoriesLink.addEventListener("click",()=>{
    grtCategoryApi()
    document.querySelector(".my-search").classList.add("d-none")
    document.querySelector(".my-main-page").classList.remove("d-none");
    document.querySelector(".my-contact-us").classList.add("d-none")



})

areaLink.addEventListener("click",()=>{
    getAreaApi()
    document.querySelector(".my-search").classList.add("d-none")
    document.querySelector(".my-main-page").classList.remove("d-none");
    document.querySelector(".my-contact-us").classList.add("d-none")



})

ingredientsLink.addEventListener("click",()=>{
    getIngredientsApi()
    document.querySelector(".my-search").classList.add("d-none")
    document.querySelector(".my-main-page").classList.remove("d-none");
    document.querySelector(".my-contact-us").classList.add("d-none")



})

// document.body.addEventListener("click",function(e){
//     console.log(e.target)
// })

document.querySelector("#searchName").addEventListener("input",function(){
    //console.log(this.value)
    getRandomMeal(this.value)
    document.querySelector(".my-main-page").classList.remove("d-none");
    document.querySelector(".my-contact-us").classList.add("d-none")



})

document.querySelector("#searchLetter").addEventListener("input",function(){
       console.log(this.value)
       searchByLetterApi(this.value)
       document.querySelector(".my-main-page").classList.remove("d-none");

})

contact.addEventListener("click",()=>{
    document.querySelector(".my-contact-us").classList.remove("d-none")
    document.querySelector(".my-main-page").classList.add("d-none");
    document.querySelector(".my-search").classList.add("d-none")

})

//!regex-----------------------------------------------------------------------------
let nameRegex = /^[A-Z]\w{0,20}$/;
let emailRegex=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
let phoneRegex=/^01[0125][0-9]{8}$/;
let ageRegex =/^[1-9]?[0-9]{1}$|^100$/;
let passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validation(regex,input){
    if(regex.test(input.value)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        console.log("right")
        // input.parentElement.nextElementSibling.classList.add("d-none") ;

        return true;
    }else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        console.log("wrong")
        // input.parentElement.nextElementSibling.classList.remove("d-none") ;
        return false;
    }
}

nameInput.addEventListener("input",function(){
    if(validation(nameRegex,nameInput)){
        document.querySelector(".name-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".name-validation").classList.remove("d-none")

    }
})
emailInput.addEventListener("input",function(){
    if(validation(emailRegex,emailInput)){
        document.querySelector(".email-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".email-validation").classList.remove("d-none")

    }
})
phoneInput.addEventListener("input",function(){
    if(validation(phoneRegex,phoneInput)){
        document.querySelector(".phone-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".phone-validation").classList.remove("d-none")

    }
})
ageInput.addEventListener("input",function(){
    if(validation(ageRegex,ageInput)){
        document.querySelector(".age-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".age-validation").classList.remove("d-none")

    }
})
passInput.addEventListener("input",function(){
    if(validation(passRegex,passInput)){
        document.querySelector(".pass-validation").classList.add("d-none")
    }
    else{
        document.querySelector(".pass-validation").classList.remove("d-none")

    }
})

rePassword.addEventListener("input",function(){
    if(passInput.value == rePassword.value){
        document.querySelector(".rePass-validation").classList.add("d-none")
        console.log("hi")
    }
    else{
        document.querySelector(".rePass-validation").classList.remove("d-none")
        console.log("gggg")
    }
})





const contactInputs = document.querySelectorAll(".contact-input");
const contactBtn = document.getElementById("contact-btn");

function checkInputs() {
  let allInputsFilled = true;

  contactInputs.forEach(input => {
    if (input.value === "") {
      allInputsFilled = false;
    }
  });

  contactBtn.disabled = !allInputsFilled;
}

contactInputs.forEach(contactInputs => {
    contactInputs.addEventListener("input", checkInputs);
});


//!Functions--------------------------------------------------------------------------------------------------





async function getRandomMeal(search=""){


    console.log(search)
    res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    res= await res.json();
    console.log("before hpmrMeals")
    console.log(  res.meals);
    displayHomePage(res.meals);


}


async function searchByLetterApi(search){
    letterRes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
    letterRes = await letterRes.json();
    console.log(letterRes.meals);
    displaySearchByLetterPage(letterRes.meals)
}

async function categoryMealApi(category){
    catMealsRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    catMealsRes = await catMealsRes.json();
    console.log(catMealsRes.meals);
    displayInnerCategory(catMealsRes.meals)
}
// categoryMealApi()

async function ingredientsMealResMealApi(ingredient){      
    ingredientsMealRes=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    ingredientsMealRes = await ingredientsMealRes.json();
    console.log(ingredientsMealRes.meals)
    displayInnerIngrad(ingredientsMealRes.meals)
}

async function areaMealsApi(area){
    areaMealsRes=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    areaMealsRes = await areaMealsRes.json();
    console.log(areaMealsRes.meals)
    displayInnerArea(areaMealsRes.meals)
}


async function grtCategoryApi(){
    response =  await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    response = await response.json();
    console.log(response.categories)
    displayCategoryPage(response.categories)
}

async function getAreaApi(){
    areaRes =  await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    areaRes = await areaRes.json();
    console.log(areaRes.meals)
    displayAreaPage(areaRes.meals)
}

async function getIngredientsApi(){
    ingredRes =  await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    ingredRes = await ingredRes.json();
    console.log(ingredRes.meals)
    displayIngredientsPage(ingredRes.meals)
    
}



function displayHomePage(arr){
    let cartona="";
    for(let i = 0 ; i<res.meals.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal" onclick="displayDetailsPage (${i})">
        <div>
            <img src="${res.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
        </div>
        <div class="overlay position-absolute rounded-3 d-flex align-items-center">
            <span class="fs-3 fw-medium mx-2">${res.meals[i].strMeal }</span>
        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;
}
function displaySearchByLetterPage(arr){
    let cartona="";
    for(let i = 0 ; i<letterRes.meals.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal" onclick="displayDetailsSearchLetter (${i})">
        <div>
            <img src="${letterRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
        </div>
        <div class="overlay position-absolute rounded-3 d-flex align-items-center">
            <span class="fs-3 fw-medium mx-2">${letterRes.meals[i].strMeal }</span>
        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;
}


function displayCategoryPage(arr){
    let cartona="";
    for(let i = 0 ; i<response.categories.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal" onclick="categoryMealApi ('${response.categories[i].strCategory}')">
        <div>
            <img src="${response.categories[i].strCategoryThumb}" class="w-100 rounded-3" alt="">
        </div>
        <div class="overlay position-absolute rounded-3 overflow-hidden d-flex flex-column justify-content-center align-items-center ">
            <span class="fs-3 fw-medium mx-2">${response.categories[i].strCategory}</span>
            <p class="categoryDDesc mx-3  text-center"> ${response.categories[i].strCategoryDescription}</p>
            
        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;

}

function displayInnerCategory(){ 
    let cartona="";
    for(let i = 0 ; i<catMealsRes.meals.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal" onclick="displayDetailsCategory (${i})">
        <div>
            <img src="${catMealsRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
        </div>
        <div class="overlay position-absolute rounded-3 d-flex align-items-center">
            <span class="fs-3 fw-medium mx-2">${catMealsRes.meals[i].strMeal }</span>
        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;
}


function displayInnerIngrad(){ 
    let cartona="";
    for(let i = 0 ; i<ingredientsMealRes.meals.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal" onclick="displayDetailsIngrad (${i})">
        <div>
            <img src="${ingredientsMealRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
        </div>
        <div class="overlay position-absolute rounded-3 d-flex align-items-center">
            <span class="fs-3 fw-medium mx-2">${ingredientsMealRes.meals[i].strMeal }</span>
        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;
}

function displayInnerArea(){ 
    let cartona="";
    for(let i = 0 ; i<areaMealsRes.meals.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal" onclick="displayDetailsArea (${i})">
        <div>
            <img src="${areaMealsRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
        </div>
        <div class="overlay position-absolute rounded-3 d-flex align-items-center">
            <span class="fs-3 fw-medium mx-2">${areaMealsRes.meals[i].strMeal }</span>
        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;
}

function displayAreaPage(arr){
    let cartona="";
    for(let i = 0 ; i<areaRes.meals.length; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal " onclick="areaMealsApi ('${areaRes.meals[i].strArea}')  ">
        <div class="d-flex flex-column justify-content-center align-items-center text-white">
        <i class="fa-solid fa-house-laptop fs-1 fw-bolder areaIcon"></i>
        <span class=" mx-3 fs-3">${areaRes.meals[i].strArea}</span>

        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;

}



function displayIngredientsPage(arr){
    let cartona="";
    for(let i = 0 ; i<20; i++ ){
        cartona+=`
        <div class="col-lg-3 col-md-6 position-relative overflow-hidden meal "  onclick="ingredientsMealResMealApi('${ingredRes.meals[i].strIngredient}') ">
        <div class="d-flex flex-column justify-content-center align-items-center text-white text-center">
        <i class="fa-solid fa-drumstick-bite fs-1 fw-bolder areaIcon"></i>
        <span class=" mx-3 fs-4 fw-bold">${ingredRes.meals[i].strIngredient}</span>
        <p class="ingrediantDesc py-3">${ingredRes.meals[i].strDescription}</p>

        </div>
    </div>
        `
    }
    document.querySelector(".my-row").innerHTML=cartona;

}



getRandomMeal()

function displayDetailsPage (i){
    let  cartona = `
    <div class="container detealsPage my-1">
    <div class="row ps-3">
        <div class="col-lg-4 text-white">
            <img src="${res.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
            <h2 class="mt-1">${res.meals[i].strMeal}</h2>
        </div>
        <div class="col-lg-8 text-white">
            <h2 class="fw-bold">Instructions</h2>
            <p>${res.meals[i].strInstructions}</p>

            <p class="fs-3 fw-bold">Area : <span class="fw-medium">${res.meals[i].strArea}</span></p>
            <p class="fs-3 fw-bold">Category : <span class="fw-medium">${res.meals[i].strCategory}</span></p>
            <p class="fs-3 fw-medium" >Recipes :</p>
            
            
            <ul class="list-unstyled d-flex flex-wrap ingrad-list gap-4">
                ${ingradList(res.meals[i]) }
            </ul>

            <p class="fs-3 fw-medium" >Tags :</p>
            <p class="type">Soup</p>

            <ul class="list-unstyled d-flex ingradSrc gap-2">
                <li class="scr"> <a href="${res.meals[i].strSource}" target="_blank" class="text-decoration-none text-white">Source</a></li>
                <li class="yout"><a href="${res.meals[i].strYoutube}" target="_blank" class="text-decoration-none text-white">Youtube</a></li>
            </ul>
        </div>
    </div>

</div>
        `;
    

    document.querySelector(".my-row").innerHTML=cartona;

}
function displayDetailsSearchLetter (i){
    let  cartona = `
    <div class="container detealsPage my-1">
    <div class="row ps-3">
        <div class="col-lg-4 text-white">
            <img src="${letterRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
            <h2 class="mt-1">${letterRes.meals[i].strMeal}</h2>
        </div>
        <div class="col-lg-8 text-white">
            <h2 class="fw-bold">Instructions</h2>
            <p>${letterRes.meals[i].strInstructions}</p>

            <p class="fs-3 fw-bold">Area : <span class="fw-medium">${letterRes.meals[i].strArea}</span></p>
            <p class="fs-3 fw-bold">Category : <span class="fw-medium">${letterRes.meals[i].strCategory}</span></p>
            <p class="fs-3 fw-medium" >Recipes :</p>
            
            
            <ul class="list-unstyled d-flex flex-wrap ingrad-list gap-4">
                ${ingradList(letterRes.meals[i]) }
            </ul>

            <p class="fs-3 fw-medium" >Tags :</p>
            <p class="type">Soup</p>

            <ul class="list-unstyled d-flex ingradSrc gap-2">
                <li class="scr"> <a href="${letterRes.meals[i].strSource}" target="_blank" class="text-decoration-none text-white">Source</a></li>
                <li class="yout"><a href="${letterRes.meals[i].strYoutube}" target="_blank" class="text-decoration-none text-white">Youtube</a></li>
            </ul>
        </div>
    </div>

</div>
        `;
    

    document.querySelector(".my-row").innerHTML=cartona;

}

function displayDetailsCategory (i){
    let  cartona = `
    <div class="container detealsPage my-1">
    <div class="row ps-3">
        <div class="col-lg-4 text-white">
            <img src="${catMealsRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
            <h2 class="mt-1">${catMealsRes.meals[i].strMeal}</h2>
        </div>
        <div class="col-lg-8 text-white">
            <h2 class="fw-bold">Instructions</h2>
            <p>${catMealsRes.meals[i].strInstructions}</p>

            <p class="fs-3 fw-bold">Area : <span class="fw-medium">${catMealsRes.meals[i].strArea}</span></p>
            <p class="fs-3 fw-bold">Category : <span class="fw-medium">${catMealsRes.meals[i].strCategory}</span></p>
            <p class="fs-3 fw-medium" >Recipes :</p>
            
            
            <ul class="list-unstyled d-flex flex-wrap ingrad-list gap-4">
                ${ingradList(catMealsRes.meals[i]) }
            </ul>

            <p class="fs-3 fw-medium" >Tags :</p>
            <p class="type">Soup</p>

            <ul class="list-unstyled d-flex ingradSrc gap-2">
                <li class="scr"> <a href="${catMealsRes.meals[i].strSource}" target="_blank" class="text-decoration-none text-white">Source</a></li>
                <li class="yout"><a href="${catMealsRes.meals[i].strYoutube}" target="_blank" class="text-decoration-none text-white">Youtube</a></li>
            </ul>
        </div>
    </div>

</div>
        `;
    

    document.querySelector(".my-row").innerHTML=cartona;

}

function displayDetailsIngrad (i){
    let  cartona = `
    <div class="container detealsPage my-1">
    <div class="row ps-3">
        <div class="col-lg-4 text-white">
            <img src="${ingredientsMealRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
            <h2 class="mt-1">${ingredientsMealRes.meals[i].strMeal}</h2>
        </div>
        <div class="col-lg-8 text-white">
            <h2 class="fw-bold">Instructions</h2>
            <p>${ingredientsMealRes.meals[i].strInstructions}</p>

            <p class="fs-3 fw-bold">Area : <span class="fw-medium">${ingredientsMealRes.meals[i].strArea}</span></p>
            <p class="fs-3 fw-bold">Category : <span class="fw-medium">${ingredientsMealRes.meals[i].strCategory}</span></p>
            <p class="fs-3 fw-medium" >Recipes :</p>
            
            
            <ul class="list-unstyled d-flex flex-wrap ingrad-list gap-4">
                ${ingradList(ingredientsMealRes.meals[i]) }
            </ul>

            <p class="fs-3 fw-medium" >Tags :</p>
            <p class="type">Soup</p>

            <ul class="list-unstyled d-flex ingradSrc gap-2">
                <li class="scr"> <a href="${ingredientsMealRes.meals[i].strSource}" target="_blank" class="text-decoration-none text-white">Source</a></li>
                <li class="yout"><a href="${ingredientsMealRes.meals[i].strYoutube}" target="_blank" class="text-decoration-none text-white">Youtube</a></li>
            </ul>
        </div>
    </div>

</div>
        `;
    

    document.querySelector(".my-row").innerHTML=cartona;

}
function displayDetailsArea (i){
    let  cartona = `
    <div class="container detealsPage my-1">
    <div class="row ps-3">
        <div class="col-lg-4 text-white">
            <img src="${areaMealsRes.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
            <h2 class="mt-1">${areaMealsRes.meals[i].strMeal}</h2>
        </div>
        <div class="col-lg-8 text-white">
            <h2 class="fw-bold">Instructions</h2>
            <p>${areaMealsRes.meals[i].strInstructions}</p>

            <p class="fs-3 fw-bold">Area : <span class="fw-medium">${areaMealsRes.meals[i].strArea}</span></p>
            <p class="fs-3 fw-bold">Category : <span class="fw-medium">${areaMealsRes.meals[i].strCategory}</span></p>
            <p class="fs-3 fw-medium" >Recipes :</p>
            
            
            <ul class="list-unstyled d-flex flex-wrap ingrad-list gap-4">
                ${ingradList(areaMealsRes.meals[i]) }
            </ul>

            <p class="fs-3 fw-medium" >Tags :</p>
            <p class="type">Soup</p>

            <ul class="list-unstyled d-flex ingradSrc gap-2">
                <li class="scr"> <a href="${areaMealsRes.meals[i].strSource}" target="_blank" class="text-decoration-none text-white">Source</a></li>
                <li class="yout"><a href="${areaMealsRes.meals[i].strYoutube}" target="_blank" class="text-decoration-none text-white">Youtube</a></li>
            </ul>
        </div>
    </div>

</div>
        `;
    

    document.querySelector(".my-row").innerHTML=cartona;

}


function ingradList(meal) {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientList += `<li>${measure} ${ingredient}</li>`;
        }
    }
    return ingredientList;
}


//!jQuery---------------------------------------------------------------------------------------------------------
$(".open").click(()=>{
    $("nav").removeClass("nav-out")
    $("nav").addClass("nav-in")
    $(".nav-top-links").addClass("animate__fadeInDown")
    $(".nav-top-links").removeClass("animate__fadeOutUp")

    $(".close").removeClass("d-none")
    $(".open").addClass("d-none")

    
})


$(".close").click(()=>{

    $("nav").removeClass("nav-in")
    $("nav").addClass("nav-out")
    $(".nav-top-links").removeClass("animate__fadeInDown")
    $(".nav-top-links").addClass("animate__fadeOutUp")
    $(".close").addClass("d-none")
    $(".open").removeClass("d-none")

    
})


$(document).ready(function(){
    $(".loadingScreen").fadeOut(1000)
})
$("#categories").ready(function(){
    $(".loadingScreen").fadeOut(1000)
})
$("#area").ready(function(){
    $(".loadingScreen").fadeOut(1000)
})
$("#ingredients").ready(function(){
    $(".loadingScreen").fadeOut(1000)
})
$("#contact").ready(function(){
    $(".loadingScreen").fadeOut(1000)
})
$("#searchName").ready(function(){
    $(".loadingScreen").fadeOut(1000)
})

/******************************************************************************* */

