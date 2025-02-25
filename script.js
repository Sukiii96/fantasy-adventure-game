function enterLocation(location) {
    document.getElementById("scene-text").innerText = `You entered ${location}.`;
}

async function talkToNPC() {
    let playerInput = document.getElementById("player-input").value;
    
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{role: "user", content: playerInput}]
        })
    });

    let data = await response.json();
    document.getElementById("npc-response").innerText = data.choices[0].message.content;
}
