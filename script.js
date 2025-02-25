// 🛠️ CONFIGURATION
const API_KEY = "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"; 
const player = {
    class: "Mage",
    inventory: [],
    location: "start"
};

// 🌍 ENTER A LOCATION
function enterLocation(location) {
    let sceneText = document.getElementById("scene-text");

    // Smooth transition effect
    sceneText.style.opacity = 0;
    setTimeout(() => {
        player.location = location;
        sceneText.innerText = `You entered ${location}.`;
        sceneText.style.opacity = 1;

        // Special events based on location
        if (location === "forest") {
            alert("A mysterious fog appears... Something feels strange.");
        }
    }, 500);
}

// 🗣️ TALK TO AN AI-POWERED NPC
async function talkToNPC() {
    let playerInput = document.getElementById("player-input").value;

    if (!playerInput) {
        alert("Please enter a message!");
        return;
    }

    try {
        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: playerInput }]
            })
        });

        let data = await response.json();

        if (data.choices && data.choices.length > 0) {
            document.getElementById("npc-response").innerText = data.choices[0].message.content;
        } else {
            document.getElementById("npc-response").innerText = "The NPC remains silent...";
        }
    } catch (error) {
        console.error("Error communicating with AI:", error);
        document.getElementById("npc-response").innerText = "The NPC is having trouble responding...";
    }
}

// 🔑 PLAYER INVENTORY SYSTEM
function addItemToInventory(item) {
    if (!player.inventory.includes(item)) {
        player.inventory.push(item);
        localStorage.setItem("playerInventory", JSON.stringify(player.inventory));
        alert(`You found a ${item}!`);
    } else {
        alert(`You already have a ${item}.`);
    }
}

// 🎭 CHARACTER SELECTION
function chooseClass(selectedClass) {
    player.class = selectedClass;
    localStorage.setItem("playerClass", selectedClass);
    alert(`You are now a ${selectedClass}.`);
}

// 🧩 SIMPLE PUZZLE SYSTEM
function checkPuzzleAnswer(answer) {
    if (answer.toLowerCase() === "magic") {
        alert("Correct! You unlocked a hidden path.");
        addItemToInventory("Magic Key");
    } else {
        alert("Wrong answer. Try again!");
    }
}

// ⏳ DAY/NIGHT SYSTEM
function checkTime() {
    let hour = new Date().getHours();
    if (hour >= 20 || hour <= 6) {
        document.body.classList.add("night-mode");
        alert("It's night... Strange creatures might appear.");
    }
}

checkTime(); // Run this when the page loads
