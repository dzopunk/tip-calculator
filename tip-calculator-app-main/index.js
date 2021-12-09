const bill = document.querySelector("#bill");
const custom = document.querySelector("#custom");
const people = document.querySelector("#people");
const hiddenMsg = document.querySelector(".hidden-msg");
const reset = document.querySelector("#reset");
const percent = document.querySelector(".percent__options");
const button = document.querySelectorAll(".btn");
const total = document.querySelector(".total__container");

let percentValue;
console.log(people);
/////SUBMIT TOTAL AMOUNT AND TIP
const submit = function (e) {
  if (e.keyCode === 13) {
    total.innerHTML = "";
    const percentSum = (+bill.value * percentValue) / 100;
    const percentPer = Math.round(
      (+bill.value * (percentValue / 100)) / +e.target.value
    );
    const totalSum = (+bill.value + +percentSum) / +e.target.value;
    reset.style.backgroundColor = `var(--strong-cyan)`;
    reset.disabled = false;
    people.blur();
    const html = `
  <div class="total__person">
  <div>
    <h2>Tip Amount</h2>
    <span>/ person</span>
  </div>
  <div class="total__amount">$${percentPer}</div>
</div>
<div id="tip" class="total__person">
  <div>
    <h2>Total</h2>
    <span>/ person</span>
  </div>
  <div id="total" class="total__amount">$${totalSum}</div>
</div>
  `;
    total.insertAdjacentHTML("beforebegin", html);
  }
  if (+e.target.value === 0) {
    reset.disabled = true;
    hiddenMsg.style.visibility = "visible";
    people.style.borderColor = "orange";
  }
};
people.addEventListener("keyup", submit);

/////FIND PERCENTAGE////
percent.addEventListener("click", function (e) {
  e.preventDefault();
  const value = +e.target.getAttribute("data-set");

  //Active button and class or custom
  if (e.target.classList.contains("btn")) {
    e.target.classList.toggle("active");
  } else {
    custom.addEventListener("keyup", function (e) {
      percentValue = +custom.value;
    });
  }
  //Only one active button or custom
  button.forEach((btn) => {
    if (btn !== e.target) {
      btn.classList.remove("active");
      custom.value = "";
    }
  });

  percentValue = value;
});

//////RESET /////
reset.addEventListener("click", function () {
  total.innerHTML = "";
  bill.value = "";
  people.value = "";
  custom.value = "";
  button.forEach((btn) => btn.classList.remove("active"));
  const totalAmount = document.querySelectorAll(".total__amount");
  reset.style.backgroundColor = `var(--dark-grayish-cyan)`;
  reset.disabled = true;
  hiddenMsg.style.visibility = "hidden";

  totalAmount.forEach((person) => {
    person.innerHTML = `$0.00`;
  });
});
