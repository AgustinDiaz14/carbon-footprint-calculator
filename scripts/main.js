let currentCategory = 'car';
let hideTimeout;

function calculateCarbonImpact(kmCar, flights, kWh) {
    const car = kmCar * 0.21;
    const flight = flights * 250;
    const electricity = kWh * 0.4;
    return car + flight + electricity;
}

function hideResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('opacity-0');
    setTimeout(() => {
        resultDiv.classList.add('hidden');
    }, 500);
}

function switchTab(category) {
    // Hide result when switching tabs
    hideResult();
    
    // Update tab styles
    document.querySelectorAll('[id$="Tab"]').forEach(tab => {
        tab.classList.remove('bg-green-600', 'text-white');
        tab.classList.add('text-gray-600', 'dark:text-gray-300');
    });
    document.getElementById(category + 'Tab').classList.add('bg-green-600', 'text-white');
    document.getElementById(category + 'Tab').classList.remove('text-gray-600', 'dark:text-gray-300');
    
    // Show/hide sections
    document.querySelectorAll('.category-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(category + 'Section').classList.remove('hidden');
    
    currentCategory = category;
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    document.getElementById('themeToggle').innerHTML = `<span class="text-2xl">${isDark ? '☀️' : '🌙'}</span>`;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function saveToHistory(category, value, result) {
    const history = JSON.parse(localStorage.getItem('carbonHistory') || '[]');
    const entry = {
        date: new Date().toLocaleString(),
        category,
        value,
        result: result.toFixed(2)
    };
    history.unshift(entry);
    if (history.length > 10) history.pop();
    localStorage.setItem('carbonHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem('carbonHistory') || '[]');
    const historyDiv = document.getElementById('history');
    const clearBtn = document.getElementById('clearHistory');
    
    if (history.length === 0) {
        historyDiv.innerHTML = '<p class="text-gray-500 text-sm">No calculations yet</p>';
        clearBtn.classList.add('hidden');
    } else {
        historyDiv.innerHTML = history.map(entry => {
            const icon = entry.category === 'car' ? '🚗' : entry.category === 'flight' ? '✈️' : '⚡';
            return `<div class="text-sm p-2 bg-green-50 dark:bg-gray-700 rounded border border-green-100 dark:border-gray-600">
                <div class="font-medium text-gray-800 dark:text-gray-200">${icon} ${entry.category}: ${entry.result} kg CO2</div>
                <div class="text-gray-500 dark:text-gray-400 text-xs">${entry.date}</div>
            </div>`;
        }).join('');
        clearBtn.classList.remove('hidden');
    }
}

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Tab event listeners
document.getElementById('carTab').addEventListener('click', () => switchTab('car'));
document.getElementById('flightTab').addEventListener('click', () => switchTab('flight'));
document.getElementById('electricityTab').addEventListener('click', () => switchTab('electricity'));

// Form submission
document.getElementById('carbonForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let result = 0;
    let value = 0;
    
    if (currentCategory === 'car') {
        value = parseFloat(document.getElementById('kmCar').value) || 0;
        result = calculateCarbonImpact(value, 0, 0);
    } else if (currentCategory === 'flight') {
        value = parseFloat(document.getElementById('flights').value) || 0;
        result = calculateCarbonImpact(0, value, 0);
    } else if (currentCategory === 'electricity') {
        value = parseFloat(document.getElementById('electricity').value) || 0;
        result = calculateCarbonImpact(0, 0, value);
    }
    
    const resultDiv = document.getElementById('result');
    const resultValue = document.getElementById('resultValue');
    
    resultValue.textContent = `${result.toFixed(2)} kg CO2`;
    
    resultDiv.classList.remove('hidden');
    setTimeout(() => {
        resultDiv.classList.remove('opacity-0');
        resultDiv.classList.add('opacity-100');
    }, 10);
    
    // Clear existing timeout and set new one
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(hideResult, 10000);
    
    saveToHistory(currentCategory, value, result);
});

// Clear history
document.getElementById('clearHistory').addEventListener('click', function() {
    localStorage.removeItem('carbonHistory');
    displayHistory();
});

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    document.getElementById('themeToggle').innerHTML = '<span class="text-2xl">☀️</span>';
}

// Initialize
displayHistory();