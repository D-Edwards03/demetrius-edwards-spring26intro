const btnArtworks = document.getElementById('btn-artworks');
const btnExhibitions = document.getElementById('btn-exhibitions');
const contentContainer = document.getElementById('api-content');

// Display a loading message while fetching data
const showLoading = () => {
    contentContainer.innerHTML = '<p class="loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</p>';
};

// Display an error message if fetching data fails
const showError = (message) => {
    contentContainer.innerHTML = `<p class="error"><i class="fa-solid fa-triangle-exclamation"></i> Error: ${message}</p>`;
};

// Get Request 1: Artworks
async function fetchArtworks() {
    showLoading();
    try {
        const response = await fetch('https://api.artic.edu/api/v1/artworks?limit=12');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayArtworks(data.data);
    } catch (error) {
        console.error('Failed to fetch artworks:', error);
        showError('Could not load artworks. Please try again later.');
    }
}

// Display Artworks
function displayArtworks(artworks) {
    contentContainer.innerHTML = ''; // Clear previous content

    artworks.forEach(art => {
        // Only display if image exists
        if (art.image_id) {
            const card = document.createElement('div');
            card.className = 'card';

            const imageUrl = `https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`;
            card.innerHTML = `
                <img src="${imageUrl}" alt="${art.title}" loading="lazy">
                <h3>${art.title}</h3>
                <p><strong>Artist:</strong> ${art.artist_title || 'Unknown'}</p>
                <p><strong>Date:</strong> ${art.date_display || 'N/A'}</p>
            `;
            contentContainer.appendChild(card);
        }
    });
}

// Get Request 2: Exhibitions
async function fetchExhibitions() {
    showLoading();
    try {
        const response = await fetch('https://api.artic.edu/api/v1/exhibitions?limit=12');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayExhibitions(data.data);
    } catch (error) {
        console.error('Failed to fetch exhibitions:', error);
        showError('Could not load exhibitions. Please try again later.');
    }
}

// Display Exhibitions
function displayExhibitions(exhibitions) {
    contentContainer.innerHTML = '';

    exhibitions.forEach(exhibition => {
        const card = document.createElement('div');
        card.className = 'card';

        const startDate = new Date(exhibition.aic_start_at).toLocaleDateString();
        const endDate = exhibition.aic_end_at ? new Date(exhibition.aic_end_at).toLocaleDateString() : 'Ongoing';

        card.innerHTML = `
            <h3>${exhibition.title}</h3>
            <p><strong>Location:</strong> ${exhibition.gallery_title || 'Various Galleries'}</p>
            <p><strong>Dates:</strong> ${startDate} - ${endDate}</p>
            <p><em>${exhibition.short_description || 'No description available.'}</em></p>
        `;
        contentContainer.appendChild(card);
    });
}

// Event Listeners
btnArtworks.addEventListener('click', fetchArtworks);
btnExhibitions.addEventListener('click', fetchExhibitions);

// Fetch artworks by default on page load
//fetchArtworks();