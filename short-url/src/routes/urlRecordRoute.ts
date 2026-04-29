import express, { type Router } from "express";
import { createUrlRecord } from "../Controllers/urlRecordController.ts";

const urlRecordRouter: Router = express.Router();

urlRecordRouter.route("/urlRecord").post(createUrlRecord);

export default urlRecordRouter;
