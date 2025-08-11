// middleware/adminMiddleware.js
module.exports = function (req, res, next) {
  if (req.user && req.user.role && req.user.role.toLowerCase() === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, error: 'Access denied. Admins only.' });
};
