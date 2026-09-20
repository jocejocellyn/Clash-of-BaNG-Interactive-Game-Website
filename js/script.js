const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let currentSlide = 0;

function showSlide(index){
    slides.forEach((slide)=>{
        slide.classList.remove("active");
        slide.classList.remove("show-detail");
    });

    dots.forEach((dot)=>{
        dot.classList.remove("active");
    });

    if(slides[index]){
        slides[index].classList.add("active");
    }

    if(dots[index]){
        dots[index].classList.add("active");
    }
}

if(nextBtn && prevBtn){
    nextBtn.addEventListener("click", ()=>{
        currentSlide++;

        if(currentSlide >= slides.length){
            currentSlide = 0;
        }

        showSlide(currentSlide);
    });

    prevBtn.addEventListener("click", ()=>{
        currentSlide--;

        if(currentSlide < 0){
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    });
}

slides.forEach((slide)=>{
    slide.addEventListener("click", ()=>{
        slide.classList.toggle("show-detail");
    });
});

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroNext = document.querySelector(".hero-next");
const heroPrev = document.querySelector(".hero-prev");
let heroIndex = 0;

function showHero(index){
    heroSlides.forEach((slide)=>{
        slide.classList.remove("active");
    });

    heroDots.forEach((dot)=>{
        dot.classList.remove("active");
    });

    if(heroSlides[index]){
        heroSlides[index].classList.add("active");
    }

    if(heroDots[index]){
        heroDots[index].classList.add("active");
    }
}

if(heroNext && heroPrev){
    heroNext.addEventListener("click", ()=>{
        heroIndex++;

        if(heroIndex >= heroSlides.length){
            heroIndex = 0;
        }

        showHero(heroIndex);
    });

    heroPrev.addEventListener("click", ()=>{
        heroIndex--;

        if(heroIndex < 0){
            heroIndex = heroSlides.length - 1;
        }

        showHero(heroIndex);
    });
}

const troopGroups = document.querySelectorAll(".troop-group");
const troopBtn = document.querySelector(".troop-switch-btn");
const troopCategory = document.getElementById("troopCategory");
let troopIndex = 0;

if(troopBtn){
    troopBtn.addEventListener("click", ()=>{
        troopGroups.forEach((group)=>{
            group.classList.remove("active-group");
        });
        troopIndex++;

        if(troopIndex > 1){
            troopIndex = 0;
        }

        troopGroups[troopIndex].classList.add("active-group");

        if(troopIndex === 0){
            troopCategory.innerText = "Elixir Corps";
        }

        else{
            troopCategory.innerText = "Dark Regiment";
        }
    });
}

const artContainer = document.querySelector(".artwork-container");
const artCards = document.querySelectorAll(".art-card");
const artPrev = document.querySelector(".art-prev");
const artNext = document.querySelector(".art-next");
let artIndex = 0;

function getVisibleCards(){
    return window.innerWidth <= 768 ? 2 : 3;
}

function getGap(){
    return window.innerWidth <= 768 ? 15 : 35;
}

function updateArtworkSlider(){
    if(!artContainer || artCards.length === 0){
        return;
    }

    const visibleCards = getVisibleCards();
    const cardWidth = artCards[0].offsetWidth + getGap();
    const maxIndex = artCards.length - visibleCards;

    if(artIndex > maxIndex){
        artIndex = maxIndex;
    }

    if(artIndex < 0){
        artIndex = 0;
    }

    artContainer.style.transform = `translateX(-${artIndex * cardWidth}px)`;
}

if(artNext && artPrev){
    artNext.addEventListener("click", ()=>{
        const maxIndex = artCards.length - getVisibleCards();

        if(artIndex < maxIndex){
            artIndex++;
            updateArtworkSlider();
        }
    });

    artPrev.addEventListener("click", ()=>{
        if(artIndex > 0){
            artIndex--;
            updateArtworkSlider();
        }
    });

    window.addEventListener("resize", updateArtworkSlider);
    updateArtworkSlider();
}

const heroCards = document.querySelectorAll(".hero-card");

heroCards.forEach((card)=>{
    card.addEventListener("mousemove", ()=>{
        card.style.zIndex = "50";
    });

    card.addEventListener("mouseleave", ()=>{
        card.style.zIndex = "1";
    });
});

const genderButtons = document.querySelectorAll(".gender-btn");
let selectedGender = "";

genderButtons.forEach((button)=>{
    button.addEventListener("click", ()=>{
        genderButtons.forEach((btn)=>{
            btn.classList.remove("active-gender");
        });

        button.classList.add("active-gender");
        selectedGender = button.dataset.gender;
    });
});

const registerForm = document.getElementById("registerForm");

if(registerForm){
    registerForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        let valid = true;

        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const age = document.getElementById("age");
        const favorite = document.getElementById("favorite");
        const reason = document.getElementById("reason");

        document.querySelectorAll(".error").forEach((err)=>{
            err.innerText = "";
        });

        document.querySelectorAll("input, textarea, select").forEach((field)=>{
            field.classList.remove("input-error");
        });

        if(username.value.trim().length < 3){
            valid = false;
            username.classList.add("input-error");
            username.parentElement.querySelector(".error").innerText ="Name must be at least 3 characters.";
        }

        const emailValue = email.value.trim();
        const atIndex = emailValue.indexOf("@");
        const dotIndex = emailValue.lastIndexOf(".");

        if(
            emailValue === "" ||
            atIndex === -1 ||
            dotIndex === -1 ||
            atIndex === 0 ||
            dotIndex === emailValue.length - 1 ||
            atIndex > dotIndex ||
            emailValue.includes(" ") ||
            dotIndex - atIndex <= 1
        ){
            valid = false;
            email.classList.add("input-error");
            email.parentElement.querySelector(".error").innerText = "Enter a valid email address (Ex: Example@domain.com)";
        }

        if(
            age.value < 13 ||
            age.value > 80
        ){
            valid = false;
            age.classList.add("input-error");
            age.parentElement.querySelector(".error").innerText ="Age must be between 13 - 80.";
        }

        if(selectedGender === ""){
            valid = false;
            document.querySelector(".gender-box").parentElement.querySelector(".error").innerText = "Please select your gender.";
        }

        if(favorite.value === ""){
            valid = false;
            favorite.classList.add("input-error");
            favorite.parentElement.querySelector(".error").innerText = "Select your favorite troop.";
        }

        if(reason.value.trim().length < 20){
            valid = false;
            reason.classList.add("input-error");
            reason.parentElement.querySelector(".error").innerText = "Reason must be at least 20 characters.";
        }

        if(valid){
            alert("Registration Successful! See You on Game Clasher!!");
            registerForm.reset();

            genderButtons.forEach((btn)=>{
                btn.classList.remove("active-gender");
            });

            selectedGender = "";
            window.location.href = "index.html";
        }
    });
}