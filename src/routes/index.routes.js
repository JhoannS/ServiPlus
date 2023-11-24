const {Router} = require('express')
const router = Router();

const { renderIndex, renderOlvidarClave} = require('../controllers/index.controller')

router.get('/', renderIndex);

router.get('/olvidarClave', renderOlvidarClave)


module.exports = router;