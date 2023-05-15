import { Controller, Get } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentUser } from "src/decorators/user.decorator";

@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get("main")
  @Auth()
  getMain(@CurrentUser("id") id: number) {
    return this.statisticsService.getMain(id);
  }
}
