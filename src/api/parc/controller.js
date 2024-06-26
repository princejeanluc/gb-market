import { success, notFound } from '../../services/response/';
import Parc from './model';

export const index = async ({ querymen: { query, select, cursor } }, res, next) => {
  try {
    const count = await Parc.count();
    const parcs = await Parc.findAll({ where: query, attributes: select, offset: cursor.skip, limit: cursor.limit });
    const response = {
      rows: parcs.map((parc) => parc.view(true)),
      count,
    };
    success(res)(response);
  } catch (error) {
    next(error);
  }
};

export const show = async ({ params }, res, next) => {
  try {
    const parc = await Parc.findByPk(params.id);
    if (!parc) {
      notFound(res)();
    } else {
      success(res)(parc.view(true));
    }
  } catch (error) {
    next(error);
  }
};

export const create = async ({ bodymen: { body } }, res, next) => {
  try {
    const parc = await Parc.create({ ...body });
    await parc.save();
    success(res, 201)(parc.view(true));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({
        valid: false,
        param: 'name', // Assurez-vous que le champ unique est spécifié correctement
        message: 'Parc already registered',
      });
    } else {
      console.log('Une erreur est survenue dans la création du Parc:', err);
      next(err);
    }
  }
};

export const update = async ({ bodymen: { body }, params }, res, next) => {
  try {
    const parc = await Parc.findByPk(params.id);
    if (!parc) {
      notFound(res)();
      return;
    }
    const updatedParc = await parc.update(body);
    success(res)(updatedParc.view(true));
  } catch (error) {
    next(error);
  }
};

export const destroy = async ({ params }, res, next) => {
  try {
    const parc = await Parc.findByPk(params.id);
    if (!parc) {
      notFound(res)();
      return;
    }
    await parc.destroy();
    success(res, 204)();
  } catch (error) {
    next(error);
  }
};
