// Array of image paths
const images = [
  "media/summer1.jpg",
  "media/summer2.jpg",
  "media/summer3.jpg",
  "media/summer4.jpg",
  "media/summer5.jpg",
  "media/summer6.jpg",
  "media/summer7.jpg",
  "media/summer8.jpg",
  "media/hallow1.jpg",
  "media/hallow2.jpg",
  "media/hallow3.jpg",
  "media/hallow4.jpg",
  "media/hallow5.jpg",
  "media/hallow6.jpg",
  "media/hallow7.jpg",
  "media/hallow8.jpg"
];

// Pagination variables
const itemsPerPage = 8; // Number of images per page
let currentPage = 1; // Current page starts at 1

// Titles for each page (you can add more titles or change them)
const pageTitles = [
  "Summer", // Title for page 1
  "Halloween", // Title for page 2
  "Winter", // Title for page 3
  "Spring"  // Title for page 4
];

// CSS classes for each page title's font style
const pageTitleClasses = [
  "page-title-summer",  // Class for page 1
  "page-title-autumn",  // Class for page 2
  "page-title-winter",  // Class for page 3
  "page-title-spring"   // Class for page 4
];

// Elements
const gallery = document.getElementById('gallery');
const pageTitle = document.getElementById('page-title');
const paginationControls = document.getElementById('pagination-controls');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');

// Render the gallery based on the current page
function renderGallery() {
  // Clear the gallery
  gallery.innerHTML = '';

  // Calculate start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the images array to get images for the current page
  const imagesToDisplay = images.slice(startIndex, endIndex);

  // Dynamically create the gallery items
  imagesToDisplay.forEach((imageSrc) => {
    const artPiece = document.createElement('div');
    artPiece.classList.add('art-piece');

    const img = document.createElement('img');
    img.src = imageSrc; // Thumbnail image path
    img.dataset.src = imageSrc; // Full-size image path for lightbox
    img.alt = "Artwork";

    artPiece.appendChild(img);
    gallery.appendChild(artPiece);
  });

  // Update the page title dynamically based on the current page
  pageTitle.textContent = pageTitles[currentPage - 1] || `Page ${currentPage}`;

  // Update the page title font class based on the current page
  pageTitle.className = ''; // Reset any previous classes
  pageTitle.classList.add(pageTitleClasses[currentPage - 1]);

  // Update the pagination controls
  renderPagination();
}

// Handle pagination controls
function goToPage(page) {
  currentPage = page;
  renderGallery();
}

// Render pagination controls
function renderPagination() {
  const totalPages = Math.ceil(images.length / itemsPerPage);
  paginationControls.innerHTML = ''; // Clear existing pagination controls

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.onclick = () => goToPage(i);
    if (i === currentPage) {
      button.disabled = true; // Disable the button for the current page
    }
    paginationControls.appendChild(button);
  }
}

// Add event listener for lightbox functionality
gallery.addEventListener('click', (event) => {
  const clickedImage = event.target;

  if (clickedImage.tagName === 'IMG' && clickedImage.dataset.src) {
    lightboxImage.src = clickedImage.dataset.src;
    lightbox.classList.remove('hidden');
  }
});

// Close the lightbox
function closeLightbox() {
  lightbox.classList.add('hidden');
  lightboxImage.src = '';
}

// Handle "Escape" key to close the lightbox
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});

// Initial render
renderGallery();


