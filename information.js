const navParagraphs = document.querySelectorAll('nav p');

navParagraphs.forEach(p => {
    p.addEventListener('click', () => {
        // Remove 'active' class from all nav p elements
        navParagraphs.forEach(item => item.classList.remove('active'));

        // Add 'active' class to the clicked p
        p.classList.add('active');
    });
});