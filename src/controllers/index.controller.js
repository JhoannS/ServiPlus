const indexController = {};

indexController.renderIndex = (req, res)=>{
    res.render('index')
}

indexController.renderOlvidarClave = (req, res)=>{
    res.render('olvidarClave')
}

module.exports = indexController;