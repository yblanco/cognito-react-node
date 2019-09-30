const express = require('express');

const router = express.Router();
const routes = express.Router();

const AwsCognito = require('../../libs/aws-cognito.class');

const controller = require('../../controllers/users.controller');

router.use((req, res, next) => {
  const { constants } = req;
  const { environment } = constants;
  const { aws } = environment;
  const { body } = req;
  req.awsCognito = new AwsCognito(aws.cognito);
  next()
})



router.route('/')
  .get(controller.user)
  .post(controller.verify);

module.exports = routes.use('/user', router);
