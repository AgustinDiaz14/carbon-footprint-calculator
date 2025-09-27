function calculateCarbonImpact(kmCar, flights, kWh) {
    const car = kmCar * 0.21;
    const flight = flights * 250;
    const electricity = kWh * 0.4;
    return car + flight + electricity;
}

document.getElementById('carbonForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const kmCar = parseFloat(document.getElementById('kmCar').value) || 0;
    const flights = parseFloat(document.getElementById('flights').value) || 0;
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    
    const result = calculateCarbonImpact(kmCar, flights, electricity);
    
    const resultDiv = document.getElementById('result');
    const resultValue = document.getElementById('resultValue');
    
    resultValue.textContent = `${result.toFixed(2)} kg CO2`;
    
    resultDiv.classList.remove('hidden');
    setTimeout(() => {
        resultDiv.classList.remove('opacity-0');
        resultDiv.classList.add('opacity-100');
    }, 10);
});