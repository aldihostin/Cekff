document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetchFF');
    const loadingSpinner = document.querySelector('.loading-spinner');

    fetchButton.addEventListener('click', function() {
        const ffUrlInput = document.getElementById('cek');
        const ffContent = document.getElementById('ff-content');

        loadingSpinner.style.display = 'block';
        fetch(`https://api.isan.eu.org/nickname/ff?id=${encodeURIComponent(ffUrlInput.value)}`)
            .then(response => response.json())
            .then(json => {  // Changed from `response => response.json()` to `json =>`
                loadingSpinner.style.display = 'none';
                if (json.success) {  // Changed from `response.success` to `json.success`
                    const game = json.game;
                    const id = json.id;
                    const name = json.name;
                
                    ffContent.innerHTML = `
                        <h2>Mendapatkan nama game</h2>
                        <p>game: ${game} | id: ${id} | name: ${name}</p>
                    `;
                } else {
                    ffContent.innerHTML = `<p>Nickname tidak ditemukan</p>`;
                }
            })
            .catch(error => {
                loadingSpinner.style.display = 'none';
                ffContent.innerHTML = `<p>Terjadi kesalahan saat mengambil data</p>`;
                console.error('Error fetching ffid data:', error);
            });
    });
});
