import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { index, show, create, update, destroy } from './controller';
import Parc from './model';

const router = new Router();
const { culture, nbSerre, cycleProduction, diametreSerre, quantiteUnitaire, productionMinParSerre, productionFerme, estimationPrixGrosParKilo, estimationCA, latitude, longitude} = Parc.getAttributes();

/**
 * @api {get} /parcs Retrieve parcs
 * @apiName RetrieveParcs
 * @apiGroup Parc
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} parcs List of parcs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  query(),
  /*token({ required: true, roles: ['admin'] }),*/
  index);

/**
 * @api {get} /parcs/:id Retrieve parc
 * @apiName RetrieveParc
 * @apiGroup Parc
 * @apiPermission public
 * @apiSuccess {Object} parc Parc's data.
 * @apiError 404 Parc not found.
 */
router.get('/:id',
  show);

/**
 * @api {post} /parcs Create parc
 * @apiName CreateParc
 * @apiGroup Parc
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} culture Parc's culture.
 * @apiParam {Number} nbSerre Number of greenhouses.
 * @apiParam {Number} cycleProduction Production cycle duration.
 * @apiParam {Number} diametreSerre Diameter of greenhouses.
 * @apiParam {Number} quantiteUnitaire Unit quantity.
 * @apiParam {Number} productionMinParSerre Minimum production per greenhouse.
 * @apiParam {Number} productionFerme Farm production.
 * @apiParam {Number} estimationPrixGrosParKilo Estimated wholesale price per kilo.
 * @apiParam {Number} estimationCA Estimated revenue.
 * @apiParam {Number} latitude Latitude.
 * @apiParam {Number} longitude Longitude.
 * @apiSuccess (Success 201) {Object} parc Parc's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.post('/',
  /*token({ required: true, roles: ['admin'] }),*/
  body({ culture, nbSerre, cycleProduction, diametreSerre, quantiteUnitaire, productionMinParSerre, productionFerme, estimationPrixGrosParKilo, estimationCA, latitude, longitude}),
  create);

/**
 * @api {put} /parcs/:id Update parc
 * @apiName UpdateParc
 * @apiGroup Parc
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [culture] Parc's culture.
 * @apiParam {Number} [nbSerre] Number of greenhouses.
 * @apiParam {Number} [cycleProduction] Production cycle duration.
 * @apiParam {Number} [diametreSerre] Diameter of greenhouses.
 * @apiParam {Number} [quantiteUnitaire] Unit quantity.
 * @apiParam {Number} [productionMinParSerre] Minimum production per greenhouse.
 * @apiParam {Number} [productionFerme] Farm production.
 * @apiParam {Number} [estimationPrixGrosParKilo] Estimated wholesale price per kilo.
 * @apiParam {Number} [estimationCA] Estimated revenue.
 * @apiParam {Number} [latitude] Latitude.
 * @apiParam {Number} [longitude] Longitude.
 * @apiSuccess {Object} parc Parc's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 404 Parc not found.
 */
router.put('/:id',
  /* token({ required: true, roles: ['admin'] }),*/
  body({ culture, nbSerre, cycleProduction, diametreSerre, quantiteUnitaire, productionMinParSerre, productionFerme, estimationPrixGrosParKilo, estimationCA, latitude, longitude }),
  update);

/**
 * @api {delete} /parcs/:id Delete parc
 * @apiName DeleteParc
 * @apiGroup Parc
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 Parc not found.
 */
router.delete('/:id',
 /* token({ required: true, roles: ['admin'] }),*/
  destroy);

export default router;
