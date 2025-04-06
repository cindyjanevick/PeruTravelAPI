// Currency
document.getElementById('convert').addEventListener('click', async () => {
  const from = document.getElementById('currencyFrom').value;
  const result = document.getElementById('currencyResult');

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();

    const rate = data.rates['PEN'];
    result.innerHTML = `1 ${from} = ${rate.toFixed(2)} PEN`;
  } catch (error) {
    result.innerHTML = 'Error fetching exchange rate.';
  }
});