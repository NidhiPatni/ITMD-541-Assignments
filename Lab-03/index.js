const bill_total = document.querySelector("#bill-total");
const slider = document.querySelector("#tip");
const tip_percentage = document.querySelector("#tip-percentage");
const tip_amount = document.querySelector("#tip-amount");
const total_amount = document.querySelector("#total-bill");

bill_total.addEventListener("change", calculateTip);
slider.addEventListener("input", calculateTip);

function calculateTip() {

    //This will give alert if you enter anything except positive number greater than 0 in bill total field. 
    if (isNaN(bill_total.value) || parseFloat(bill_total.value) <= 0) {
        alert("ENTER A VALID POSITIVE NUMBER");
        return; 
    }

    // Get the Tip Percentage field populated as per Tip Slider
    let tip = document.getElementById("tip").value;
    tip_percentage.value = tip;

    if ((!isNaN(bill_total.value) && bill_total.value.trim() !== "") || parseFloat(bill_total.value) >= 0) 
    {

        // Printing the bill total amount limiting to 2 decimal places
        bill_total.value = parseFloat(bill_total.value).toFixed(2);
        let bill = parseFloat(document.getElementById("bill-total").value);
    
        //Calculate total amount of tip given on bill and limiting to 2 decimal places
        let total_tip = parseFloat(((tip * bill) / 100).toFixed(2));
        tip_amount.value = total_tip;

        // Calculate total bill amount including tip and limiting to 2 decimal places
        total_amount.value = parseFloat(bill + total_tip).toFixed(2);
    } 
    else 
    {
        // Empty the fields if nothing is entered in bill amount
        bill_total.value = "";
        total_amount.value = ""; 
        tip_amount.value = "";
    }
}
