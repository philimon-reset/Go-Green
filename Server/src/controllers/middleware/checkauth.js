async function checkauthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(301).json({err: "Not authenticated"})
}

async function checknotauthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.status(301).json({err: "Already authenticated"});
	}
	return next();
}

module.exports = {checkauthenticated, checknotauthenticated};