const { Router } = require('express')
const router = Router()

const { 
    renderIndexSolicitudes,
    renderGestionarSolicitudes,
    renderTicketForm, 
    crearTicket, 
    renderSolicitudes, 
    renderEditarForm, 
    ActualizarTicket, 
    EliminarTicket
} = require('../controllers/tiket.controller');

const { route } = require('./index.routes');

//index de solicitudes
router.get('/ticket/index', renderIndexSolicitudes)

//vista gestionar solicitudes
router.get('/ticket/gestionar-solicitud', renderGestionarSolicitudes)

// crear solicitud
router.get('/ticket/add', renderTicketForm)
router.post('/ticket/nueva-solicitud', crearTicket)

// traer todas las solicitudes realizadas por ese usuario
router.get('/ticket/solicitudes', renderSolicitudes)

// editar solicitudes
router.get('/ticket/edit/:id', renderEditarForm)
router.put('/ticket/edit/:id', ActualizarTicket )


// eliminar solicitudes
router.delete('/ticket/delete/:id', EliminarTicket)

module.exports = router
