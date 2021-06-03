
let img_container = document.querySelector("#img-container");
// // Open-Image
// let open_image_input = document.querySelector("#file-input"); // input-file
// let open_image = document.querySelector(".open-image");

// Filter-Options

let ele=document.getElementById("myImg");
console.log(ele.style.filter)

//**********************Open Image */
// open_image_input.addEventListener("change", function (e) {
//   let file = open_image_input.files; // img-file
  
//   let img = new Image;
//   img.src = URL.createObjectURL(file[0]);
//   img_container.src = img.src;  // Set UI- <img>
//   // img_container.style.filter = "grayscale(100%)";
  
// })

document.querySelector("button").addEventListener("click",myFunction)

function myFunction() {
  document.getElementById("myImg").style.filter = "grayscale(100%)";
  let ele=document.getElementById("myImg");
  document.getElementById("myImg2").style.filter = ele.style.filter;
  console.log(ele.style.filter)
}




