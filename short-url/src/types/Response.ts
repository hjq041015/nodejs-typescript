import { urlRecord } from "./URLRecord.ts";

type ErrorResponse = {
  message: string;
};

type SuccessResponse = {
  message: string;
  data: urlRecord | string;
};

export type URLRecordResponse = ErrorResponse | SuccessResponse;
