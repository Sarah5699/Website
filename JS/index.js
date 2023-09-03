//"use strict";

let sideBarWidth = $("#sideBar-inner").innerWidth();
$("#sideBar").css("left",`${-sideBarWidth}px`);
let data;
// ! First Page Function
async function fetchMeals(type, param) {
    let url = `https://themealdb.com/api/json/v1/1/${type}.php${param}`
    console.log(url)
    const res = await fetch(url);
    data = await res.json();    
}
function displayMeals(name, data){
    let content = `<div class="container">
    <div id="meals-Cards" class="row">`;
    for (let index = 0; index < data.meals.length; index++) {
        content += `
            <div class="p-2 col-3 d-flex cardPadding">
                <div onclick="openCardDetails('${data.meals[index].idMeal}',this)" class="position-relative rounded-2 overflow-hidden ${name}card">
                    <img class="img-fluid" src="${data.meals[index].strMealThumb}" alt="">
                    <div id="overlayLayer" class="position-absolute bottom-0 start-0 end-0 text-black overflow-hidden">
                        <h2 class="position-absolute top-50 start-0 translate-middle-y ps-3">
                            ${data.meals[index].strMeal}
                        </h2>
                        <span class="d-none">${index}</span>
                    </div>
                </div>
            </div>
        `
    }
    content +=`</div>
    </div>`
    return content
}
// ! First Page Function

// ^ Search Functions
async function fetchFilteredMeals(param, value) {
    let url = `https://themealdb.com/api/json/v1/1/search.php?${param}${value}`
    const res = await fetch(url);
    data = await res.json();
    document.getElementById("rowData").innerHTML = displaySearch(data);  
}
function displaySearch(data){
    let content = `<div class="container">
    <div id="meals-Cards" class="row">`;
    for (let index = 0; index < data.meals.length; index++) {
        content += `
            <div class="p-2 col-3 d-flex cardPadding">
                <div onclick = "openCardDetails('${data.meals[index].idMeal}',this)" class="position-relative rounded-2 overflow-hidden searchcard">
                    <img class="img-fluid" src="${data.meals[index].strMealThumb}" alt="">
                    <div id="overlayLayer" class="position-absolute bottom-0 start-0 end-0 text-black overflow-hidden">
                        <h2 class="position-absolute top-50 start-0 translate-middle-y ps-3">
                            ${data.meals[index].strMeal}
                        </h2>
                        <span class="d-none">${index}</span>
                    </div>
                </div>
            </div>
        `
    }
    content +=`</div>
    </div>`
    return content
}
// ^ Search Functions

// & Categories Functions
function displayCategory(data){
    let content = `<div class="container">
    <div id="Category-Cards" class="row">`;
    for (let index = 0; index < data.categories.length; index++) {
        content += `
        <div class="p-2 col-3 d-flex cardPadding bg-transparent">
            <div onclick = "fitchFilteredCat('${data.categories[index].strCategory}', this)" class="position-relative rounded-2 overflow-hidden catcard">
                <img class="img-fluid" src="${data.categories[index].strCategoryThumb}" alt="">
                <div id="overlayLayer" class="position-absolute bottom-0 start-0 end-0 text-black overflow-hidden text-center">
                    <h2 class="ps-3">
                        ${data.categories[index].strCategory}
                    </h2>
                    <p>${data.categories[index].strCategoryDescription}</p>
                    <span class="d-none">${index}</span>
                </div>
            </div>
        </div>
        `
    }
    content +=`</div>
    </div>`
    return content
}
async function fitchFilteredCat(name, el){
        await fetchMeals(`filter`,'?c='+name); //no return! shokran
        if ($("body").children().hasClass("container")){
            $(".container").remove();
        }
        $(displayFilteredCat(data)).insertAfter("#sideBar");
}
function displayFilteredCat(data){
    console.log(data);
    let content = `<div class="container">
    <div id="Category-Cards" class="row">`;
    for (let index = 0; index < data.meals.length; index++) {
        content += `
        <div class="p-2 col-3 d-flex cardPadding bg-transparent">
            <div onclick = "openCardDetails('${data.meals[index].idMeal}',this)" class="position-relative rounded-2 overflow-hidden catcard">
                <img class="img-fluid" src="${data.meals[index].strMealThumb}" alt="">
                <div id="overlayLayer" class="position-absolute bottom-0 start-0 end-0 text-black overflow-hidden text-center">
                    <h2 class="ps-3">
                        ${data.meals[index].strMeal}
                    </h2>
                </div>
            </div>
        </div>
        `
    }
    content +=`</div>
    </div>`
    return content
}
// & Categories Functions

// * Area Functions
function displayArea(data){
    let content = `<div class="container">
    <div id="Area-Cards" class="row">`;
    for (let index = 0; index < data.meals.length; index++) {
        content += `
        <div onclick="fitchFilteredArea('${data.meals[index].strArea}',this)" class="p-2 col-3 d-flex flex-column text-center cardPadding bg-transparent text-white areacard">
            <i class="fa-solid fa-house-laptop fa-4x d-block"></i>
            <h3>${data.meals[index].strArea}</h3>
        </div>
            `
    }
    content +=`</div>
    </div>`
    return content
}
async function fitchFilteredArea(name, el){
    await fetchMeals(`filter`,'?a='+name); //no return! shokran
    if ($("body").children().hasClass("container")){
        $(".container").remove();
    }
    $(displayFilteredArea(data)).insertAfter("#sideBar");
}
function displayFilteredArea(data){
console.log(data);
let content = `<div class="container">
<div id="Category-Cards" class="row">`;
for (let index = 0; index < data.meals.length; index++) {
    content += `
    <div class="p-2 col-3 d-flex cardPadding bg-transparent">
        <div onclick = "openCardDetails('${data.meals[index].idMeal}',this)" class="position-relative rounded-2 overflow-hidden catcard">
            <img class="img-fluid" src="${data.meals[index].strMealThumb}" alt="">
            <div id="overlayLayer" class="position-absolute bottom-0 start-0 end-0 text-black overflow-hidden text-center">
                <h2 class="ps-3">
                    ${data.meals[index].strMeal}
                </h2>
            </div>
        </div>
    </div>
    `
}
content +=`</div>
</div>`
return content
}
// * Area Functions

// ? Ingrediant Functions
function displayIng(data){ 
    let content = `<div class="container">
    <div id="ing-Cards" class="row">`;
    for (let index = 0; index < data.meals.length; index++) {
        content += `
        <div onclick="fitchFilteredIng('${data.meals[index].strIngredient}',this)" class="p-2 col-3 d-flex flex-column text-center cardPadding bg-transparent text-white ing-card">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${data.meals[index].strIngredient}</h3>
            <p>${data.meals[index].strDescription}</p>
        </div>
            `
    }
    content +=`</div>
    </div>`
    return content
}
async function fitchFilteredIng(name, el){
    await fetchMeals(`filter`,'?i='+name); //no return! shokran
    if ($("body").children().hasClass("container")){
        $(".container").remove();
    }
    $(displayFilteredIng(data)).insertAfter("#sideBar");
}
function displayFilteredIng(data){
console.log(data);
let content = `<div class="container">
<div id="Category-Cards" class="row">`;
for (let index = 0; index < data.meals.length; index++) {
    content += `
    <div class="p-2 col-3 d-flex cardPadding bg-transparent">
        <div onclick = "openCardDetails('${data.meals[index].idMeal}',this)" class="position-relative rounded-2 overflow-hidden catcard">
            <img class="img-fluid" src="${data.meals[index].strMealThumb}" alt="">
            <div id="overlayLayer" class="position-absolute bottom-0 start-0 end-0 text-black overflow-hidden text-center">
                <h2 class="ps-3">
                    ${data.meals[index].strMeal}
                </h2>
            </div>
        </div>
    </div>
    `
}
content +=`</div>
</div>`
return content
}

function closeSideBar(){
    $("#open").removeClass("d-none")
    $("#open").addClass("d-inline")

    $("#close").removeClass("d-inline")
    $("#close").addClass("d-none")

    $("#sideBar").css("left",`${-sideBarWidth}px`)
}
function displayDetails(meal){
    //let meal = JSON.parse(localStorage.getItem("meal"));
        let ingrediants = Object.values(meal).slice(9,28);
        let measure = Object.values(meal).slice(29, 48);
        //debugger;
        let recipt = measure.map(function(element, index){
            if (element != " ")
                return `${element} ${ingrediants[index]}`
        });
        recipt = recipt.filter((elem) => elem != undefined);
        recipt = recipt.map((element) => `<li class="btn p-2 m-2 btn-info">${element}</li>`).join("");       
        //recipt = measure.map((element, index) => `${element} ${ingrediants[index]}`).join("").split("");

        let content = `
        <div class="container">
        <div id="mealDet" class="row my-5">
            <div class="col-4 text-white">
                <img class="img-fluid rounded-2" src="${meal.strMealThumb}" alt="">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-8 text-white">
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
                <h3>Area : ${meal.strArea}</h3>
                <h3>Category : ${meal.strCategory}</h3>
                <h3>Recipes : </h3>
                <ul class="list-unstyled">
                    ${recipt}
                </ul>
                <h3>Tags : </h3>
                <h3>${meal.strTags}</h3>
                <a class="btn p-2 btn-success" href="${meal.strSource}">Source</a>
                <a class="btn p-2 btn-danger" href="${meal.strYoutube}">Youtube</a>
            </div>
            </div>
    </div>
        `
    return content
        //document.getElementById("mealDet").innerHTML = content;
}
async function openCardDetails(id, el){
    //let indexHtml = $(el).find("span"); data.meals[$(indexHtml).html()]
        if ($("body").children().hasClass("container")){
            $(".container").remove();
        }
        closeSideBar();
        await fetchMeals('lookup','?i='+id);
        //let index = data.meals.findIndex(item => item.strMeal == name)
        //console.log(index)
        $(displayDetails(data.meals[0])).insertAfter("#sideBar")
}
function inputsValidation(el){
    var nameReg = /[A-Za-z ]$/
    let emailReg =  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    let phoneReg =  /^[0-9]{10,12}$/
    let passReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Aa-z\d]{8,}$/

    console.log("ggg")
    debugger;
    if (el.id == 'nameInput' && !nameReg.test(el.value)){
        if ($("#nameAlert").hasClass("d-none")){
        $("#nameAlert").removeClass("d-none")
        }
        $("#nameAlert").addClass("d-block")
    } 
    else{
        if ($("#nameAlert").hasClass("d-block")){
            $("#nameAlert").removeClass("d-block")
        }
        $("#nameAlert").removeClass("d-block")
    }

    if (el.id == 'emailInput' && !emailReg.test(el.value)){
        if ($("#emailAlert").hasClass("d-none")){
            $("#emailAlert").removeClass("d-none")
            }
        $("#emailAlert").addClass("d-block")
    } 
    else{
        if ($("#emailAlert").hasClass("d-block")){
            $("#emailAlert").removeClass("d-block")
        }
        $("#emailAlert").removeClass("d-block")
    }

    if (el.id == 'phoneInput' && !phoneReg.test(el.value)){
        if ($("#phoneAlert").hasClass("d-none")){
            $("#phoneAlert").removeClass("d-none")
            }
        $("#phoneAlert").addClass("d-block")
    } 
    else{
        if ($("#phoneAlert").hasClass("d-block")){
            $("#phoneAlert").removeClass("d-block")
        }
        $("#phoneAlert").removeClass("d-block")
    }

    if (el.id == 'passwordInput' && !passReg.test(el.value)){
        if ($("#passwordAlert").hasClass("d-none")){
            $("#passwordAlert").removeClass("d-none")
            }
        $("#passwordAlert").addClass("d-block")
    } 
    else{
        if ($("#passwordAlert").hasClass("d-block")){
            $("#passwordAlert").removeClass("d-block")
        }
        $("#passwordAlert").removeClass("d-block")
    }
}
$(function () {
    fetchMeals('search','?s=').then(function(){
        document.querySelector('body').innerHTML += displayMeals('',data);
    
    $(".fa-spinner").fadeOut(1000,function(){
        $("#loadingScreen").fadeOut(1000,function(){
            $("body").css("overflow", "auto");
        })
    })
    $("#toggledIcons").on("click",function(eInfo){
        let sideBarLeft = $("#sideBar").position().left;
        if (sideBarLeft == 0){
            closeSideBar();
        }
        else {
            $("#open").removeClass("d-inline")
            $("#open").addClass("d-none")

            $("#close").removeClass("d-none")
            $("#close").addClass("d-inline")

            $("#sideBar").css("left","0px")
        }
    })
    $("#search").on("click",function(){
        closeSideBar();
        if ($("body").children().hasClass("container")){
            $(".container").remove();
        }
        $(` 
        <div class="container w-75">
            <div class="row py-4">
                <div class="col-6">
                    <input oninput="fetchFilteredMeals('s=', this.value)" id="nameSearch" class="form-control bg-transparent text-white" placeholder="Search By Name">
                </div>
                <div class="col-6">
                    <input oninput="fetchFilteredMeals('f=', this.value)" id="letterSearch" class="form-control bg-transparent text-white" placeholder="Search By First Letter">
                </div>
            </div>
        </div>
        <div class="min-vh-100 position-relative">
            <div class="container">
                <div class="row py-5 g-4 " id="rowData">
                
                </div>
            </div>
        </div>
        `).insertAfter("#sideBar")

        $(function(){
            $(".fa-spinner").fadeOut(1000,function(){
                $(".inner-loading-screen").fadeOut(1000,function(){
                    $("body").css("overflow", "auto");
                })
            })
        })

    })
    $("#categories").on("click", async function(){
        closeSideBar();
        await fetchMeals('categories','')
        if ($("body").children().hasClass("container")){
            $(".container").remove();
        }
        $(displayCategory(data)).insertAfter("#sideBar");
    })
    $("#area").on("click",async function(){
        closeSideBar();
        await fetchMeals('list','?a=list')
        if ($("body").children().hasClass("container")){
            $(".container").remove();
        }
        document.querySelector('body').innerHTML += displayArea(data);
    })
    $("#ingrediants").on("click",async function(){
        closeSideBar();
        await fetchMeals('list','?i=list')
        if ($("body").children().hasClass("container")){
            $(".container").remove();
        }
        document.querySelector('body').innerHTML += displayIng(data);
    })
    $("#contact").on("click",function(){
        closeSideBar();
        let content = `
        <div class="container">
            <div class="row py-5 g-4 " id="rowData"><div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                <div class="container w-75 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input id="nameInput" onkeyup="inputsValidation(this)" type="text" class="form-control" placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="emailInput" onkeyup="inputsValidation(this)" type="email" class="form-control " placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid *exemple@yyy.zzz
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="phoneInput" onkeyup="inputsValidation(this)" type="text" class="form-control " placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid Phone Number
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="ageInput" onkeyup="inputsValidation(this)" type="number" class="form-control " placeholder="Enter Your Age" fdprocessedid="jedyp">
                            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid age
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="passwordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Enter Your Password" fdprocessedid="fy9ktt">
                            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*
                            </div>
                        </div>
                        <div class="col-md-6">
                            <input id="repasswordInput" onkeyup="inputsValidation(this)" type="password" class="form-control " placeholder="Repassword" fdprocessedid="mvybqm">
                            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid repassword 
                            </div>
                        </div>
                    </div>
                        <button id="submitBtn" disabled="true" class="btn btn-outline-danger px-2 mt-3">Submit</button>
                    </div>
                </div> 
            </div>
        </div>
        `
        if ($("body").children().hasClass("container")){
            $(".container").remove();
        }
        document.querySelector('body').innerHTML += content
    })
    })
});