import {
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Post,
  Param,
  Body,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { Auth } from "src/decorators/auth.decorator";
import { ReviewDto } from "./review.dto";
import { CurrentUser } from "src/decorators/user.decorator";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  //-----------------------------------------------------------------------------------
  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }
  //-----------------------------------------------------------------------------------

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("leave/:productId")
  @Auth()
  async leaveReview(
    @CurrentUser("id") id: number,
    @Param("productId") productId: string,
    @Body() dto: ReviewDto
  ) {
    return this.reviewService.create(id, dto, +productId);
  }
  //-----------------------------------------------------------------------------------
}
