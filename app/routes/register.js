exports.register = function(req, res) {
  res.render('index', { 
    title: config.display.name
  })
}