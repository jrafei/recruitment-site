var express = require('express');
var router = express.Router();
var candModel = require('../model/candidature.js');
var offreModel = require('../model/offres.js');
// on va utliser Multer comme middleware de gestion d'upload de fichier (faire au préalable : npm install multer)
var multer = require('multer');  
var db = require('../model/db.js');

// définition du répertoire de stockage des fichiers chargés (dans le répertoire du projet pour la démo, mais sur un espace dédié en prod !)
// et du nom sous lequel entregistrer le fichier
var my_storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'mesfichiers')},
  filename: function (req, file, cb) {
    let my_extension = file.originalname.slice(file.originalname.lastIndexOf(".")); // on extrait l'extension du nom d'origine du fichier
    cb(null, req.body.myUsername + '-' + req.body.myFileType+my_extension); // exemple de format de nommage : login-typedoc.ext
  }
})

var upload = multer({ storage: my_storage }) 

/* GET */
router.get('/', function(req, res, next) {
  //Test pour savoir si user a déjà postulé à l'offre
  candModel.readbyEmailIdFiche(req.session.userid,req.query.idFiche,function(result){
    //s'il a déjà postuler à l'offre-> envoie une erreur
    if(result.length !== 0) res.status(403).render("error", { message: " Vous avez déjà postulé à cette offre !", error: {} });
    //sinon on ajoute une candidature 
    if (req.session.userid == undefined) {
      console.log('Init connected user');
      //req.session.connected_user = {prenom : 'Jana', login : 'Rafei'};
      res.render('index');
    }
    if (req.session.uploaded_files == undefined) {
      console.log('Init uploaded files array');
      req.session.uploaded_files = [];
    }
    console.log(req.session.prenom);
    res.render('file_upload',{prenom: req.session.prenom, idFiche: req.query.idFiche, email : req.session.userid, files_array : req.session.uploaded_files});
  })
});


/* POST : ajoute à l'objet request une propriété 'file', ayant une valeur uniquement si le formulaire' contient un champ de type 'file' qui a pour nom 'myFileInput' */
var nbPiece = 0;
router.post('/', upload.single('myFileInput') ,function(req, res, next) {
  const uploaded_file = req.file;
  console.log("req.file = ",req.file);

  if (!uploaded_file) {
    res.render('file_upload',{email : req.session.userid, files_array : req.session.uploaded_files, upload_error : 'Merci de sélectionner le fichier à charger !'});
  } else {
    console.log(uploaded_file.originalname,' => ',uploaded_file.filename);
    req.session.uploaded_files.push(uploaded_file.filename);
    nbPiece = nbPiece +1;
    
    email = req.session.userid;
    idFiche = req.query.idFiche;
    //console.log("id de la fiche =",idFiche);
    //on cherche l'id de l'offre depuis l'id de fiche de post
    offreModel.readOffrebyFiche(idFiche,function(results){
        idOffre = results[0].id;
        DateCand = new Date();
        nbPiece = 1;
        var candToInsert = [email, idOffre, DateCand, nbPiece];
        //res.render('file_upload',{nbPiece: nbPiece, email : req.session.userid, prenom : req.session.prenom, files_array : req.session.uploaded_files, uploaded_filename : uploaded_file.filename, uploaded_original:uploaded_file.originalname});
        addCandidature(req,res,candToInsert,uploaded_file);
    })
    }
});

/*add Candidature si il n'existe pas, sinon incrementer le nb de piece*/
const addCandidature = (req,res,candToInsert,uploaded_file) => {
    //on cherche si la candidature existe déja :
    console.log("add Candidature !! ");
    candModel.readbyEmailIdOffre(candToInsert[0],candToInsert[1],function(result){
        //candidature n'existe pas dans bd -> on l'ajoute
        if(result.length===0){
                console.log("Candidature n'existe pas !");
                sql = "INSERT INTO Candidature(email, idOffre,DateCand,nbPiece) VALUES (?, ?,?,?)";
                db.query(sql, candToInsert , function (err, results) {
                    if(err) throw err
                    console.log("insertion done !");
                    res.render('file_upload',{nbPiece: nbPiece, email : req.session.userid, prenom : req.session.prenom, files_array : req.session.uploaded_files, uploaded_filename : uploaded_file.filename, uploaded_original:uploaded_file.originalname});
                });
        }
        else{ //Candidature existe -> on incrémente le nb de piece
            console.log("Candidature existe ");
            sql = "UPDATE Candidature SET nbPiece = nbPiece + 1 WHERE idOffre=? and email=?;"
            db.query(sql, [candToInsert[1] ,candToInsert[0]], function (err, results) {
                if (err) throw err;
                console.log("nbPiece incrémenté! ");
                res.render('file_upload',{nbPiece: nbPiece, email : req.session.userid, prenom : req.session.prenom, files_array : req.session.uploaded_files, uploaded_filename : uploaded_file.filename, uploaded_original:uploaded_file.originalname});
        });
    }
});
}

/* GET download */
router.get('/getfile', function(req, res, next) {
  try {
    res.download('./mesfichiers/'+req.query.fichier_cible);
  } catch (error) {
    res.send('Une erreur est survenue lors du téléchargement de '+req.query.fichier_cible+' : '+error);
  }
});



module.exports = router;