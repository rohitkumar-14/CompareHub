const products = [
  {
    id: 1,
    name: "Galaxy S21",
    brand: "Samsung",
    image:
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s21-5g-1.jpg",
    price: "$799",
    features: {
      battery: "4000mAh",
      screen: "6.2 inch",
      camera: "12MP",
    },
  },
  {
    id: 2,
    name: "iPhone 13",
    brand: "Apple",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935",
    price: "$999",
    features: {
      battery: "3240mAh",
      screen: "6.1 inch",
      camera: "12MP",
    },
  },
  {
    id: 3,
    name: "Pixel 6",
    brand: "Google",
    image: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-1.jpg",
    price: "$699",
    features: {
      battery: "4614mAh",
      screen: "6.4 inch",
      camera: "50MP",
    },
  },
  {
    id: 4,
    name: "OnePlus 9",
    brand: "OnePlus",
    image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-9-1.jpg",
    price: "$729",
    features: {
      battery: "4500mAh",
      screen: "6.55 inch",
      camera: "48MP",
    },
  },
  {
    id: 5,
    name: "Moto G Power",
    brand: "Motorola",
    image:
      "https://p4-ofp.static.pub//fes/cms/2025/02/04/g5a12btk2ovpub3d354lxbatsq5r4h913849.png",
    price: "$249",
    features: { battery: "5000mAh", screen: "6.6 inch", camera: "48MP" },
  },
  {
    id: 6,
    name: "Xperia 5 III",
    brand: "Sony",
    image:
      "https://cdn.beebom.com/mobile/2024/05/Untitled-design-2024-05-31T111138.807.png",
    price: "$999",
    features: { battery: "4500mAh", screen: "6.1 inch", camera: "12MP" },
  },
];
let compareList = JSON.parse(localStorage.getItem("compareList")) || [];

function renderProducts() {
  $("#product-list").empty();
  products.forEach((p) => {
    $("#product-list").append(`
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <p>Brand: ${p.brand}</p>
          <p>Price: ${p.price}</p>
          <ul class="features">
            <li>${p.features.battery}</li>
            <li>${p.features.screen}</li>
            <li>${p.features.camera}</li>
          </ul>
          <button class="compare-btn" onclick="addToCompare(${p.id})">
  <i class="fas fa-balance-scale"></i> Compare
</button>
        </div>
      `);
  });
}

function addToCompare(id) {
  if (compareList.includes(id) || compareList.length >= 3) return;
  compareList.push(id);
  localStorage.setItem("compareList", JSON.stringify(compareList));
  renderComparison();
}

function removeFromCompare(id) {
  compareList = compareList.filter((pid) => pid !== id);
  localStorage.setItem("compareList", JSON.stringify(compareList));
  renderComparison();
}

function clearComparison() {
  compareList = [];
  localStorage.removeItem("compareList");
  renderComparison();
}

function renderComparison() {
  if (compareList.length < 2) {
    $("#comparison").hide();
    return;
  }

  $("#comparison").show();
  const selected = products.filter((p) => compareList.includes(p.id));
  const keys = ["price", "battery", "screen", "camera"];

  const diffs = {};
  keys.forEach((key) => {
    const values = selected.map((p) => p.features[key]);
    diffs[key] = [...new Set(values)].length > 1;
  });

  $("#compare-table").empty();
  selected.forEach((p) => {
    $("#compare-table").append(`
        <div class="compare-card product-card">
         <ul class="compare-features">
         <li><h3>${p.name}</h3></li>
         <li>Brand: ${p.brand}</li>
         <li>Price: <span class="${diffs.price ? "different" : ""}">${
      p.price
    }</span></li>
         <li>Battery: <span class="${diffs.battery ? "different" : ""}"> ${
      p.features.battery
    }</span></li>
         <li>Screen: <span class="${diffs.screen ? "different" : ""}"> ${
      p.features.screen
    }</span></li>
         <li>Camera: <span class="${diffs.camera ? "different" : ""}"> ${
      p.features.camera
    }</span></li>
         
         </ul>
         <button class="compare-btn" onclick="removeFromCompare(${
           p.id
         })">Remove</button>
        </div>
      `);
  });
}

$("#clear-comparison").click(clearComparison);

$("#toggle-mode").click(() => {
  $("body").toggleClass("dark light");

  const icon = $("body").hasClass("dark") ? "fa-sun" : "fa-moon";
  $("#toggle-mode i").removeClass("fa-sun fa-moon").addClass(icon);
});

$("#menu-toggle").click(() => {
  $("#navbar-links").toggleClass("active");
});

renderProducts();
renderComparison();
