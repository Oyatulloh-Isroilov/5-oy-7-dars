import {
  CarName,
  CarYear,
  CarColor,
  CarPrice,
  addCar,
  nameSelect,
  yearSelect,
  statusSelect,
  table,
  tbody,
  carSearch,
  form,
} from "./letConst.js";

function validate() {
  if (!CarName.value) {
    CarName.style.outlineColor = "red";
    CarName.focus();
    return;
  }

  if (!CarYear.value) {
    CarYear.style.outlineColor = "red";
    CarYear.focus();
    return;
  }

  if (CarYear.value < 1920 || CarYear.value >= new Date().getFullYear + 1) {
    alert("Mashina yilini hato kiritingiz bro");
    CarYear.style.outlineColor = "red";
    CarYear.value = "";
    CarYear.focus();
    return;
  }

  if (!CarColor.value) {
    CarColor.style.outlineColor = "red";
    CarColor.focus();
    return;
  }

  if (!CarPrice.value) {
    CarPrice.style.outlineColor = "red";
    CarPrice.focus();
    return;
  }

  if (CarPrice.value < 120) {
    alert("Mashina narxini to'g'ri kiritingiz");
    CarPrice.style.outlineColor = "red";
    CarPrice.value = "";
    CarPrice.focus();
    return;
  }
}

addCar &&
  addCar.addEventListener("click", function () {
    validate();

    let info = JSON.parse(localStorage.getItem("cars")) || [];

    const car = {
      id: Date.now(),
      name: CarName.value,
      year: CarYear.value,
      color: CarColor.value,
      price: CarPrice.value,
      status: "active",
    };
    info.push(car);
    form.reset();
    localStorage.setItem("cars", JSON.stringify(info));
    let tr = createRow(car, data.length);
    tbody.innerHTML += tr;
  });

function createRow(car, index) {
  let status = "";
  if (car.status == "active") {
    status = "Sotilmagan";
  }
  if (car.status == "inactive") {
    status = "Sotilgan";
  }
  let tr = `
      <tr>
              <td>${index + 1}</td>
              <td>${car.name}</td>
              <td>${car.year}</td>
              <td>${car.color}</td>
              <td>${car.price}</td>
              <td ${status}</td>
              <td id = "tr_${car.id}">
              <span class = 'delete actions'>del</span>
              <span class = "update actions">upd</span>
              </td>
      </tr>
      `;
  return tr;
}

document.addEventListener("DOMContentLoaded", function () {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];

  if (cars.length) {
    let dom = "";
    cars.forEach((car, index) => {
      let tr = createRow(car, index);
      dom += tr;
    });
    tbody.innerHTML += dom;
  }
  let deleteBtns = document.querySelectorAll("td span.delete");
  if (deleteBtns.length) {
    deleteBtns.forEach((button) => {
      button.addEventListener("click", function () {
        console.log(this.parentNode.getAttribute("id").substring(3));
        let confirmMod = confirm("Mashinani rostdan ham o'chirmoqchimisiz");
        if (confirmMod) {
          cars = cars.filter((car) => {
            return elId != car.id;
          });

          localStorage.setItem("cars,", JSON.stringify(cars));
          window.location.reload()

        }
      });
    });
  }
});

nameSelect &&
  nameSelect.addEventListener("change", function () {
    const info = JSON.parse(localStorage.getItem(cars)) || [];
    let filtredInfo = [];
    if (info.length) {
      filtredInfo = info.filter((car) => {
        return car.name == this.value;
      });
    }

    tbody.innerHTML = "";
    let filterDom = "";
    filtredInfo &&
      filtredInfo.forEach(car, (index) => {
        let tr = createRow(car, index);
        filterDom += tr;
      });

    tbody.innerHTML += filterDom;
  });

carSearch &&
  carSearch.addEventListener("input", function () {
    const info = JSON.parse(localStorage.getItem("cars")) || [];
    if (!this.value || this.value.length < 1) {
      tbody.innerHTML = "";
      let findAll = "";
      info.forEach((car, index) => {
        let tr = createRow(car, index);
        findAll += tr;
      });
      tbody.innerHTML += findAll;
    }

    if (this.value.length >= 2) {
      let searched = [];
      if (info.length) {
        searched = info.filter((car) => {
          return car.name.toLowerCase().includes(this.value.toLowerCase());
        });
      }

      if (searched.length) {
        tbody.innerHTML = "";
        let fakeSearched = "";
        searched.forEach((car, index) => {
          let tr = createRow(car, index);
          fakeSearched += tr;
        });
        tbody.innerHTML += fakeSearched;
      }
    }
  });
