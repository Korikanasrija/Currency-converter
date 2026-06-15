// Grab HTML elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');

// Function to fetch rates and convert
async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Preventive check if amount is empty or negative
    if (amount === "" || amount <= 0) {
        resultText.innerText = "Please enter a valid amount.";
        return;
    }

    resultText.innerText = "Fetching live rates...";

    try {
        // We use a completely free, open-source currency API
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();
        
        // Grab the specific exchange rate for the 'to' currency
        const rate = data.rates[to];
        
        // Calculate total converted amount
        const total = (amount * rate).toFixed(2);

        // Display results to user
        resultText.innerText = `${amount} ${from} = ${total} ${to}`;
        
    } catch (error) {
        // Handle issues like network loss
        resultText.innerText = "Error fetching rates. Try again later.";
        console.error("API error:", error);
    }
}

// Event listener for the button click
convertBtn.addEventListener('click', convertCurrency);

// Run automatically once on page load so it's not empty
window.addEventListener('load', convertCurrency);