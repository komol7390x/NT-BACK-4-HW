import { CrateUsersDto } from "./create-user.sto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUsersDto extends PartialType(CrateUsersDto){}