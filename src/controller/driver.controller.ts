import { Request, Response } from 'express';

import { Driver } from '../database/models/driver.model';

export const getAll = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const token = req.userToken;
    // console.log(token);

    const { companyId } = token;

    const drivers = await Driver.findAll({
      where: {
        idazien: companyId,
      },
    });

    if (drivers.length > 0) {
      res.status(200).json({
        result: drivers.map((driver) => ({
          id: driver.id_driver,
          companyId: driver.idazien,
          auxId: driver.cod_driver,
          extId: driver.idext,
          nickname: driver.nickname,
          name: driver.nome,
          surname: driver.cognome,
          email: driver.email,
          codeAuth: driver.cod_auth,
          regId: driver.gcm_regid,
          regId2: driver.mytimes_regid,
          imei: driver.imei,
          imei2: driver.mytimes_imei,
          enable: driver.enable_mokers,
          enable2: driver.enable_mytimes,
          appVersion: driver.app_version,
          appVersion2: driver.mytimes_app_version,
        })),
        error: null,
      });
    } else {
      res.status(200).json({ result: [], error: null });
    }

    return;
  } catch (e) {
    res.status(500).send({ errorMessage: e.message, errors: e.errors });
  }
};
