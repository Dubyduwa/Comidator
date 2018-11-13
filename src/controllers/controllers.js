const controller ={};

controller.inicio = (req, res) => {
      res.render('inicio', {
    });

};

controller.save = (req, res) => {
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


module.exports = controller;
