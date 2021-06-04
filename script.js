// Canvas
let canvas = document.querySelector("canvas");
let tool = canvas.getContext("2d");
tool.strokeStyle="red";//default
// Image-Container-> View of Canvas
let img_container = document.querySelector("#img-container");
// Open-Image
let open_image_input = document.querySelector("#file-input"); // input-file
let open_image = document.querySelector(".open-image");
// All-Tools
let tool_container = document.querySelector(".tool-container");
let allTool = document.querySelectorAll(".tool");
let toolNo = 0;
// Back
let back = document.querySelector("#back");
// Download
let download = document.querySelector("#download");
// Filter-Options
let filterTool = document.querySelector("#filterTool");
let filterOptions = document.querySelector(".filter-options");
let allFilters = document.querySelectorAll(".filters");
let currFilter = "";
// Pencil
let pencil = document.querySelector("#pencil");
let pencil_options = document.querySelector(".pencil-options");
let mouseDown;
let lineWidth = document.querySelector(".line-width")
let allColorEle = document.querySelectorAll(".color");
let currColor = "";
// 
// Apply and Cancel
let apply = document.querySelector(".apply");
let cancel = document.querySelector(".cancel");



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

//*** Filter-Tool
filterTool.addEventListener("click", function (e) {
  toolNo = 1;
  onlyViewToolContainer();
  displayFlex(filterOptions);
})

//*** Adjust-tool

//*** Pencil-Tool
pencil.addEventListener("click", function (e) {
  toolNo = 3;
  onlyViewToolContainer();
  displayFlex(pencil_options);
  mouseDown = false;

  canvas.addEventListener("mousedown", pencilMouseDown);
  canvas.addEventListener("mousemove", pencilMouseMove);
  canvas.addEventListener("mouseup", pencilMouseUp);
})
//Line-width
lineWidth.addEventListener("change", function (e) {
  tool.lineWidth = lineWidth.valueAsNumber;
})
// Handle Click on All Color Elements
allColorEle.forEach(colorEle => {
  // Click on Each Color-Element
  colorEle.addEventListener("click", function (e) {
    removeColorActiveState();
    let colorElement = e.currentTarget;
    colorElement.classList.add("color-active");// Active State
    tool.strokeStyle = colorElement.getAttribute("colorValue");//set color
  });
});

//*** Handle Back-Btn
back.addEventListener("click", function (e) {
  toolNo = 0; // reset toolNo
  document.location.reload(true); // re-load pg

  // removeAllActive(allTool);
  // setActiveState(back, "tool-active");
  // // Important todo- Also clear the Canvas
  // displayFlex(open_image);
  // displayNone(tool_container);
  // displayNone(canvas);
  // displayNone(img_container);
  // displayNone(filterOptions);

})

//*** Download Pic
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
    currFilter = "";  // reset-filter
  }
  onlyViewToolContainer();
})
// Click on-> Cancel
cancel.addEventListener("click", function (e) {
  if (toolNo == 1) {
    applyDefaultFilterInUIandCanvas();
  }
  onlyViewToolContainer();
})

//*****************************Functions */

// Colors In Pencil Formatting State
function removeColorActiveState() {
  allColorEle.forEach(color => {
    color.classList.remove("color-active");
  });
}
// Handle -Pencil MouseDown,MouseMove and MouseUp
function pencilMouseDown(e) {
  if (toolNo == 3) { // Check-Tool State
    mouseDown = true;
    tool.beginPath();
    let x = e.clientX;
    let y = e.clientY;
    x = x - canvas.offsetLeft;
    y = y - canvas.offsetTop;
    tool.moveTo(x, y);

  }
}
function pencilMouseMove(e) {
  if (toolNo == 3) {
    if (mouseDown) {
      let x = e.clientX;
      let y = e.clientY;
      x = x - canvas.offsetLeft;
      y = y - canvas.offsetTop;
      tool.lineTo(x, y);
      tool.stroke();
    }
  }
}
function pencilMouseUp(e) {
  if (toolNo == 3) {
    mouseDown = false;
  }
}

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

// Apply Default filter in UI and Canvas i.e., none
function applyDefaultFilterInUIandCanvas() {
  // Set UI
  img_container.style.filter = "none";
  currFilter = "";
  // Set Canvas
  tool.drawImage(img_container, 0, 0, canvas.width, canvas.height);
}

function onlyViewToolContainer() {
  displayNone(filterOptions);
  displayNone(pencil_options);
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