// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeMusic();
    initializeSlides();
    initializeStats();
    initializeGames();
});

// Music System
function initializeMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicFiles = ['assets/music01.mp3', 'assets/music02.mp3', 'assets/music03.mp3'];
    
    // Select random music file
    const randomMusic = musicFiles[Math.floor(Math.random() * musicFiles.length)];
    music.src = randomMusic;
    
    // Try to play music (may require user interaction)
    musicToggle.addEventListener('click', function() {
        if (music.paused) {
            music.play().catch(e => {
                console.log('Audio play failed:', e);
                alert('Click anywhere on the page first to enable audio, then click the music icon.');
            });
            musicToggle.textContent = 'music_off';
        } else {
            music.pause();
            musicToggle.textContent = 'music_note';
        }
    });
    
    // Enable audio on first user interaction
    document.body.addEventListener('click', function() {
        if (music.paused) {
            music.play().then(() => {
                music.pause(); // Auto-pause after initial play
            }).catch(e => console.log('Auto-play not allowed'));
        }
    }, { once: true });
}

// Slide System
function initializeSlides() {
    const slides = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('.nav-link');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show selected slide
        slides[index].classList.add('active');
        navLinks[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const slideIndex = parseInt(link.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });
    
    // Indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const slideIndex = parseInt(indicator.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });
    
    // Previous/Next buttons
    prevBtn.addEventListener('click', () => {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) newIndex = slides.length - 1;
        showSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) newIndex = 0;
        showSlide(newIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });
}

// Animated Statistics
function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Games System
function initializeGames() {
    // Prize Pool Modal
    const prizeModal = document.getElementById('prizeModal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', () => {
        prizeModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === prizeModal) {
            prizeModal.style.display = 'none';
        }
    });
}

// Quiz Game
function startQuiz() {
    const questions = [
        {
            question: "What programming language is commonly used for game development?",
            options: ["Python", "C++", "HTML", "CSS"],
            answer: 1
        },
        {
            question: "What does 'FPS' stand for in gaming?",
            options: ["Frames Per Second", "First Person Shooter", "Both A and B", "None of the above"],
            answer: 2
        },
        {
            question: "Which company developed the Unity game engine?",
            options: ["Unity Technologies", "Epic Games", "Microsoft", "Google"],
            answer: 0
        }
    ];
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const output = document.getElementById('quizOutput');
    
    let html = `
        <h4>Quick Quiz</h4>
        <p><strong>${randomQuestion.question}</strong></p>
        <div class="quiz-options">
    `;
    
    randomQuestion.options.forEach((option, index) => {
        html += `<button class="quiz-option" onclick="checkAnswer(${index}, ${randomQuestion.answer})">${option}</button>`;
    });
    
    html += `</div><div id="quizResult"></div>`;
    output.innerHTML = html;
    output.classList.add('active');
}

function checkAnswer(selected, correct) {
    const result = document.getElementById('quizResult');
    if (selected === correct) {
        result.innerHTML = '<p style="color: #00ff00;">✓ Correct! Well done!</p>';
    } else {
        result.innerHTML = '<p style="color: #ff0000;">✗ Wrong answer. Try again!</p>';
    }
}

// Fun Fact Generator
function showFunFact() {
    const facts = [
        "The first video game was created in 1958 and was called 'Tennis for Two'.",
        "The gaming industry is larger than the movie and music industries combined.",
        "Minecraft is the best-selling video game of all time.",
        "The average age of a gamer is 35 years old.",
        "Japan's game industry produces about 20% of the world's video games.",
        "The first coin-operated arcade game was 'Computer Space' in 1971.",
        "Tetris was created by a Russian programmer named Alexey Pajitnov.",
        "The longest video game marathon lasted 138 hours and 34 seconds."
    ];
    
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    const output = document.getElementById('factOutput');
    
    output.innerHTML = `
        <h4>🎮 Fun Fact</h4>
        <p>"${randomFact}"</p>
        <button class="game-btn" onclick="showFunFact()" style="margin-top: 1rem;">ANOTHER FACT</button>
    `;
    output.classList.add('active');
}

// Coin Flip Game
function startCoinGame() {
    const output = document.getElementById('coinOutput');
    let html = `
        <h4>Probability Challenge</h4>
        <p>Choose heads or tails:</p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin: 1rem 0;">
            <button class="game-btn" onclick="flipCoin('heads')">HEADS</button>
            <button class="game-btn" onclick="flipCoin('tails')">TAILS</button>
        </div>
        <div id="coinResult"></div>
    `;
    output.innerHTML = html;
    output.classList.add('active');
}

function flipCoin(choice) {
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const coinResult = document.getElementById('coinResult');
    const win = choice === result;
    
    let html = `
        <div style="text-align: center; margin: 1rem 0;">
            <div style="font-size: 3rem; margin: 1rem 0;">${result === 'heads' ? '⭕' : '📄'}</div>
            <p>The coin landed on: <strong>${result}</strong></p>
            <p style="color: ${win ? '#00ff00' : '#ff0000'}; font-weight: bold;">
                ${win ? '🎉 You won! Great guess!' : '😞 You lost! Try again!'}
            </p>
        </div>
    `;
    
    coinResult.innerHTML = html;
}

// Prize Pool Game
function openPrizePool() {
    const modal = document.getElementById('prizeModal');
    const boxesContainer = document.getElementById('boxesContainer');
    const prizeResult = document.getElementById('prizeResult');
    
    // Create 20 boxes
    boxesContainer.innerHTML = '';
    prizeResult.innerHTML = '';
    
    for (let i = 1; i <= 20; i++) {
        const box = document.createElement('div');
        box.className = 'prize-box';
        box.textContent = i;
        box.addEventListener('click', () => openBox(i, box));
        boxesContainer.appendChild(box);
    }
    
    modal.style.display = 'block';
}

function openBox(boxNumber, boxElement) {
    // All boxes show the same message (as requested)
    boxElement.classList.add('opened');
    boxElement.textContent = '❌';
    boxElement.style.cursor = 'default';
    
    const prizeResult = document.getElementById('prizeResult');
    prizeResult.innerHTML = `
        <div style="text-align: center; margin-top: 1rem;">
            <p style="color: #ff6b6b; font-weight: bold;">Sorry, better luck next time</p>
            <p><small>Box ${boxNumber} was empty. Try another one!</small></p>
        </div>
    `;
    
    // Disable all boxes after one is opened
    const allBoxes = document.querySelectorAll('.prize-box');
    allBoxes.forEach(box => {
        box.style.cursor = 'default';
        box.removeEventListener('click', openBox);
    });
}