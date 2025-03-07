// Selecting Elements
const itemInputEl = document.getElementById("item");
const quantityInputEl = document.getElementById("quantity");
const shoppingListDisplayEl = document.getElementById("shopping-list-display");
const shoppingBasketInputEl = document.getElementById("shopping-basket");
const itemsStillToBuyDisplayEl = document.getElementById(
  "items-still-to-buy-display"
);

//shoppingList is an array [] of objects { item, quantity }​

const shoppingList = [];

function addItem(event) {
  //Prevent the default behaviour of our button (which is to submit the form and refresh the page)​
  event.preventDefault();

  //Create an Object and then add the object into shoppingList array​
  const itemToAdd = {
    item: itemInputEl.value,
    quantity: quantityInputEl.value,
  };

  shoppingList.push(itemToAdd);
  console.log(shoppingList);
  itemInputEl.value = "";
  quantityInputEl.value = "";

  displayListItems();
}

function displayListItems() {
  //clear the display​
  shoppingListDisplayEl.innerHTML = "";

  //for each item in the shoppingList array, display item, quantity, and a delete button​
  for (const groceryItem of shoppingList) {
    //update the HTML to what is currently rendered, plus a new string​
    shoppingListDisplayEl.innerHTML += `<div><div>${groceryItem.item} x ${
      groceryItem.quantity
    } </div><span onclick="deleteItem(${shoppingList.indexOf(
      groceryItem
    )})" style="cursor:pointer"> &#10062 </span></div>`;
  }
}

function deleteItem(itemToDelete) {
  //delete the item use splice method​
  shoppingList.splice(itemToDelete, 1);
  displayListItems();
}

function addToBasket(event) {
  event.preventDefault();

  //split() splits the inputted form data by commas, and returns a new array
  const basket = shoppingBasketInputEl.value.toLowerCase().split(/,\s*/);

  const itemsStillToBuy = shoppingList.filter(function (groceryItem) {
    return !basket.includes(groceryItem.item.toLowerCase());
  });
  console.log(itemsStillToBuy);

  if (itemsStillToBuy.length === 0) {
    itemsStillToBuyDisplayEl.innerHTML =
      "<p>Congrats! You are done shopping 🛍️ ➡️ 🏠: </p>";
  } else {
    itemsStillToBuyDisplayEl.innerHTML =
      "<p>Here are the items you still need to get:</p>";

    itemsStillToBuy.forEach(function (groceryItem) {
      itemsStillToBuyDisplayEl.innerHTML += `<p>${groceryItem.item} x ${groceryItem.quantity}</p>`;
    });
  }
}
