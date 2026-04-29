import { bigint, pgTable, varchar } from "drizzle-orm/pg-core";

export const urlRecordTable = pgTable("urlRecord", {
  id: bigint({ mode: "number" }).primaryKey(),
  originalUrl: varchar({ length: 255 }).notNull(),
  shortUrl: varchar({ length: 255 }).notNull(),
  urlCode: varchar({ length: 255 }).notNull().unique(),
});
