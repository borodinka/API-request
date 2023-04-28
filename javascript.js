const API_URL = 'https://dog.ceo/api';

async function getDog() {
	try {
		const data = await Promise.all([
			fetch(`${API_URL}/breeds/image/random`),
			fetch(`${API_URL}/breeds/list/all`),
			fetch(`${API_URL}/breed/dalmatian/images/random`)
		]);

		const results = await Promise.all(data.map(a => a.json()));

		return results;

	} catch (error) {
		console.log('Error: ', error);
		throw new Error('Error fetching dog data');
	}
}

async function showData() {
	try {
		const [randomImage, breeds, dalmatianImage] = await getDog();

		const randomImg = document.getElementById('random-image');
		randomImg.src = randomImage.message;

		const breedList = document.getElementById('breeds');
		for (const breed in breeds.message) {
			const breedItem = document.createElement('li');
			breedItem.textContent = breed;
			breedList.appendChild(breedItem);
		}

		const dalmatianImg = document.getElementById('dalmatian-image');
		dalmatianImg.src = dalmatianImage.message;
	} catch (error) {
		console.log('Error: ', error);
	}
}

showData();
