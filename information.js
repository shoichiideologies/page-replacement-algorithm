const navParagraphs = document.querySelectorAll('nav p');

for (const p of navParagraphs) {
	p.addEventListener('click', () => {
		// Remove 'active' class from all nav p elements
		for (const item of navParagraphs) {
			item.classList.remove('active');
		}

		// Add 'active' class to the clicked p
		p.classList.add('active');
	});
}
