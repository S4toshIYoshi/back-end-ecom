import {
  Body,
  Controller,
  Post,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { TokenDto } from "./dto/token.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Token
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("login/access-token")
  async accessToken(@Body() dto: TokenDto) {
    return this.authService.getNewToken(dto.refreshToken);
  }
  //Login
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("login")
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
  //register
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("register")
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
}
