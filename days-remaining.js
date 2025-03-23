// Days Remaining in Year Extension for Roam Research
// Displays the number of days remaining in the current year on daily note pages

function daysRemainingExtension() {
  // This function will run when the page loads
  const addDaysRemainingToDaily = () => {
    // Check if we're on a daily notes page by looking at the URL
    const url = window.location.href;
    if (!url.includes('/page/')) return;
    
    // Wait for the page to fully load
    setTimeout(() => {
      // Get the page title element
      const titleElement = document.querySelector('.rm-title-display');
      if (!titleElement) return;
      
      // Check if it's a date page (contains month names)
      const titleText = titleElement.innerText;
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
      
      if (!months.some(month => titleText.includes(month))) return;
      
      // Calculate days remaining in year
      const today = new Date();
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      const millisPerDay = 24 * 60 * 60 * 1000;
      const daysRemaining = Math.ceil((endOfYear - today) / millisPerDay);
      
      // Create our display element
      const existingElement = document.getElementById('days-remaining-widget');
      if (existingElement) {
        existingElement.textContent = `${daysRemaining} days remaining in ${today.getFullYear()}`;
        return;
      }
      
      const daysElement = document.createElement('div');
      daysElement.id = 'days-remaining-widget';
      daysElement.style.padding = '8px 14px';
      daysElement.style.marginBottom = '10px';
      daysElement.style.borderRadius = '4px';
      daysElement.style.backgroundColor = '#f0f2f5';
      daysElement.style.color = '#5c7080';
      daysElement.style.fontWeight = 'bold';
      daysElement.style.fontSize = '14px';
      daysElement.style.display = 'inline-block';
      daysElement.textContent = `${daysRemaining} days remaining in ${today.getFullYear()}`;
      
      // Find where to insert it (right after the title)
      const titleContainer = titleElement.closest('.rm-title-container');
      if (titleContainer) {
        titleContainer.insertAdjacentElement('afterend', daysElement);
      }
    }, 1000);
  };
  
  // Run our function when the page changes
  const observer = new MutationObserver(mutations => {
    if (document.querySelector('.rm-title-display')) {
      addDaysRemainingToDaily();
    }
  });
  
  // Start observing
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
  
  // Also run on initial load
  addDaysRemainingToDaily();
  
  // Set up to run when navigating between pages
  window.addEventListener('popstate', addDaysRemainingToDaily);
}

// Export extension
export default {
  onload: daysRemainingExtension
};
