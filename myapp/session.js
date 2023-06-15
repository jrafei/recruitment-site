var sessions = require("express-session");
module.exports = {
  init: () => {
    return sessions({
      secret: "oeoeoejavoufautchanger",
      saveUninitialized: true,
      cookie: { maxAge: 600 * 1000 }, // 10 minutes
      resave: false,
    });
  },
  creatSession: function (session, mail, role,prenom,nom) {
    session.userid = mail;
    session.role = role;
    session.prenom = prenom;
    session.nom = nom;
    session.save(function (err) {
      console.log(err);
    });
    return session;
  },

  isConnected: (session, role) => {

    if (!session.userid) return false;
    if (role && session.role !== role) return false;
    return true;
  },

  deleteSession: function (session) {
    session.destroy();
  },
};
