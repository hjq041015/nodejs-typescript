import { eq } from "drizzle-orm";
import { urlRecordTable } from "../db/schema.ts";
import { db } from "../utils/dbHelper.ts";

export async function getUrlRecordByUrlCode(urlCode: string) {
  const urlRecords = await db
    .select()
    .from(urlRecordTable)
    .where(eq(urlRecordTable.urlCode, urlCode));

  return urlRecords[0];
}

export async function getUrlRecordByOriginalUrl(originalUrl: string) {
  const urlRecords = await db
    .select()
    .from(urlRecordTable)
    .where(eq(urlRecordTable.originalUrl, originalUrl));

  return urlRecords[0];
}

export async function insertUrlRecord(
  originalUrl: string,
  shortUrl: string,
  urlCode: string,
) {
  const urlRecords = await db
    .insert(urlRecordTable)
    .values({
      id: Date.now(),
      originalUrl,
      shortUrl,
      urlCode,
    })
    .returning();

  return urlRecords[0];
}
