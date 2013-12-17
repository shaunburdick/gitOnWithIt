module.exports = function(config) {
  return {
    index: function(req, res) {
      res.render('index', { 
        title: config.display.name
      })
    }
  }
}