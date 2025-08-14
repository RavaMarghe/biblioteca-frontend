document.querySelectorAll('.pagination a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // evita il refresh (opzionale)
      
      // Rimuove la classe active da tutti
      document.querySelectorAll('.pagination a').forEach(l => l.classList.remove('active'));
      
      // Aggiunge la classe active a quello cliccato
      this.classList.add('active');
    });
  });