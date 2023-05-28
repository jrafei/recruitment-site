var express = require('express');
var router = express.Router();
var offreModel = require('../model/offres.js');
var ficheposteModel = require('../model/ficheposte.js');

/* GET offres listing. */
router.get('/offreslist', function (req, res, next) {
  result=offreModel.readall(function(result){
    res.render('offresList', { title: 'List des offres', offres : result });
  });});

/*Get offres emplois */
router.get('/', function (req, res, next) {
  result=offreModel.readOffreFiche(function(result){
    // Récupération de la valeur de tri sélectionnée dans le formulaire
	  const tri = req.query.sort;
    // Tri des offres par date de publication
    if (tri === 'date') {
      result.sort((a, b) => {
        const dateA = new Date(a.datePublication);
        const dateB = new Date(b.datePublication);
        return dateB - dateA; // Tri décroissant par date de publication
      });
    }    
    // Rendu de la page des offres avec les données des offres triées
	  res.render('offres', { offres: result });
  });});
  
module.exports = router;

/*
  // Route pour afficher la page des offres
app.get('/offres', async (req, res) => {
  try {
    // Récupérez les données des filtres depuis votre base de données
    const typesMetier = await offreModel.distinct('metier');
    const fourchettesSalaire = await OffreEmploi.distinct('salaire');
    const lieux = await OffreEmploi.distinct('lieu');

    // Récupération des filtres sélectionnés
    const filtreMetier = req.query.metier;
    const filtreSalaire = req.query.salaire;
    const filtreLieu = req.query.lieu;

    // Construisez votre requête de filtrage en fonction des filtres sélectionnés
    const query = {};
    if (filtreMetier) {
      query.metier = filtreMetier;
    }
    if (filtreSalaire) {
      query.salaire = filtreSalaire;
    }
    if (filtreLieu) {
      query.lieu = filtreLieu;
    }

    // Exécutez la requête pour récupérer les offres d'emploi filtrées
    const offres = await OffreEmploi.find(query);

    // Rendu de la page des offres avec les données des offres et des filtres
    res.render('offres', {
      offres: offres,
      typesMetier: typesMetier,
      fourchettesSalaire: fourchettesSalaire,
      lieux: lieux,
      filtreMetier: filtreMetier,
      filtreSalaire: filtreSalaire,
      filtreLieu: filtreLieu
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des offres d\'emploi :', err);
    res.status(500).send('Erreur lors de la récupération des offres d\'emploi');
  }
});
*/