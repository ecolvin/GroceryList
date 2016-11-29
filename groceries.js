var myList = [];

function addItem()
{
  var input = document.getElementById("newItem").value;
  addItemParam(input);
}

function addItemParam(input)
{
  if(myList.indexOf(input) == -1)
  {
    myList.push(input);
    console.log(myList);
    var list = document.getElementById("listDisplay");
    var item = document.createElement("li");
    var btnClose = document.createElement("button");
    btnClose.classList.add("btn");
    btnClose.classList.add("btn-danger");
    btnClose.classList.add("btn-xs");
    var iconClose = document.createElement("span");
    iconClose.classList.add("glyphicon");
    iconClose.classList.add("glyphicon-remove");
    var itemName = document.createTextNode(input);
    item.appendChild(itemName);
    btnClose.appendChild(iconClose);
    btnClose.addEventListener("click", removeParentListItem);
    item.appendChild(btnClose);
    list.appendChild(item);
  }
  document.getElementById("newItem").value = "";
}

function removeParentListItem()
{
  var mom = this.parentNode;
  itemRemove = mom.firstChild.textContent;
  itemIndex = myList.indexOf(itemRemove);
  myList.splice(itemIndex, 1);
  console.log(myList);
  var grandma = mom.parentNode;
  grandma.removeChild(mom);
}

function saveList()
{
  var listString = myList.toString();
  setCookie("list", listString, 7);
}

function openList()
{
  var list = getCookie("list");
  while(list.indexOf(",") != -1)
  {
    var item = list.substring(0, list.indexOf(","));
    list = list.substring(list.indexOf(",") + 1, list.length);
    addItemParam(item);
  }
  if(list != "")
  {
    addItemParam(list);
  }
}

function clearList()
{
  var list = document.getElementById("listDisplay");
  var length = document.getElementById("listDisplay").childNodes.length;
  for(var i = length - 1; i >= 0; i--)
  {
    list.removeChild(list.childNodes[i]);
  }
  myList = [];
}

//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//courtesy of w3schools, from: http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
