import { success, notFound } from '../../services/response/';
import Investment from './model';
import { Client, TransferTransaction, AccountId, Hbar } from "@hashgraph/sdk";
import {ServerClient} from "../../services/hedera";

const client = ServerClient

export const index = async ({ querymen: { query, select, cursor } }, res, next) => {
  try {
    const count = await Investment.count();
    const investments = await Investment.findAll({ where: query, attributes: select, offset: cursor.skip, limit: cursor.limit });
    const response = {
      rows: investments.map((investment) => investment.view(true)),
      count,
    };
    success(res)(response);
  } catch (error) {
    next(error);
  }
};

export const show = async ({ params }, res, next) => {
  try {
    const investment = await Investment.findByPk(params.id);
    if (!investment) {
      notFound(res)();
    } else {
      success(res)(investment.view());
    }
  } catch (error) {
    next(error);
  }
};

export const create = async ({ bodymen: { body } }, res, next) => {
  try {
    const investment = await Investment.create(body);
    success(res, 201)(investment.view(true));
  } catch (error) {
    next(error);
  }
};

export const update = async ({ bodymen: { body }, params }, res, next) => {
  try {
    const investment = await Investment.findByPk(params.id);
    if (!investment) {
      notFound(res)();
      return;
    }
    const updatedInvestment = await investment.update(body);
    success(res)(updatedInvestment.view(true));
  } catch (error) {
    next(error);
  }
};

export const destroy = async ({ params }, res, next) => {
  try {
    const investment = await Investment.findByPk(params.id);
    if (!investment) {
      notFound(res)();
      return;
    }
    await investment.destroy();
    success(res, 204)();
  } catch (error) {
    next(error);
  }
};

export const distributeRewards = async (req, res, next) => {
  try {
    const investments = await Investment.findAll({ where: { is_rewarded: false } });
    for (const investment of investments) {
      const rewardAmount = investment.amount * investment.profitability_ratio;

      const transferTransaction = await new TransferTransaction()
        .addHbarTransfer(client.operatorAccountId, new Hbar(-rewardAmount))
        .addHbarTransfer(AccountId.fromString(investment.userId), new Hbar(rewardAmount))
        .execute(client);

      await transferTransaction.getReceipt(client);

      await investment.update({ is_rewarded: true });
    }
    success(res)({ message: 'Rewards distributed successfully' });
  } catch (error) {
    next(error);
  }
};
