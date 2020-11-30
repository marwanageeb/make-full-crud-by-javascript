// i defined 4 variable every one hold the input code   
var ProductNameInp = document.getElementById("ProductNameInput");
    ProductPriceInp = document.getElementById("ProductPriceInput"),
    ProductCategoryInp = document.getElementById("ProductCategoryInput"),
    ProductDescriptionInp = document.getElementById("ProductDescriptionInput");
  var productList,
    addBtn=document.getElementById("addBtn"),
    currentIndex=0;
addBtn.addEventListener("click",function(){
    if (addBtn.innerHTML=="add") {
        addProduct();
    } else {
       saveUpdate(); 
    }
})
//productList as array 
if (localStorage.getItem("myProducts")==null) {
    productList=[];

} else {
    //JSON.parse
    //allow to turn from string to json
    productList=JSON.parse(localStorage.getItem("myProducts"));
    displayProduct();
}

// function allow to user when click on the addbutton to add data then
//run displayProduct() function that allow display data in table 
//then run cleratData() which clear data from input after display in table
function addProduct(){
var product = {
    name :ProductNameInp.value,
    price :ProductPriceInp.value,
    Category :ProductCategoryInp.value,
    Description : ProductDescriptionInp.value
}
productList.push(product);
// save data in local storage
localStorage.setItem("myProducts" , JSON.stringify(productList));
displayProduct();
cleratData()
}

//function that allow display data in table
function displayProduct()
{
    var container="";
    for (var i = 0; i < productList.length; i++) {
        container +=`<tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price} </td>
        <td>${productList[i].Category }</td>
        <td>${productList[i].Description}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-info">Delete</button></td>

        </tr>`
    }
    document.getElementById("tableBody").innerHTML=container;
}

//function clear data from input after display in table
function cleratData(){
    document.getElementById("ProductNameInput").value=""; 
    document.getElementById("ProductPriceInput").value="";
    document.getElementById("ProductCategoryInput").value="";
    document.getElementById("ProductDescriptionInput").value="";
}

//function make user search by keyup
function searchProduct(term)
{
    var searchList='';
    var searchList2='';
    var newTxt='';

for (var i= 0; i < productList.length; i++) {
    //includes(term.trim() used to know if productList contain the 
    //term user enter without right or left space
if (productList[i].name.includes(term.trim())==true) {
    searchList +=`<tr>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].Category}</td>
    <td>${productList[i].Description}</td>
    </tr>`;
    //make search term have color red
    newTxt=productList[i].name.replace(term,`<span style="color:red"> ${term}</span>`)
    searchList2+= `<p>`+newTxt+`</p>`
}    
}
//innerHTML have advantage clear old one and but new data
document.getElementById("tableBody").innerHTML=searchList;
// show data in pargragh
document.getElementById("searchReasult").innerHTML=searchList2;

}

function deleteProduct(index){
productList.splice(index,1)
localStorage.setItem("myProducts" , JSON.stringify(productList));
displayProduct()

}

function updateProduct(index){
    currentIndex=index;
    ProductNameInp.value=productList[index].name;
    ProductPriceInp.value =productList[index].price;
    ProductCategoryInp.value =productList[index].Category;
    ProductDescriptionInp.value=productList[index].Description;
    addBtn.innerHTML="Update";
}

function saveUpdate(){
    var product = {
        name :ProductNameInp.value,
        price :ProductPriceInp.value,
        Category :ProductCategoryInp.value,
        Description : ProductDescriptionInp.value
    }
    productList[currentIndex]=product;
    localStorage.setItem("myProducts" , JSON.stringify(productList));
    displayProduct();
    cleratData();
    addBtn.innerHTML="Add Product"
}