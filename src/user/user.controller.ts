import {
  Body,
  Controller,
  Get,
  HttpCode,
  Put,
  UsePipes,
  Patch,
  ValidationPipe,
  Param,
} from "@nestjs/common";

import { UserService } from "./user.service";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentUser } from "src/decorators/user.decorator";
import { UserDto } from "./dto/user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get profile
  //toggle favorites
  // update profile
  @Auth()
  @Get("profile")
  async getProfile(@CurrentUser("id") id: number) {
    return this.userService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put("profile")
  async getNewToken(@CurrentUser("id") id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Patch("profile/favorites/:productId")
  async toggleFavorite(
    @Param("productId") productId: string,
    @CurrentUser("id") id: number
  ) {
    return this.userService.toggleFavorite(id, +productId);
  }
}
