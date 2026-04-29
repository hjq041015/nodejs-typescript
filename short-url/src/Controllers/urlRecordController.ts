import validator from "validator";
import { URLRecordResponse } from "../types/Response.ts";
import { Request, Response } from "express";
import {
  getUrlRecordByOriginalUrl,
  getUrlRecordByUrlCode,
  insertUrlRecord,
} from "../services/urlRecordService,.ts";
import { generateShortURL } from "../utils/urlHelper.ts";

interface CreateURLRecordRequest extends Request {
  body: {
    originalUrl: string;
    urlCode?: string;
  };
}

export async function createUrlRecord(
  req: CreateURLRecordRequest,
  res: Response<URLRecordResponse>,
) {
  const { originalUrl, urlCode } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "Original URL is required" });
  }

  if (!validator.isURL(originalUrl)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  const urlRecord = await getUrlRecordByOriginalUrl(originalUrl);

  if (urlRecord) {
    return res
      .status(200)
      .json({ message: "URL already exists", data: urlRecord });
  }

  if (urlCode) {
    const urlRecord = await getUrlRecordByUrlCode(urlCode);
    if (urlRecord) {
      return res.status(400).json({ message: "URL code already exists" });
    }

    const shortUrl = await generateShortURL(urlCode);
    const createUrlRecord = await insertUrlRecord(
      originalUrl,
      shortUrl,
      urlCode,
    );

    return res.status(201).json({
      message: "URL record created successfully",
      data: createUrlRecord,
    });
  }

  const shortUrl = await generateShortURL();
  const createUrlRecord = await insertUrlRecord(
    originalUrl,
    shortUrl,
    shortUrl.split("/").at(-1)!,
  );

  return res.status(201).json({
    message: "URL record created successfully",
    data: createUrlRecord,
  });
}
