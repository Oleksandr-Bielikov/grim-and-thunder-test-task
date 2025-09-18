let popup = null;

export function showPopup(text, targetElement, duration = 3000) {
    if (!popup) {
        popup = document.createElement('div');
        popup.classList.add('popup-message');
        document.body.appendChild(popup);
    }

    popup.innerText = text;

    const rect = targetElement.getBoundingClientRect();
  popup.style.left = `${rect.left + window.scrollX}px`;
  popup.style.top = `${rect.top + window.scrollY - popup.offsetHeight - 8}px`;

  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, duration);
}