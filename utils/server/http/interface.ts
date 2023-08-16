type ApiStatus = "success" | "failed";

export interface ApiResponse {
  status: ApiStatus;
  message: string;
  data: any;
}
