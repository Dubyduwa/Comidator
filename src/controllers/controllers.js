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
  conn.query('INSERT INTO Oferta (titulo, vendedor, descripcion, ciudad, idusuario) values (?, ?, ?, ?, ?)', [req.body.titulo, req.user.username, req.body.descripcion, req.body.ciudad, req.user.id], (err, rows) =>{
    console.log(err);
    console.log(rows);
  })
})
res.send('works');
};

module.exports = controller;
