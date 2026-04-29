import express, { type Router } from "express";
import { getOriginalUrl } from "../Controllers/urlRedirectContrller.ts";

const urlRedirectRouter: Router = express.Router();

urlRedirectRouter.route("/:urlCode").get(getOriginalUrl);

export default urlRedirectRouter;
