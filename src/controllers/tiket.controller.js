const ticketController = {};
const Ticket = require("../models/Ticket");

ticketController.renderTicketForm = (req, res) => {
  res.render("./solicitudes/crear-solicitud");
};

//index de solicitudes
ticketController.renderIndexSolicitudes = async (req, res) => {
  res.render("solicitudes/index-solicitudes");
};
// controlador para crear solicitud
ticketController.crearTicket = async (req, res) => {
  const { titulo, descripcion } = req.body;
  const nuevaSolicitud = new Ticket({ titulo, descripcion });
  await nuevaSolicitud.save();
  req.flash("mensaje_correcto", "Peticion enviada exitosamente");
  res.redirect("/ticket/gestionar-solicitud");
};
// controlador para consultar las solicitudes realizadas
ticketController.renderSolicitudes = async (req, res) => {
  const solicitudes = await Ticket.find().lean();
  res.render("solicitudes/todas-las-solicitudes", { solicitudes });
};
// controlador para vista gestionar las solicitudes realizadas
ticketController.renderGestionarSolicitudes = async (req, res) => {
  const solicitudes = await Ticket.find().lean();
  res.render("solicitudes/gestionar-solicitud", { solicitudes });
};
// controlador para traer los valores a editar
ticketController.renderEditarForm = async (req, res) => {
  const ticketId = await Ticket.findById(req.params.id).lean();
  res.render("solicitudes/editar-solicitud", { ticketId });
};
// controlador para editar la solicitud
ticketController.ActualizarTicket = async (req, res) => {
  const { titulo, descripcion, estado } = req.body;
  await Ticket.findByIdAndUpdate(req.params.id, { titulo, descripcion, estado });
  req.flash("mensaje_correcto", "Solicitud actualizada exitosamente");
  res.redirect("/ticket/gestionar-solicitud");
};
// controlador para eliminar la solicitud
ticketController.EliminarTicket = async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  req.flash("mensaje_correcto", "Solicitud eliminada exitosamente");
  res.redirect("/ticket/gestionar-solicitud");
};

module.exports = ticketController;
