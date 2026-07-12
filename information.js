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

const glossaryLinks = document.querySelectorAll('a[href^="#"]');

for (const link of glossaryLinks) {
	link.addEventListener('click', event => {
		const id = link.getAttribute('href').slice(1);
		const target = document.getElementById(id);

		if (target) {
			event.preventDefault();
			target.classList.add('highlight');
			target.scrollIntoView({behavior: 'smooth', block: 'center'});
			setTimeout(() => target.classList.remove('highlight'), 2000);
		}
	});
}
