const formatDate = date => {
  if (!date) return date;
  return new Date(date).toISOString().split('T')[0];
};

const parseDateMiddleware = (req, res, next) => {
  if (req.body && req.body.dueDate) {
    req.body.dueDate = new Date(req.body.dueDate);
  }
  next();
};

const formatResponseDateMiddleware = (req, res, next) => {
  const originalJson = res.json;
  res.json = function (data) {
    if (Array.isArray(data)) {
      data.forEach(d => { if (d.dueDate) d.dueDate = formatDate(d.dueDate); });
    } else if (data && data.dueDate) {
      data.dueDate = formatDate(data.dueDate);
    }
    return originalJson.call(this, data);
  };
  next();
};

module.exports = { parseDateMiddleware, formatResponseDateMiddleware };
