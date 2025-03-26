// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let bombRadius = 40; // Set a reasonable size for the emoji
let catcherWidth = 50;
let catcherHeight = 20;
let bombX = Math.random() * (canvas.width - bombRadius);
let bombY = 0;
let catcherX = canvas.width / 2 - catcherWidth / 2;
let speed = 2; // Bomb falling speed (initial difficulty)
let catchSpeed = 5; // Catcher speed
let score = 0; // Starting score
let gameOver = false; // Flag for game over

// Mobile button events for moving the paddle (left or right)
let rightPressed = false;
let leftPressed = false;

// Function to start moving right
function startRight() {
    rightPressed = true;
    leftPressed = false; // Stop left movement if right is pressed
}

// Function to stop moving right
function stopRight() {
    rightPressed = false;
}

// Function to start moving left
function startLeft() {
    leftPressed = true;
    rightPressed = false; // Stop right movement if left is pressed
}

// Function to stop moving left
function stopLeft() {
    leftPressed = false;
}

// Function to add event listeners to buttons
function addButtonEvents(button, startHandler, stopHandler) {
    button.addEventListener('touchstart', (e) => {
        startHandler();
        addActiveClass(button);
    }, { passive: false });
    button.addEventListener('touchend', (e) => {
        stopHandler();
        removeActiveClass(button);
    });
    button.addEventListener('mousedown', (e) => {
        startHandler();
        addActiveClass(button);
    });
    button.addEventListener('mouseup', (e) => {
        stopHandler();
        removeActiveClass(button);
    });
}

// Add visual press feedback
function addActiveClass(button) {
    button.classList.add('active');
}

function removeActiveClass(button) {
    button.classList.remove('active');
}

// Get buttons and attach events
const rightBtn = document.getElementById('rightBtn');
const leftBtn = document.getElementById('leftBtn');

addButtonEvents(rightBtn, startRight, stopRight);
addButtonEvents(leftBtn, startLeft, stopLeft);

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = 'media/war2.png'; // Replace with your image path

// Function to draw the custom background
function drawBackground() {
    // Ensure the background is drawn to fit the entire canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

// Function to draw the catcher (paddle)
function drawCatcher() {
    ctx.beginPath();
    ctx.rect(catcherX, canvas.height - catcherHeight, catcherWidth, catcherHeight);
    ctx.fillStyle = "#ff7f50"; // Orange color
    ctx.fill();
    ctx.closePath();
}

// Function to draw the bomb (using the bomb emoji)
function drawBomb() {
    const bombSize = 40; // Set the size of the bomb emoji
    const bombText = "💣"; // The bomb emoji itself

    // Set the font size and style for the emoji
    ctx.font = `${bombSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw the bomb emoji at the specified position
    ctx.fillText(bombText, bombX, bombY);
}

// Add an audio element for the catch sound
const catchSound = new Audio('media/coin.mp3'); // Replace with the path to your audio file

// Function to draw the scoreboard at the top of the canvas
function drawScore() {
    const scoreFontSize = 20; // Set a small font size for the score
    ctx.font = `${scoreFontSize}px Arial`;
    ctx.fillStyle = '#ffffff'; // White color for the score
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 10); // Draw score at the top center
}

// Function to update the game
function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background image
    drawBackground();

    // Draw the scoreboard at the top
    drawScore();

    // Draw the bomb
    drawBomb();
    bombY += speed; // Bomb falling speed

    // Adjust check for the bomb's bottom edge
    if (bombY + bombRadius >= canvas.height) { // Bomb bottom edge hits the canvas height
        if (bombX > catcherX && bombX < catcherX + catcherWidth) {
            // Bomb caught! Increase score
            score++;
            // Play the catch sound
            catchSound.play(); // Play the audio when the bomb is caught
        } else {
            // Bomb missed, game over
            showGameOver();
            return; // Stop the game if missed
        }

        // Reset bomb position after a catch or miss
        bombY = 0;
        bombX = Math.random() * (canvas.width - bombRadius);

        // Slight increase in speed every 5 catches
        if (score % 5 === 0) {
            speed += 0.5; // Increase bomb falling speed slightly
        }
    }

    // Move the catcher (paddle) based on button press
    if (rightPressed && catcherX < canvas.width - catcherWidth) {
        catcherX += catchSpeed;
    } else if (leftPressed && catcherX > 0) {
        catcherX -= catchSpeed;
    }

    // Draw the catcher (paddle)
    drawCatcher();

    // Request next frame if game is not over
    if (!gameOver) {
        requestAnimationFrame(update);
    }
}

// Function to show the Game Over screen
function showGameOver() {
    gameOverScreen.style.display = 'block'; // Show Game Over screen
    gameOver = true; // Stop the game loop
}

// Function to restart the game
function restartGame() {
    gameOver = false;
    score = 0;
    bombY = 0;
    bombX = Math.random() * (canvas.width - bombRadius);
    speed = 2; // Reset the difficulty speed to the initial value
    gameOverScreen.style.display = 'none'; // Hide the game over screen
    update(); // Restart the game loop
}

// Add event listener for the restart button
document.querySelector('#gameOverScreen button').addEventListener('click', () => {
    restartGame(); // Call restart function without preventing default behavior
});

// Make sure to start the game loop after the background image is loaded
backgroundImage.onload = function() {
    update(); // Start game loop once the background image is ready
};
