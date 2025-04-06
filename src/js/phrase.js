// scripts/phrase.js
const phrases = [
    { spanish: "Hola", quechua: "Rimaykullayki" },
    { spanish: "Gracias", quechua: "Sulpayki" },
    { spanish: "Buenos días", quechua: "Allin p'unchay" }
  ];
  const phraseBox = document.getElementById("phraseBox");
  const random = phrases[Math.floor(Math.random() * phrases.length)];
  phraseBox.innerHTML = `<p><strong>Spanish:</strong> ${random.spanish}<br><strong>Quechua:</strong> ${random.quechua}</p>`;
  