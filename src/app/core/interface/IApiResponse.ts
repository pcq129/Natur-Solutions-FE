import { HttpStatusCode } from "@angular/common/http";

export interface IApiResponse {
  success: boolean,
  data: any,
  message: string,
  code: HttpStatusCode
}
