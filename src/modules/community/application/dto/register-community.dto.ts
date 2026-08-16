import { IntersectionType } from "@nestjs/swagger";
import { CreateUserDto } from "src/modules/user/application/dto/create-user.dto";
import { CreateCommunityDto } from "./create-community.dto";

export class RegisterCommunityDto extends IntersectionType(
    CreateCommunityDto, CreateUserDto
) { }