/*----catch input---*/
var productNameInp = document.getElementById("productNameInp");
var productPriceInp = document.getElementById("productPriceInp");
var productCatInp = document.getElementById("productCatInp");
var productdescInp = document.getElementById("productdescInp");

/*------- check if there are data to display after reload---*/
var productContainer;
if (localStorage.getItem("30_9products") != null) {
  productContainer = JSON.parse(localStorage.getItem("30_9products"));
  displayData(productContainer); /* there are data, display these*/
} else {
  productContainer = [];
}

/*----- add function------*/
function addProducts() {
  if (validateProductName()) {
    var product = {
      productName: productNameInp.value,
      productPrice: productPriceInp.value,
      productcat: productCatInp.value,
      productdesc: productdescInp.value,
    };

    productContainer.push(product); /*add object in array*/
    localStorage.setItem(
      "30_9products",
      JSON.stringify(productContainer)
    ); /*store in local storage*/
    clearForm(); /*call clear function*/
    displayData(productContainer); /*call display function*/
  } else {
    alert("enter valid product name");
  }
}

/*------ clearForm--------*/

function clearForm() {
  productNameInp.value = "";
  productPriceInp.value = "";
  productCatInp.value = "";
  productdescInp.value = "";
}

/*-----display function -----*/

function displayData(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += `<tr>
    <td>${i}</td>
    <td>${list[i].productName}</td>
    <td>${list[i].productPrice}</td>
    <td>${list[i].productcat}</td>
    <td>${list[i].productdesc}</td>
    <td><button onclick="updateProduct(${i})" class="btn btn-primary">update</button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
  </tr>`;
  }
  document.getElementById("myTable").innerHTML = cartona;
}

/*----- delete function ----*/

function deleteProduct(index) {
  // alert(index);
  productContainer.splice(
    index,
    1
  ); /* one object to delete with specific index*/
  localStorage.setItem(
    "30_9products",
    JSON.stringify(productContainer)
  ); /*re-store in local storage to replace date after delete*/
  displayData(productContainer); /*display after delete*/
}

/*------update functions -----*/
var tem;
function updateProduct(index) {
  // alert(index);
  // console.log(productContainer[index]);
  // show date in form
  productNameInp.value = productContainer[index].productName;
  productPriceInp.value = productContainer[index].productPrice;
  productCatInp.value = productContainer[index].productcat;
  productdescInp.value = productContainer[index].productdesc;

  //show (button update) and hide (button add)

  document
    .getElementById("update_btn")
    .classList.replace("d-none", "d-inline-block");
  document.getElementById("add_btn").classList.add("d-none");
  scroll({ top: 0, behavior: "smooth" });
  //save index to replaceData function
  tem = index;
}

function replaceData(index) {
  var productUpdate = {
    productName: productNameInp.value,
    productPrice: productPriceInp.value,
    productcat: productCatInp.value,
    productdesc: productdescInp.value,
  };
  productContainer[index] = productUpdate;
  // productContainer.splice(index, 1, productUpdate);
  localStorage.setItem("30_9products", JSON.stringify(productContainer));
  clearForm();
  displayData(productContainer);
  document
    .getElementById("update_btn")
    .classList.replace("d-inline-block", "d-none");
  document
    .getElementById("add_btn")
    .classList.replace("d-none", "d-inline-block");
}

/*-----search function -----*/

function search(searchString) {
  var searchContainer = [];
  // to push objects ouput from search and use it to display
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].productName
        .toLowerCase()
        .includes(searchString.toLowerCase())
    ) {
      // console.log(productContainer[i]);
      searchContainer.push(productContainer[i]);
    }

    displayData(searchContainer);
  }
}

/* if you want  search by categry too

productContainer[i].productName
        .toLowerCase()
        .includes(searchString.toLowerCase()) || productContainer[i].productcat
        .toLowerCase()
        .includes(searchString.toLowerCase())

*/

/*-----validation function -----*/

function validateProductName() {
  let regx = /^[A-Z][a-z]{3,8}$/;

  if (regx.test(productNameInp.value) == true) {
    if (productNameInp.classList.contains("is-invalid")) {
      productNameInp.classList.replace("is-invalid", "is-valid");
    }
    // console.log("true");
    return true;
  } else {
    productNameInp.classList.add("is-invalid");
    // console.log("false");
    return false;
  }
}
// there are 2 class in bootstrap for input is-valid, is-invalid
