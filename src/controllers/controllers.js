const controller ={};

controller.addoffer = (req, res) => {
  console.log(req.user);
  console.log(req.body);
  res.render('addoffer', {
    user: req.user
  });
};

controller.addofferi = (req, res) => {
  console.log(req.user);
  console.log(req.body);
  req.getConnection((err, conn) => {
    console.log(err);
    conn.query('INSERT INTO Oferta (titulo, vendedor, descripcion, porciones, ciudad, idusuario) values (?, ?, ?, ?, ?, ?)', [req.body.titulo, req.user.username, req.body.descripcion, req.body.porciones, req.body.ciudad, req.user.id], (err, rows) =>{
      console.log(err);
      console.log(rows);
    });
  });
res.redirect('/profile');
};

controller.updateoffer = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Oferta WHERE id = ?', [id], (err, rows) => {
      res.render('editoffer', {
        user: req.user,
        data: rows[0]
      });
    });
  });
};

controller.updateofferi = (req, res) => {
  var id = req.params.id;
  const newoffer = req.body;
  req.getConnection((err, conn) => {
    conn.query('UPDATE Oferta set ? WHERE id = ?', [newoffer, id], (err,rows) => {
      res.redirect('/profile');
    });
  });
};

controller.deleteoffer = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    console.log(err);
    conn.query('DELETE FROM Oferta WHERE id = ?', [id], (err, rows) => {
      res.redirect('/profile');
    });
  });
};

controller.killuser = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    console.log(err);
    conn.query('DELETE FROM Oferta WHERE idusuario = ?', [id], (err, rows) => {
      console.log(err);
      res.redirect('/');
    });/*
    conn.query('DELETE FROM Usuario WHERE id = ?', [id], (err, rows) => {
      console.log(err);
      res.redirect('/');
    });*/
  });
};

controller.deleteuser = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Usuario WHERE id = ?', [id], (err, rows) => {
      console.log(rows[0]);
      res.render('deleteuser', {
        data: rows[0]
      });
    });
  });
};

controller.updateuser = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Usuario WHERE id = ?', [id], (err, rows) => {
      console.log(req.user);
      res.render('edituser', {
        user: req.user,
        data: rows[0]
      });
    });
  });
};

controller.updateuseri = (req, res) => {
  var id = req.params.id;
  const newoffer = req.body;
  req.getConnection((err, conn) => {
    conn.query('UPDATE Usuario set ? WHERE id = ?', [newoffer, id], (err,rows) => {
      res.redirect('/profile');
    });
  });
};

controller.viewoffer = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Oferta WHERE id = ?', [id], (err, rows) => {
      res.render('viewoffer', {
        user: req.user,
        data: rows[0]
      });
    });
  });
};

controller.viewoffer = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Oferta WHERE id = ?', [id], (err, rows) => {
      res.render('viewoffer', {
        user: req.user,
        data: rows[0]
      });
    });
  });
};

controller.viewoffer = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Oferta WHERE id = ?', [id], (err, rows) => {
      res.render('viewoffer', {
        user: req.user,
        data: rows[0]
      });
    });
  });
};

controller.viewofferranking = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Oferta WHERE id = ?', [id], (err, rows) => {
      res.render('viewofferranking', {
        user: req.user,
        data: rows[0]
      });
    });
  });
};

controller.viewuser = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Usuario WHERE id = ?', [id], (err, rows) => {
      res.render('viewuser', {
        user: req.user,
        data: rows[0]
      });
    });
  });
};

controller.viewuserranking = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Usuario WHERE id = ?', [id], (err, rows) => {
      res.render('viewuserranking', {
        user: req.user,
        data: rows[0]
      });
    });
  });
};



controller.ranking = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Usuario ORDER BY nota DESC', (err, rows) => {
      console.log(err);
      console.log(rows);
      res.render('ranking', {
        user: req.user,
        data: rows
      });
    });
  });
};

controller.viewofferuser = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM appcomidasdb.Oferta WHERE idusuario = ?', [id], (err, rows) => {
      res.render('viewofferuser', {
        user: req.user,
        data: rows
      });
    });
  });
};

controller.buyoffer = (req, res) => {
  console.log(req.params);
  var id = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Oferta WHERE id = ?', [id], (err, rows) => {
      res.render('buyoffer', {
        user: req.user,
        data: rows[0]
      });
    });
  });
};

controller.buyofferi = (req, res) => {
  var id = req.params.id;
  const newoffer = req.body;
  const newporciones = req.body.porciones;
  console.log('El usuario a encuestar es ' + req.body.idusuario);
  console.log('Su nombre es ' + req.body.vendedor);
  req.getConnection((err, conn) => {
    conn.query('UPDATE appcomidasdb.Oferta set porciones = porciones - ? WHERE id = ?', [newporciones, id], (err,rows) => {
      console.log(err);
      res.render('encuesta', {
        user: req.body.idusuario,
        username: req.body.vendedor
      });
    });
  });
};

controller.encuesta = (req, res) => {
  console.log('La nota es ' + req.body.nota);
  console.log('La descripcion es ' + req.body.texto);
  console.log('El usuario es ' + req.body.idusuario);
  req.getConnection((err, conn) => {
    conn.query('INSERT INTO Valoracion (nota, texto, idusuario) values (?, ?, ?)', [req.body.nota, req.body.texto, req.body.idusuario], (err, rows) =>{
      console.log(err);
      console.log(rows);
    });
  });
  res.render('thankyou', {

  });
};

module.exports = controller;
