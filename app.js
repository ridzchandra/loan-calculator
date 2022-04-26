// DEFINE UI vars
const loanForm = document.querySelector("#loan-form");
const results = document.querySelector("#results");
const card = document.querySelector(".card");
const heading = document.querySelector(".heading");




// LOAD event listeners
loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", hideResults);
    loanForm.addEventListener("submit", calculate);
}

// hideResults ... Hides results section until calculate is hit
function hideResults(e) {
    results.style.display = "none";
}


//calculate ... Calculates and displays the results
function calculate(e) {
    e.preventDefault();

    hideResults();

    const UIamount = document.querySelector("#amount");
    const UIinterestRate = document.querySelector("#interest");
    const UIyears = document.querySelector("#years");

    const UImonthlyPayment = document.querySelector("#monthly-payment");
    const UItotalPayment = document.querySelector("#total-payment");
    const UItotalInterest = document.querySelector("#total-interest");
    

    const principal = parseFloat(UIamount.value);
    const monthlyInterestRate = parseFloat(UIinterestRate.value) * 0.01 / 12;
    const numberOfMonths = parseFloat(UIyears.value) * 12;

    const monthlyPayment = ((principal * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate),-numberOfMonths))).toFixed(2);    

    if(!isFinite(monthlyPayment)) {
        showAlert("Please check the values entered!");
        return;
    }

    const totalPayment = (monthlyPayment * numberOfMonths).toFixed(2);
    const totalInterest = (totalPayment - principal).toFixed(2);

    
    UImonthlyPayment.value = monthlyPayment;
    UItotalPayment.value = totalPayment;
    UItotalInterest.value = totalInterest;
    
    // show the spinner for two seconds and then show the results
    const loadingGif = document.createElement("img");
    loadingGif.id = "loading-gif";
    loadingGif.setAttribute("src", "img/loading.gif");
    loadingGif.style.display = "block";
    card.insertBefore(loadingGif, loanForm.nextSibling);

    
    
    setTimeout(function () {
        loadingGif.style.display = "none";
        results.style.display = "block";
    }, 2000);

}

function showAlert(warningMessage) {
    const alertBox = document.createElement("div");
    alertBox.className = "alert alert-warning";
    alertBox.appendChild(document.createTextNode(warningMessage));
    card.insertBefore(alertBox, heading);

    setTimeout(function() {
        alertBox.remove();
    }, 3000); // execute the function in 3000 milliseconds
}