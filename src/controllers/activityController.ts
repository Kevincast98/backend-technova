import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Activity } from '../entities/Activity';

// Obtener todas las actividades
export const getActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Obteniendo actividades');
    const activityRepository = getRepository(Activity);
    console.log('Obteniendo actividades2');
    const activities = await activityRepository.find();
    console.log('Obteniendo actividades3');
    res.status(200).json({
      Success: true,
      Detail: activities,
    });
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({
      Success: false,
      Detail: 'Error al obtener actividades',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

// Obtener una actividad por ID
export const getActivityById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  try {
    const activityRepository = getRepository(Activity);
    const activity = await activityRepository.findOneBy({ id: parseInt(id) });

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
  } catch (error) {
    console.error('Error al obtener la actividad:', error);
    res.status(500).json({
      Success: false,
      Detail: 'Error al obtener la actividad',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

// Crear una nueva actividad
export const createActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const activityRepository = getRepository(Activity);
    const newActivity = activityRepository.create(req.body);
    const result = await activityRepository.save(newActivity);
    res.status(201).json({
      Success: true,
      Detail: result,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({
      Success: false,
      Detail: "Error al crear la actividad",
      error: errorMessage,
    });
  }
};

// Actualizar una actividad existente
export const updateActivity = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const activityRepository = getRepository(Activity);
    const activity = await activityRepository.findOneBy({ id: parseInt(id) });

    if (!activity) {
      res.status(404).json({
        Success: false,
        Detail: "Actividad no encontrada",
      });
      return;
    }

    activityRepository.merge(activity, req.body);
    const result = await activityRepository.save(activity);

    res.json({
      Success: true,
      Detail: result,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    res.status(500).json({
      Success: false,
      Detail: "Error al actualizar la actividad",
      error: errorMessage,
    });
  }
};


// Eliminar una actividad
export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const activityRepository = getRepository(Activity);
    const result = await activityRepository.delete(id);

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
  } catch (error) {
    console.error('Error al eliminar la actividad:', error);
    res.status(500).json({
      Success: false,
      Message: 'Error al eliminar la actividad',
      Detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};




// Buscar actividades con filtros opcionales
export const getActivitiesWithFilters = async (req: Request, res: Response): Promise<void> => {
  console.log('Obteniendo actividades con filtros2222');
  try {
    console.log('Obteniendo actividades con filtros');
    const activityRepository = getRepository(Activity);

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
    const filters: any = {};

    // Añadir filtros solo si están presentes en la consulta y no son cadenas vacías
    if (usuario && usuario !== '') filters.usuario = Like(`%${decodeURIComponent(usuario as string)}%`);
    if (proyecto && proyecto !== '') filters.proyecto = Like(`%${decodeURIComponent(proyecto as string)}%`);
    if (compania && compania !== '') filters.compania = Like(`%${decodeURIComponent(compania as string)}%`);
    if (tipo && tipo !== '') filters.tipo = Like(`%${decodeURIComponent(tipo as string)}%`);
    if (descripcion && descripcion !== '') filters.descripcion = Like(`%${decodeURIComponent(descripcion as string)}%`);
    if (equipo && equipo !== '') filters.equipo = Like(`%${decodeURIComponent(equipo as string)}%`);

    // Validación de minutos (solo si está presente y no es una cadena vacía)
    if (minutos !== undefined && minutos !== '') {
      const parsedMinutos = parseInt(minutos as string, 10);
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
    const activities = await activityRepository.find({ where: filters });

    res.json({
      success: true,
      message: 'Actividades encontradas',
      detail: `${activities.length} resultados encontrados`,
      data: activities,
    });

  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno al obtener actividades',
      detail: error instanceof Error ? error.message : 'Ocurrió un error inesperado',
    });
  }
};