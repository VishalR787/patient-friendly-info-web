function requireAdmin(req, res, next) {
  if (!req.session?.isAdmin) return res.status(403).json({ message: "Forbidden" });
  next();
}
module.exports = { requireAdmin };
