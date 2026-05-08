// Toggle Menu
document.getElementById('menuToggle').onclick = function() {
    var links = document.getElementById('navLinks');
    if (links.style.display === 'flex') {
        links.style.display = 'none';
    } else {
        links.style.display = 'flex';
    }
};

// Open Login
document.getElementById('recordBtn').onclick = function() {
    document.getElementById('loginModal').style.display = 'flex';
};

// Login Logic
function checkLogin() {
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    if (user !== "" && pass !== "") {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('recordSection').style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        alert("Enter details");
    }
}

// Timetable Logic
function addToTimetable() {
    var input = document.getElementById('workoutInput');
    var list = document.getElementById('timetable');
    if (input.value !== "") {
        var p = document.createElement('p');
        p.innerText = "- " + input.value;
        list.appendChild(p);
        input.value = "";
    }
}
// Function to show the payment modal
// Note: Ensure your Payment Icon in the Nav has: onclick="openPayment()"
function openPayment() {
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePayment() {
    document.getElementById('paymentModal').style.display = 'none';
}

function selectPlan(name, price) {
    alert("Excellent Choice! You've selected the " + name + " Plan (" + price + "). Proceeding to Secure Checkout...");
    closePayment();
}

// Update the Nav click event for the Payment icon
document.addEventListener('DOMContentLoaded', () => {
    const paymentLink = document.querySelector('a[title="Payment"]');
    if(paymentLink) {
        paymentLink.onclick = (e) => {
            e.preventDefault();
            openPayment();
        };
    }
});
// Add this to script.js
function openPayment() {
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePayment() {
    document.getElementById('paymentModal').style.display = 'none';
}
function checkLogin() {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    if (user.trim() !== "" && pass.trim() !== "") {
        // Save the username to use on the next page
        localStorage.setItem("gymUserName", user);

        // Decide which page to go to
        if (user.toLowerCase().includes("elite")) {
            window.location.href = "elite.html";
        } else {
            window.location.href = "basic.html";
        }
    } else {
        alert("Please enter credentials");
    }
}

// Logic to show name on page load
window.onload = function() {
    const savedName = localStorage.getItem("gymUserName");
    const welcomeHeading = document.getElementById('eliteWelcome');
    if (welcomeHeading && savedName) {
        welcomeHeading.innerText = "Welcome, " + savedName;
    }
};
// Default 5-Day Pro Guide Data
const proPlan = [
    { day: "Monday", workout: "Chest & Shoulders", time: "07:00 AM (60 min)" },
    { day: "Tuesday", workout: "Back & Biceps", time: "07:00 AM (60 min)" },
    { day: "Wednesday", workout: "Rest / Cardio", time: "30 min Walk" },
    { day: "Thursday", workout: "Legs & Abs", time: "06:30 AM (75 min)" },
    { day: "Friday", workout: "Triceps & Forearms", time: "07:00 AM (60 min)" }
];

// Function to load the table
function displayTimetable() {
    const tbody = document.getElementById('timetableBody');
    if(!tbody) return; // Safety check
    
    tbody.innerHTML = ""; // Clear existing rows

    proPlan.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.day}</td>
                <td>${item.workout}</td>
                <td>${item.time}</td>
                <td><button class="delete-btn" onclick="deleteRow(${index})">Remove</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Function to delete a row
function deleteRow(index) {
    proPlan.splice(index, 1);
    displayTimetable();
}

// Function to add a user-created row
function addUserRow() {
    const day = document.getElementById('customDay').value;
    const workout = document.getElementById('customWorkout').value;
    const time = document.getElementById('customTime').value;

    if (day && workout && time) {
        proPlan.push({ day, workout, time });
        displayTimetable();
        
        // Clear inputs
        document.getElementById('customDay').value = "";
        document.getElementById('customWorkout').value = "";
        document.getElementById('customTime').value = "";
    } else {
        alert("Please fill in all fields!");
    }
}

// Initialize the table when the page loads
window.addEventListener('DOMContentLoaded', displayTimetable);
// --- ELITE PAGE LOGIC ---

let startTime;
let timerInterval;
let workoutHistory = JSON.parse(localStorage.getItem('gymHistory')) || [];

// 1. TIMER: Start
function startTimer() {
    console.log("Start Button Clicked");
    if (timerInterval) clearInterval(timerInterval); // Reset if already running
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

// 2. TIMER: Update
function updateTimer() {
    const diff = Date.now() - startTime;
    const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
    const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    
    const display = document.getElementById('timerDisplay');
    if (display) {
        display.innerText = h + ":" + m + ":" + s;
    }
}

// 3. TIMER: Stop & Record
function stopTimer() {
    console.log("Stop Button Clicked");
    if (!timerInterval) return;
    clearInterval(timerInterval);
    
    const finalTime = document.getElementById('timerDisplay').innerText;
    const record = "Session: " + new Date().toLocaleDateString() + " | Time: " + finalTime;
    
    workoutHistory.push(record);
    localStorage.setItem('gymHistory', JSON.stringify(workoutHistory));
    
    alert("Workout Saved! Total time: " + finalTime);
    timerInterval = null;
}

// 4. HISTORY: Show Records
function showHistory() {
    if (workoutHistory.length === 0) {
        alert("No records yet. Time to hit the gym!");
    } else {
        alert("ACHIEVED EXERCISES:\n\n" + workoutHistory.join("\n"));
    }
}
function selectPlan(planName, price) {
    // 1. Save the details so payment.html knows what was picked
    localStorage.setItem('selectedPlan', planName);
    localStorage.setItem('selectedPrice', price);

    // 2. Perform the redirect
    window.location.href = "payment.html";
}
function handleSignup(event) {
    event.preventDefault();
    
    // Save the user's name
    const name = document.getElementById('userName').value;
    localStorage.setItem('gymUserName', name);

    // Redirect to Home but add "#pay" at the end
    window.location.href = "index.html#pay";
}
window.onload = function() {
    // Check if the URL ends with #pay
    if (window.location.hash === "#pay") {
        openPayment(); // This calls your existing function to show the modal
    }
    
    // Optional: Greet the user if they just signed up
    const savedName = localStorage.getItem('gymUserName');
    if (savedName && window.location.hash === "#pay") {
        console.log("Welcome, " + savedName);
    }
};
function checkLogin() {
    // Your existing login logic here...
    
    // After successful login:
    document.getElementById('loginModal').style.display = 'none'; // Close login
    openPayment(); // Immediately open the payment choice
}