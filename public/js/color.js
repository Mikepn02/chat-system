
window.colors = ["#3e3e3e", "#2f2f2f", "#202020", "#111111", "#020202", "#000000", "#3e3e8e", "#2f2f7f", "#202070", "#111161", "#020252", "#000048", "#0954B5",
"#0033FF","#0033FF","#1600DE","#0000c4","#0F0096",
"#ffc800","#ffb51d","#ffb500","#ffa200","#ff7d00","#ff6100f0",
"#ffdc57","#ffd740","#ffea00","#ffd600","#ffc400","#ffab00",
"#bcaaa4","#a1887f","#8d6e63","#6d4c41","#4e342e","#3e2723",
"#cfd8dc","#90a4ae","#78909c","#546e7a","#37474f","#263238",
"#b2ebf2","#26c6da","#00bcd4","#00acc1","#00838f","#006064",
"#f95c5c","#f93232","#f41f1f","#f41111","#ff0808","#e90000",
"#0030fff0","#2f2fcf", "#2020c0", "#1111b1", "#0202a2", "#000098", "#3e8e3e", "#2f7f2f", "#207020", "#116111", "#025202", "#004800", "#3e8e8e", "#2f7f7f", "#207070", "#116161", "#025252", "#004848", "#3e8ede", "#2f7fcf", "#2070c0", "#1161b1", "#0252a2", "#004898", "#3ede3e", "#2fcf2f", "#20c020", "#11b111", "#02a202", "#009800", "#3ede8e", "#2fcf7f", "#20c070", "#11b161", "#02a252", "#009848", "#3edede", "#2fcfcf", "#20c0c0", "#11b1b1", "#02a2a2", "#009898", "#8e3e3e", "#7f2f2f", "#702020", "#611111", "#520202", "#480000", "#8e3e8e", "#7f2f7f", "#702070", "#611161", "#520252", "#480048", "#8e3ede", "#7f2fcf", "#7020c0", "#6111b1", "#5202a2", "#480098", "#8e8e3e", "#7f7f2f", "#707020", "#616111", "#525202", "#484800", "#8e8e8e", "#7f7f7f", "#707070", "#616161", "#525252", "#484848", "#8e8ede", "#7f7fcf", "#7070c0", "#6161b1", "#5252a2", "#484898", "#8ede3e", "#7fcf2f", "#70c020", "#61b111", "#52a202", "#489800", "#8ede8e", "#7fcf7f", "#70c070", "#61b161", "#52a252", "#489848", "#8edede", "#7fcfcf", "#70c0c0", "#61b1b1", "#52a2a2", "#489898", "#de3e3e", "#cf2f2f", "#c02020", "#b11111", "#a20202", "#980000", "#de3e8e", "#cf2f7f", "#c02070", "#b11161", "#a20252", "#980048", "#de3ede", "#cf2fcf", "#c020c0", "#b111b1", "#a202a2", "#980098", "#de8e3e", "#cf7f2f", "#c07020", "#b16111", "#a25202", "#984800", "#de8e8e", "#cf7f7f", "#c07070", "#b16161", "#a25252", "#984848", "#de8ede", "#cf7fcf", "#c070c0", "#b161b1", "#a252a2", "#984898", "#dede3e", "#cfcf2f", "#c0c020", "#b1b111", "#a2a202", "#989800", "#dede8e", "#cfcf7f", "#c0c070", "#b1b161", "#a2a252", "#989848", "#dedede", "#cfcfcf", "#c0c0c0", "#b1b1b1", "#a2a2a2", "#989898", "#ffffff", "#ffffff", "#FFFFFF", "#f0f0f0", "#e1e1e1", "#d7d7d7", ];
let colorsDivs=window.colors.map((color)=>`<button
           data-v="${color}"
           class="colorSelector"
           style="
             border: none;
             outline: none;
             width: 40px;
             height: 40px;
             background-color: ${color};
             display: inline-block;
           "
         ></button>`);function hideColorPicker(){let popContainers=document.querySelectorAll(`.ppop-color-container`);popContainers.forEach((el)=>(el.style.display="none"));let clickAwayContainer=document.querySelector(`.clickaway-container`);clickAwayContainer.style.display="none";}
function toggleColorPicker(selector){let clickAwayContainer=document.querySelector(`.clickaway-container`);let popContainer=document.querySelector(`.ppop-color-container`);if(clickAwayContainer!=null){if(clickAwayContainer.style.display=="none"){clickAwayContainer.style.display="block";}else{clickAwayContainer.style.display="none";}}
if(popContainer!=null){window.inputSelectorForColorPicker=selector;let element=document.querySelector("button"+selector);if(element!=null){const dem=element.getBoundingClientRect();if(popContainer.style.display=="none"){console.log(popContainer.style);console.log(dem);popContainer.style.position="fixed";popContainer.style.left=`${dem.x-65}px`;popContainer.style.top=`${dem.y+dem.height}px`;console.log(popContainer.style);popContainer.style.display="block";}else{popContainer.style.display="none";}}}}
function setColorPickerButtonBg(value,name){let button=document.querySelector(`.${name}-container .cpick`);if(button!=null){button.style.backgroundColor=value;}}
function listenAndSetToInput(){document.querySelectorAll(`.colorSelector`).forEach((el)=>el.addEventListener("click",()=>{const name=window.inputSelectorForColorPicker;console.log(name);if(name!=undefined){let input=document.querySelector(`input[name=${name.replace(".","")}]`);if(input!=null)input.value=el.dataset["v"];toggleColorPicker(name);setColorPickerButtonBg(el.dataset["v"],name.replace(".",""));}}));}
function modalOverlay(){if(document.querySelector(`.clickaway-container`)==null){const container=document.createElement("div");container.classList=`clickaway-container`;container.addEventListener("click",()=>hideColorPicker());container.setAttribute("style","display: none;width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 6000");document.body.appendChild(container);}}
function setColorPickerTemplate(){if(document.querySelector(".ppop-color-container")==null){const popContainer=document.createElement("div");popContainer.classList="ppop light border break ppop-color-container";popContainer.setAttribute("style","display: none; z-index: 20000");const pop=document.createElement("div");pop.setAttribute("style","width: 260px; height: 200px; line-height: 0px !important");pop.classList="break colors-container";popContainer.appendChild(pop);document.body.appendChild(popContainer);$(".colors-container").append(colorsDivs);}}
setColorPickerTemplate();modalOverlay();listenAndSetToInput();
