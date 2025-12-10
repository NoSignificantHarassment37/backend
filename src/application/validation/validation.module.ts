import { JsonBodyGuard } from "./validation.interceptor";
import { Module } from "@nestjs/common";

@Module({
    providers: [JsonBodyGuard],
    exports: [JsonBodyGuard],
})
export class ValidationModule { }