const popupLinks = e => {
  const links = Array.from(document.querySelectorAll('[popup-link]'));
  links.forEach(link => {
    link.addEventListener('click', event => {
      if (event.target) {
        const target = event.target as HTMLAnchorElement;
        browser.tabs.create({ active: true, url: target.getAttribute('popup-link') || 'about:blank' });
      }
    });
  });
};
export default popupLinks;
