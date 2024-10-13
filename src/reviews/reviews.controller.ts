import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  
  @Get('restaurant/:id')
  findByRestaurantId(@Param('id') id: string) {
    return this.reviewsService.findByRestaurantId(+id);
  }
}
