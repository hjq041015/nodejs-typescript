import { getUrlRecordByUrlCode } from "../services/urlRecordService,.ts";
import { URLRecordResponse } from "../types/Response.ts";
import type { Request, Response } from "express";

interface GetOriginURLRequest extends Request {
  params: {
    urlCode: string;
  };
}

export async function getOriginalUrl(
  req: GetOriginURLRequest,
  res: Response<URLRecordResponse>,
) {
  const { urlCode } = req.params;

  const urlRecords = await getUrlRecordByUrlCode(urlCode);

  if (!urlRecords) {
    return res.status(404).json({ message: "URL not found" });
  }

  return res
    .status(200)
    .json({ message: "Success", data: urlRecords.originalUrl });
}
