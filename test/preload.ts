import {afterAll, beforeAll} from "bun:test";
import {AppDataSource} from "../src/data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
  console.log("Connect to database")
});


afterAll(async () => {
  await AppDataSource.destroy();
  console.log("Destroy database connection")
});