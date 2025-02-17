"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivitiesWithFilters = exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityById = exports.getActivities = void 0;
const typeorm_1 = require("typeorm");
const Activity_1 = require("../entities/Activity");
// Obtener todas las actividades
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Obteniendo actividades');
        const activityRepository = yield (0, typeorm_1.getRepository)(Activity_1.Activity).find();
        console.log('Obteniendo actividades2');
        // const activities = await activityRepository.find();
        console.log('Obteniendo actividades3');
        res.status(200).json({
            Success: true,
            Detail: activityRepository,
        });
    }
    catch (error) {
        console.error('Error al obtener actividades:', error);
        res.status(500).json({
            Success: false,
            Detail: 'Error al obtener actividades',
            error: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
});
exports.getActivities = getActivities;
// Obtener una actividad por ID
const getActivityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const activityRepository = (0, typeorm_1.getRepository)(Activity_1.Activity);
        const activity = yield activityRepository.findOneBy({ id: parseInt(id) });
        if (!activity) {
            res.status(404).json({
                Success: false,
                Detail: 'Actividad no encontrada',
            });
            return;
        }
        res.status(200).json({
            Success: true,
            Detail: activity,
        });
    }
    catch (error) {
        console.error('Error al obtener la actividad:', error);
        res.status(500).json({
            Success: false,
            Detail: 'Error al obtener la actividad',
            error: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
});
exports.getActivityById = getActivityById;
// Crear una nueva actividad
const createActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityRepository = (0, typeorm_1.getRepository)(Activity_1.Activity);
        const newActivity = activityRepository.create(req.body);
        const result = yield activityRepository.save(newActivity);
        res.status(201).json({
            Success: true,
            Detail: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        res.status(500).json({
            Success: false,
            Detail: "Error al crear la actividad",
            error: errorMessage,
        });
    }
});
exports.createActivity = createActivity;
// Actualizar una actividad existente
const updateActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const activityRepository = (0, typeorm_1.getRepository)(Activity_1.Activity);
        const activity = yield activityRepository.findOneBy({ id: parseInt(id) });
        if (!activity) {
            res.status(404).json({
                Success: false,
                Detail: "Actividad no encontrada",
            });
            return;
        }
        activityRepository.merge(activity, req.body);
        const result = yield activityRepository.save(activity);
        res.json({
            Success: true,
            Detail: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        res.status(500).json({
            Success: false,
            Detail: "Error al actualizar la actividad",
            error: errorMessage,
        });
    }
});
exports.updateActivity = updateActivity;
// Eliminar una actividad
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const activityRepository = (0, typeorm_1.getRepository)(Activity_1.Activity);
        const result = yield activityRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({
                Success: false,
                Message: 'Actividad no encontrada',
                Detail: `No se encontró una actividad con el ID ${id}`,
            });
            return;
        }
        res.json({
            Success: true,
            Message: 'Actividad eliminada',
            Detail: `La actividad con ID ${id} fue eliminada correctamente`,
        });
    }
    catch (error) {
        console.error('Error al eliminar la actividad:', error);
        res.status(500).json({
            Success: false,
            Message: 'Error al eliminar la actividad',
            Detail: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
});
exports.deleteActivity = deleteActivity;
// Buscar actividades con filtros opcionales
const getActivitiesWithFilters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Obteniendo actividades con filtros2222');
    try {
        console.log('Obteniendo actividades con filtros');
        const activityRepository = (0, typeorm_1.getRepository)(Activity_1.Activity);
        // Extraer y decodificar los posibles filtros de la consulta
        const { usuario, proyecto, compania, tipo, descripcion, minutos, fecha, equipo } = req.query;
        // Verificar si hay filtros válidos
        if (!usuario && !proyecto && !compania && !tipo && !descripcion && !minutos && !fecha && !equipo) {
            res.status(400).json({
                success: false,
                message: 'Debe proporcionar al menos un filtro para la búsqueda',
                detail: 'Incluya uno o más parámetros en la consulta',
            });
            return;
        }
        // Crear un objeto con los filtros dinámicos
        const filters = {};
        // Añadir filtros solo si están presentes en la consulta y no son cadenas vacías
        if (usuario && usuario !== '')
            filters.usuario = (0, typeorm_1.Like)(`%${decodeURIComponent(usuario)}%`);
        if (proyecto && proyecto !== '')
            filters.proyecto = (0, typeorm_1.Like)(`%${decodeURIComponent(proyecto)}%`);
        if (compania && compania !== '')
            filters.compania = (0, typeorm_1.Like)(`%${decodeURIComponent(compania)}%`);
        if (tipo && tipo !== '')
            filters.tipo = (0, typeorm_1.Like)(`%${decodeURIComponent(tipo)}%`);
        if (descripcion && descripcion !== '')
            filters.descripcion = (0, typeorm_1.Like)(`%${decodeURIComponent(descripcion)}%`);
        if (equipo && equipo !== '')
            filters.equipo = (0, typeorm_1.Like)(`%${decodeURIComponent(equipo)}%`);
        // Validación de minutos (solo si está presente y no es una cadena vacía)
        if (minutos !== undefined && minutos !== '') {
            const parsedMinutos = parseInt(minutos, 10);
            if (isNaN(parsedMinutos)) {
                res.status(400).json({
                    success: false,
                    message: "El parámetro 'minutos' debe ser un número entero válido",
                    detail: `Valor recibido: ${minutos}`,
                });
                return;
            }
            filters.minutos = parsedMinutos; // Solo se añade si es un número válido
        }
        // Validación de fecha (solo si está presente y no es una cadena vacía)
        if (fecha !== undefined && fecha !== '') {
            console.log('Fecha:', fecha);
            const parsedFecha = new Date(`${fecha}T00:00:00Z`);
            if (isNaN(parsedFecha.getTime())) {
                res.status(400).json({
                    success: false,
                    message: "El parámetro 'fecha' debe ser una fecha válida en formato YYYY-MM-DD",
                    detail: `Valor recibido: ${fecha}`,
                });
                return;
            }
            console.log('Fecha:', parsedFecha);
            filters.fecha = parsedFecha.toISOString();
        }
        // Buscar en la base de datos con los filtros dinámicos
        const activities = yield activityRepository.find({ where: filters });
        res.json({
            success: true,
            message: 'Actividades encontradas',
            detail: `${activities.length} resultados encontrados`,
            data: activities,
        });
    }
    catch (error) {
        console.error('Error al obtener actividades:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al obtener actividades',
            detail: error instanceof Error ? error.message : 'Ocurrió un error inesperado',
        });
    }
});
exports.getActivitiesWithFilters = getActivitiesWithFilters;
