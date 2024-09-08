const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const msg = document.querySelector(".msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const dropdown = document.querySelectorAll(".dropdown select")


for (let select of dropdown) {
    for (country in countryList) {
        // console.log(country);
        let newOption = document.createElement("option");
        newOption.innerHTML = country;
        newOption.value = country;

        if (select.name === 'from' && country === 'USD') {
            newOption.selected = "selected";
        }
        else if (select.name === 'to' && country === 'INR') {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

const exchangeRates = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amtVal.value = "1";
    }

    const urll = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(urll);
    let data = await response.json()
    console.log(data);

    let rate = data.fromCurr[toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;

    msg.innerHTML = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", evt => {
    evt.preventDefault()
    exchangeRates();
});

window.addEventListener("load", () => {
    exchangeRates();
});