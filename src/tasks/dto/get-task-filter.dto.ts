import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.status.enum";

export class GetTaskFilterDto {

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    search?: string;
}