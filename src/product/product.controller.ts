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
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { GetAllProductDto } from "./dto/get-all.product.dto";
import { Auth } from "src/decorators/auth.decorator";
import { ProductDto } from "./dto/product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //-----------------------------------------------------------------------------------
  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto);
  }
  //-----------------------------------------------------------------------------------
  @Get(":id")
  async getProductById(@Param("id") id: string) {
    return this.productService.byId(+id);
  }
  //-----------------------------------------------------------------------------------
  @Get("similar/:id")
  async getBySlug(@Param("id") id: string) {
    return this.productService.getSimilar(+id);
  }
  //-----------------------------------------------------------------------------------
  @Get("by-slug/:slug")
  async getProductBySlug(@Param("slug") slug: string) {
    return this.productService.bySlug(slug);
  }
  //-----------------------------------------------------------------------------------
  @Get("by-category/:categorySlug")
  async getProductByCategory(@Param("categorySlug") categorySlug: string) {
    return this.productService.byCategory(categorySlug);
  }
  //-----------------------------------------------------------------------------------

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(":id")
  @Auth()
  async updateProduct(@Param("id") id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto);
  }
  //-----------------------------------------------------------------------------------
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createProduct() {
    return this.productService.create();
  }
  //-----------------------------------------------------------------------------------

  @HttpCode(200)
  @Delete(":id")
  @Auth()
  async delete(@Param("id") id: string) {
    return this.productService.delete(+id);
  }
  //-----------------------------------------------------------------------------------
}
