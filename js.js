var x, i, j, selElmnt, a, b, c;
/*X kigger i HTML dokumentet efter alle elementer med class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For a, b og c variablerne laver vi en ny DIV som vi kan ændre i CSS vha attributterne:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    /* Her laver vi en funktion som gør at man kan klikke:*/
    c.addEventListener("click", function(e) {

        /*Når man klikker på et item, opdateres den originale select box,
        og den valgte item */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /* Når den valgte box er klikket på, 
      lukker alle andre og åbner/lukker den nuværende box 
      alt efter om det er første eller anden gang man klikker på den */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /* En funktion der gør at alle boxe i dropdown menuen lukker, undtagen den valgte box */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/* Hvis brugeren klikker hvor som helst omkring dropdown menuen, så lukker dropdown menuen */
document.addEventListener("click", closeAllSelect);




/* js til vælg skabelon drop down menu */

var button = document.querySelector('button');
var datalist = document.querySelector('datalist');
var select = document.querySelector('select');
var options = select.options;
var input = document.querySelector('input');



function toggle_ddl() {
  if (datalist.style.display === '') {
    datalist.style.display = 'block';
    this.textContent = "▲";
    
    var val = input.value;
    for (var i = 0; i < options.length; i++) {
      if (options[i].text === val) {
        select.selectedIndex = i;
        break;
      }
    }
  } else hide_select();
}


function hide_select() {
  datalist.style.display = '';
  button.textContent = "▼";
}


function fill_input() {
  input.value = options[this.selectedIndex].value;
  hide_select();
}


button.addEventListener('click', toggle_ddl);
select.addEventListener('change', fill_input);
input.addEventListener('focus', hide_select);
