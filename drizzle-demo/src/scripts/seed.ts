import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { faker } from "@faker-js/faker";
import { todoTable } from "../db/schema.ts";

const db = drizzle(process.env.DATABASE_URL!);

async function insertTodos(rowNumber: number = 10) {
  for (let i = 0; i < rowNumber; i++) {
    await db.insert(todoTable).values({
      id: Date.now() + i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }
}

await insertTodos();

const todos = await db.select().from(todoTable);
console.log(todos);
