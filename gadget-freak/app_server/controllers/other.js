/* Vrni stran z Angular SPA */
module.exports.angularApp = function(req, res) {
  res.render('layout', {
    title: 'GadgetFreak'
  });
};