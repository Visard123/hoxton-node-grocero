import "./style.css";

type StoreItem = {
  id: number;
  name: string;
  price: number;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const state: State = {
  items: [
    {
      id: 1,
      name: "beetroot",
      price: 0.35,
    },
    {
      id: 2,
      name: "carrot",
      price: 0.35,
    },
    {
      id: 3,
      name: "apple",
      price: 0.35,
    },
    {
      id: 4,
      name: "apricot",
      price: 0.35,
    },
    {
      id: 5,
      name: "avocado",
      price: 0.35,
    },
    {
      id: 6,
      name: "bananas",
      price: 0.35,
    },
    {
      id: 7,
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: 8,
      name: "berry",
      price: 0.35,
    },
    {
      id: 9,
      name: "blueberry",
      price: 0.35,
    },
    {
      id: 10,
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
};

function getFileName(item: StoreItem) {
  const fileName = `${item.id
    .toString()
    .padStart(3, "0")}-${item.name.replaceAll(" ", "-")}`;

  return `assets/icons/${fileName}.svg`;
}

/* STATE ACTIONS */

function addItemToCart(itemId: number): void {
  const existingItem: CartItem | undefined = state.cart.find(
    (item: CartItem) => item.id == itemId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const itemToAdd: StoreItem | undefined = state.items.find(
      (item: StoreItem) => item.id == itemId
    );

    state.cart.push({ ...itemToAdd, quantity: 1 });
  }

  renderCartItems();
}

function removeItemFromCart(itemID: number) {
  const itemToUpdate: CartItem | undefined = state.cart.find(
    (item: CartItem) => item.id == itemID
  );

  if (itemToUpdate && itemToUpdate.quantity > 1) {
    itemToUpdate.quantity -= 1;
  } else {
    state.cart = state.cart.filter((item: CartItem) => item.id != itemID);
  }

  renderCartItems();
}

/* RENDER THE STORE */

const storeItemList = document.querySelector(".store--item-list");

function renderStoreItem(item: StoreItem): void {
  const listItemEl = document.createElement("li");

  listItemEl.innerHTML = `
    <div class="store--item-icon">
      <img src=${getFileName(item)} alt="${item.name}">
    </div>
    <button>Add to cart</button>
  `;

  const addBtn: Button | null = listItemEl.querySelector("button");
  addBtn.addEventListener("click", () => addItemToCart(item.id));

  if (storeItemList) storeItemList.appendChild(listItemEl);
}

function renderStoreItems(): void {
  state.items.forEach(renderStoreItem);
}

renderStoreItems();

/* RENDER THE CART */

const cartItemList: HTMLElement | null =
  document.querySelector(".cart--item-list");

function renderCartItem(item: CartItem): void {
  const listItemEl = document.createElement("li");

  listItemEl.innerHTML = `
    <img class="cart--item-icon" src=${getFileName(item)} alt="${item.name}">
    <p>${item.name}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">${item.quantity}</span>
    <button class="quantity-btn add-btn center">+</button>
  `;

  const addBtn: Button | null = listItemEl.querySelector(".add-btn");
  addBtn.addEventListener("click", (event: Event) => addItemToCart(item.id));

  const removeBtn: Button | null = listItemEl.querySelector(".remove-btn");
  removeBtn.addEventListener("click", (event: Event) =>
    removeItemFromCart(item.id)
  );

  if (cartItemList) cartItemList.appendChild(listItemEl);
}

function renderCartItems(): void {
  if (cartItemList) cartItemList.innerHTML = "";

  state.cart.forEach(renderCartItem);

  renderTotal();
}

/* RENDER THE TOTAL */

const totalNumber: HTMLSpanElement | null =
  document.querySelector(".total-number");

function renderTotal() {
  let total = 0;

  state.cart.forEach((item: CartItem) => (total += item.quantity * item.price));

  if (totalNumber) totalNumber.innerText = `£${total.toFixed(2)}`;
}
