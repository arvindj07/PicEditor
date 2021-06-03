// Canvas
let canvas = document.querySelector("canvas");
let tool = canvas.getContext("2d");
// Image-Container-> View of Canvas
let img_container = document.querySelector("#img-container");
// Open-Image
let open_image_input = document.querySelector("#file-input"); // input-file
let open_image = document.querySelector(".open-image");
// All-Tools
let tool_container = document.querySelector(".tool-container");
let allTool = document.querySelectorAll(".tool");
let filterTool = document.querySelector("#filterTool");
let back = document.querySelector("#back");
let download = document.querySelector("#download");
let toolNo = 0;
// Filter-Options
let filterOptions = document.querySelector(".filter-options");
let allFilters = document.querySelectorAll(".filters");
let currFilter = "";
// Apply and Cancel
let apply = document.querySelector(".apply");



//**********************Open Image */
open_image_input.addEventListener("change", function (e) {
  let file = open_image_input.files; // img-file
  // Empty-file
  if (file.length == 0) {
    alert("No file selected");
    return;
  }

  // display canvas and img-container
  displayBlock(canvas);
  displayBlock(img_container);
  let img = new Image;
  img.src = URL.createObjectURL(file[0]);
  img_container.src = URL.createObjectURL(file[0]);  // Set UI- <img>
  // When image is loaded, draw it on canvas
  if (toolNo == 0) {
    img_container.onload = function () {
      tool.drawImage(img_container, 0, 0, canvas.width, canvas.height);
    }
  }
  displayNone(open_image);  // hide-> open-image bar
  displayFlex(tool_container); // display-> all tools bar
  removeAllActive(allTool);
})

//********************************All Tools */

// Filter-Tool
filterTool.addEventListener("click", function (e) {
  toolNo = 1;
  displayFlex(filterOptions);
})

// Handle Back-Btn
back.addEventListener("click", function (e) {
  toolNo = 5;
  removeAllActive(allTool);
  setActiveState(back, "tool-active");
  // Important todo- Also clear the Canvas
  displayFlex(open_image);
  displayNone(tool_container);
  displayNone(canvas);
  displayNone(img_container);
  displayNone(filterOptions);
  toolNo = 0;
})
// Download Pic
download.addEventListener("click", function (e) {
  toolNo = 4;
  let url = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = url;
  a.download = "file.png";
  a.click();
  a.remove();
})

//**********************************Apply-Filters */
// apply filter to image in UI
allFilters.forEach(filter => {
  filter.addEventListener("click", function (e) {
    let id = filter.getAttribute("id");
    let styleFilter = getFilter(id);
    img_container.style.filter = styleFilter;
    currFilter = styleFilter;
  })
});
// apply filter to image in Canvas
apply.addEventListener("click", function (e) {
  if (toolNo == 1) {
    applyFilterInCanvas();
    currFilter = "";
  }
})

// get-Filter from UI
function getFilter(id) {
  // default-filter
  if (!id || id == "filter1") {
    return "none";
  } else if (id == "filter2") {
    return "opacity(50%)";
  } else if (id == "filter3") {
    return "sepia(100%)";
  } else if (id == "filter4") {
    return "grayscale(100%)";
  } else if (id == "filter5") {
    return "hue-rotate(180deg)";
  } else if (id == "filter6") {
    return "contrast(180%)";
  }
}
// Apply filter in Canvas
function applyFilterInCanvas() {
  tool.filter = currFilter;
  tool.drawImage(img_container, 0, 0, canvas.width, canvas.height);
  tool.filter = "none";
}

// Set Active-State of an Element
function setActiveState(element, class_name) {
  element.classList.add(class_name);
}

// Remove Active-State of all-tools
function removeAllActive(allToolEle) {
  allToolEle.forEach(tool => {
    tool.classList.remove("tool-active");
  });
}

// Handle Display-Properties of Element
function displayNone(element) {
  element.style.display = "none";
}
function displayFlex(element) {
  element.style.display = "flex";
}
function displayBlock(element) {
  element.style.display = "block";
  element.style.filter = "none";
}