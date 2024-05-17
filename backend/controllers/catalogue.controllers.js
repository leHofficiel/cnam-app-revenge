
exports.get = (req, res) => {
        const catalogue = [
			{"title":"L'attaque des Titans", "duree": "25min", "image": "/assets/products/aot.webp", "genre":["Drame","Combat", "Action", "Mystere"]},
			{"title":"One Piece", "duree": "25min", "image":"/assets/products/onepiece.webp", "genre":["Action","Aventure"]},
			{"title":"Naruto", "duree": "25min", "image":"/assets/products/naruto.jpg", "genre":["Action","Aventure"]},
			{"title":"Dragon Ball Z", "duree": "25min", "image":"/assets/products/dbz.webp", "genre":["Action","Aventure"]},
			{"title":"Jujutsu Kaisen","duree": "25min", "image":"/assets/products/jjk.webp", "genre":["Action","Fantaisie"]},
			{"title":"Demon Slayer", "duree": "25min", "image":"/assets/products/demonslayer.jpg", "genre":["Action","Fantaisie","Horreur"]},
			{"title":"My Hero Academia", "duree": "25min", "image":"/assets/products/MHA.jpg", "genre":["Action","Super-héros"]},
			{"title":"Black Clover", "duree": "25min", "image":"/assets/products/blackClover.jpe", "genre":["Action","Fantaisie"]},
			{"title":"One Punch Man", "duree": "25min", "image":"/assets/products/onePunchMan.jpg", "genre":["Action","Super-héros","Comédie"]}, 
			{"title":"Chainsaw Man","duree": "25min", "image":"/assets/products/chainsawMan.webp", "genre":["Action","Horreur"]},
			{"title":"Bleach", "duree": "25min", "image":"/assets/products/bleach.png", "genre":["Action","Surnaturel"]},
			{"title":"Fairy Tail", "duree": "25min", "image":"/assets/products/fairytail.webp", "genre":["Aventure","Fantaisie"]},
			{"title":"Tokyo Ghoul", "duree": "25min", "image":"/assets/products/tokyoghoul.webp", "genre":["Horreur","Psychologique","Surnaturel"]},
			{"title":"Death Note", "duree": "25min", "image":"/assets/products/deathnote.webp", "genre":["Mystère","Psychologique","Surnaturel"]},
			{"title":"Fullmetal Alchemist: Brotherhood", "duree": "25min", "image":"/assets/products/fmaBrotherhood.jpe", "genre":["Aventure","Fantaisie","Surnaturel"]}
		];
	
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

