const selfOnly = action => (req, res, next) => {
  if(parseInt(req.params.id, 10) === req.user.id || req.user.admin) next()
  else return res.status(403).send(`You can only ${action} yourself.`)
};

const forbidden = message => (req, res, next) => {
	if(req.user.admin) next()
	else return res.status(403).send(message)
};

module.exports = {selfOnly, forbidden};
