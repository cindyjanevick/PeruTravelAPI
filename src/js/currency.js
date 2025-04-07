document.getElementById("convertCurrency").addEventListener("click", async () => {
  const currency = document.getElementById("currencySelect").value;
  const conversionType = document.getElementById("conversionType").value;
  const amount = parseFloat(document.getElementById("amountInput").value);
  const resultEl = document.getElementById("conversionResult");

  if (isNaN(amount) || amount <= 0) {
    resultEl.textContent = "Please enter a valid amount.";
    return;
  }

  // Determine conversion direction
  let fromCurrency, toCurrency;
  if (conversionType === "toPEN") {
    fromCurrency = currency;
    toCurrency = "PEN";
  } else {
    fromCurrency = "PEN";
    toCurrency = currency;
  }

  const url = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&access_key=be25cfbe9bdf7119c6a34de6cb24e293`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.success && data.result) {
      resultEl.innerHTML = `<strong>${amount} ${fromCurrency}</strong> = <strong>${data.result.toFixed(2)} ${toCurrency}</strong>`;
    } else {
      resultEl.textContent = "Conversion failed. Please try again.";
      console.error("Error:", data);
    }
  } catch (error) {
    resultEl.textContent = "Error fetching data.";
    console.error("Fetch error:", error);
  }
});
