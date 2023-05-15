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
  Post,
  Delete,
} from "@nestjs/common";

import { Auth } from "src/decorators/auth.decorator";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./category.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }
  //-----------------------------------------------------------------------------------
  @Get("by-slug/:slag")
  async getBySlug(@Param("slag") slag: string) {
    return this.categoryService.bySlug(slag);
  }
  //-----------------------------------------------------------------------------------
  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.categoryService.byId(+id);
  }
  //-----------------------------------------------------------------------------------

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(+id, dto);
  }
  //-----------------------------------------------------------------------------------

  @HttpCode(200)
  @Auth()
  @Post()
  async create() {
    return this.categoryService.create();
  }
  //-----------------------------------------------------------------------------------

  @HttpCode(200)
  @Auth()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.categoryService.delete(+id);
  }
  //-----------------------------------------------------------------------------------
}
