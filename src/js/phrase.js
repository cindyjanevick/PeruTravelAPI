document.addEventListener('DOMContentLoaded', () => {
  const phraseBox = document.getElementById('phraseBox');

  fetch('./data/phrases.json')
    .then(res => res.json())
    .then(phrases => {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];

      phraseBox.innerHTML = `
        <div class="phrase-card">
          <p><strong>🇪🇸 Spanish:</strong> ${phrase.spanish}</p>
          <p><strong>🇬🇧 English:</strong> ${phrase.english}</p>
          ${phrase.quechua ? `<p><strong>🌄 Quechua:</strong> ${phrase.quechua}</p>` : ''}
        </div>
      `;
    })
    .catch(err => {
      phraseBox.textContent = "Oops! Couldn't load a phrase today.";
      console.error("Phrase fetch error:", err);
    });
});
