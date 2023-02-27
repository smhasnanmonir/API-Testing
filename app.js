const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data.data, dataLimit);
};

const displayPhone = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  const noPhone = document.getElementById("empty-item");
  const showAll = document.getElementById("btn-showAll");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card">
      <img src=${phone.image} class="card-img-top p-4 w-50 flex align-items-center align-self-center" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button class="btn btn-primary">Show Details</button>
      </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("searchField");
  const searchValue = searchField.value;
  loadPhones(searchValue, dataLimit);
};

document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

document.getElementById("btn-showAll").addEventListener("click", function () {
  processSearch();
});
