# AI16-Projet-Jana-Massil
Web Application project

Notre projet utilise la structure MVC d'Express avec les différentes vues, routes et model dans les dossiers correspondants. Nous avons également les fichiers
pass et session permettant respectivement de gérer le hashage des mots de passe en base et la gestion des sessions.
Les routes ont été pensé de selon leurs fonction et/ou type d'utilisateur qui vont y accéder. 

Les requêtes POST dans la base ont été faite dans les routes à cause d'erreur undefined lors du passage des paramètres dans les fonctions du model.
Il est important de souligner que ce n'est pas une bonne pratique et que cela n'a pas été corrigé par manque de temps afin d'assurer le
développement de l'ensemble des fonctionnalités de l'application.

Par ailleurs, le MLD a vu apparaître deux nouvelles tables DemandesJoin et DemandesAdmin qui sont respectivement les tables où vont être ajouté et géré
les demandes pour rejoindre une organisation et demander à devenir administritateur.
Un héritage par classe mère aurait été à privilégié dans la table Demandes avec un attribut permettant de faire la différenciation du type de demandes
tel que cela a été fait dans la table Users avec les types d'utilisateurs. Cela n'a pas été fait pour les mêmes raisons précédemment explicités, 
mais également pour éviter de modifier la structure déjà fonctionnelle des requêtes du code vers ces tables qui aurait pu faire perdre un temps précieux.


Autres documents : 

UseCaseAI16.jpg : Schéma des différents UseCase de notre application
Projet - Use Cases.xlsx : Tableau Excel définissant les différents UseCase majeur de notre application
MCD Projet.pdf : MCD de notre application
UML.pdf : MLD de notre application
