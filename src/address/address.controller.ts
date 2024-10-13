import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Lấy danh sách địa chỉ của người dùng' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, description: 'Danh sách địa chỉ' })
  async getAddressesByUserId(@Param('userId') userId: string) {
    return this.addressService.getAddressesByUserId(parseInt(userId));
  }
}
