const AwsCognito = require('../libs/aws-cognito.class');

module.exports = {
  user: async (req, res, next) => {
    const { constants } = req;
    let { success, data } = req;
    try {
      const { body, awsCognito } = req;
    } catch (err) {
      return next(err);
    }
    return res.json({ success, data });
  },
  verify: async (req, res, next) => {
    const { constants } = req;
    let { success, data } = req;
    try {
      const { body, awsCognito } = req;
      const { code, uri } = body;
      await awsCognito.getToken(code, uri)
        .then(res => {
          data = res;
          success = true;
        })
        .catch(err => {
          data = err.toString();
        });
    } catch (err) {
      return next(err);
    }
    return res.json({ success, data });
  },

};
