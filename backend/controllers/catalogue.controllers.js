const catalogue = require('../catalogue.json');

exports.get = (req, res) => {

	const genre = req.query.genre;
	const query = req.query.query ? req.query.query.toLowerCase() : null;
	
	let filteredCatalogue = catalogue;
	
	// Filtrer par genre si un genre est sélectionné
	if (genre && genre !== 'Tous les genres') {
		filteredCatalogue = filteredCatalogue.filter(produit => produit.genre.includes(genre));
	}
	
	// Filtrer par nom si une recherche est effectuée
	if (query) {
		filteredCatalogue = filteredCatalogue.filter(produit => produit.title.toLowerCase().includes(query));
	}
	
	res.setHeader('Content-Type', 'application/json');
	res.send(filteredCatalogue);
};

exports.getById = (req, res) => {
	const productId = parseInt(req.params.id); // Convertir l'ID en nombre entier
	const product = catalogue.find(produit => produit.id === productId);

	if (!product) {
		res.status(404).json({ message: `Produit avec l'ID ${productId} non trouvé.` });
	} else {
		res.json(product);
	}
};

