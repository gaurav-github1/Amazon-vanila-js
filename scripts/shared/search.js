/**
 * Search module - Provides shared search functionality across all pages
 */

/**
 * Initialize the search bar functionality
 * This function should be called on every page that has a search bar
 */
export function initializeSearch() {
  const searchButton = document.querySelector('.search-button');
  const searchInput = document.querySelector('.search-bar');

  if (!searchButton || !searchInput) return;

  // Set up event listener for search button click
  searchButton.addEventListener('click', () => {
    handleSearch();
  });

  // Set up event listener for Enter key in search input
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });

  // Set up event listener for real-time search as user types
  searchInput.addEventListener('input', () => {
    // Debounce to avoid excessive updates
    clearTimeout(searchInput.debounceTimer);
    searchInput.debounceTimer = setTimeout(() => {
      handleRealTimeSearch();
    }, 300); // Wait 300ms after typing stops before searching
  });

  // Check for URL search parameter and populate search bar if present
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  if (searchParam) {
    searchInput.value = decodeURIComponent(searchParam);
    // Trigger real-time search with the initial value from URL
    handleRealTimeSearch();
  }

  // Attach event listeners for clear search links (dynamically added later)
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('clear-search') || 
        (event.target.parentElement && event.target.parentElement.classList.contains('clear-search'))) {
      event.preventDefault();
      clearSearch();
    }
  });
}

/**
 * Clear the search input and reset the search results
 */
function clearSearch() {
  const searchInput = document.querySelector('.search-bar');
  if (!searchInput) return;
  
  // Clear the search input
  searchInput.value = '';
  searchInput.classList.remove('searching');
  
  // Update URL without the search parameter
  window.history.replaceState({}, '', getCurrentPage());
  
  // Dispatch event to notify amazon.js that search has been cleared
  window.dispatchEvent(new CustomEvent('amazonSearch', { 
    detail: { searchTerm: '' } 
  }));
}

/**
 * Handle real-time search as user types
 * This is called on input events and updates without page navigation
 */
function handleRealTimeSearch() {
  const searchInput = document.querySelector('.search-bar');
  const searchTerm = searchInput.value.trim();
  const currentPage = getCurrentPage();
  
  // Add visual indicator for active search
  if (searchTerm) {
    searchInput.classList.add('searching');
  } else {
    searchInput.classList.remove('searching');
  }
  
  // Only update URL and dispatch event on amazon.html page
  if (currentPage === 'amazon.html') {
    // Update URL without redirecting
    if (searchTerm) {
      window.history.replaceState({}, '', `amazon.html?search=${encodeURIComponent(searchTerm)}`);
    } else {
      window.history.replaceState({}, '', 'amazon.html');
    }
    
    // Dispatch search event for amazon.js to handle
    window.dispatchEvent(new CustomEvent('amazonSearch', { 
      detail: { searchTerm } 
    }));
  }
}

/**
 * Handle the search action for form submission
 * Redirects to amazon.html with search parameter when Enter key is pressed or button is clicked
 */
function handleSearch() {
  const searchInput = document.querySelector('.search-bar');
  const searchTerm = searchInput.value.trim();
  const currentPage = getCurrentPage();
  
  if (currentPage === 'amazon.html') {
    // If already on amazon page, just update URL and trigger real-time search
    handleRealTimeSearch();
  } else {
    // If on another page, redirect to amazon.html
    if (searchTerm) {
      window.location.href = `amazon.html?search=${encodeURIComponent(searchTerm)}`;
    } else {
      window.location.href = 'amazon.html';
    }
  }
}

/**
 * Determine the current page name from the URL
 * @returns {string} The current page filename
 */
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();
  return filename || 'index.html';
}

/**
 * Listen for search events on the amazon page
 * @param {Function} callback Function to call when search is performed 
 */
export function onAmazonSearch(callback) {
  window.addEventListener('amazonSearch', (event) => {
    callback(event.detail.searchTerm);
  });
  
  // Also check URL parameters for initial load
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  if (searchParam) {
    callback(decodeURIComponent(searchParam));
  }
} 