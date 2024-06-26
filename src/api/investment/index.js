import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { index, show, create, update, destroy, distributeRewards } from './controller';
import Investment from './model';

const router = new Router();
const { userId, parcId, amount, profitability_ratio, is_rewarded } = Investment.getAttributes();

router.get('/', query(), index);

router.get('/:id', show);

router.post('/', body({ userId, parcId, amount, profitability_ratio, is_rewarded }), create);

router.put('/:id', body({ amount, profitability_ratio, is_rewarded }), update);

router.delete('/:id', destroy);

router.post('/distribute-rewards', distributeRewards);

export default router;
