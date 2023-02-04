import { NextApiRequest, NextApiResponse } from "next";
import { cma, CROP_MAPPING, FARMS } from "../../util/lib";

const fmt = (str: string) => cma(str).toLowerCase().replace(/\W/g, "");

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.query.q as string;
  const crops = Object.entries(CROP_MAPPING).filter(
    ([id, crop]) => fmt(crop).includes(fmt(q)) || id.toString().includes(q)
  );
  const farms = FARMS.filter((farm) =>
    farm.toLowerCase().includes(q.toLowerCase())
  );

  res.json({ success: true, data: { crops, farms } });
};

export default search;
