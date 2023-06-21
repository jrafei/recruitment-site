
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <h4>TaffFinder</h4>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/users">Accueil</router-link>
          </li>
  
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Candidats
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/users/offres">Offres d'emploi</router-link>
              <router-link class="dropdown-item" to="/users/mesCandidatures">Mes candidatures</router-link>
              <router-link class="dropdown-item" to="/users/devenirAdmin">Devenir Admin</router-link>
              <router-link class="dropdown-item" to="/organisations/devenirRecruteur">Devenir Recruteur</router-link>
            </div>
          </li>
  
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Recruteur
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/recruteur/mesOffres">Gestion de mes offres</router-link>
              <router-link class="dropdown-item" to="/organisations/recruteurorga">Gestion des recruteurs</router-link>
            </div>
          </li>
  
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Admin
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/organisations/adminorga">Gestion des organisations</router-link>
              <router-link class="dropdown-item" to="/admin/userslist">Gestion des utilisateurs</router-link>
              <router-link class="dropdown-item" to="/admin/adminjoin">Gestion des demandes Admin</router-link>
            </div>
          </li>
  
          <li class="button">
            <form id="Logout" action="/users/logout" method="POST">
              <button type="submit" class="btn btn-danger">Déconnexion</button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <style scoped>
    body {
    padding: 50px;
    font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
    }

    a {
    color: #00B7FF;
    }
    </style>

  