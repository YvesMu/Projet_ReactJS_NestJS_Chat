import { Controller, Get, Put, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('ping')
  ping() {
    return { message: 'pong' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('color')
  async getColor(@Request() req) {
    const user = await this.userService.findById(req.user.userId); 
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      color: user.color || '#000000',
      username: user.username,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('color')
  async updateColor(@Request() req, @Body('color') color: string) {
    const user = await this.userService.findById(req.user.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.color = color;
    await this.userService.save(user);
    return {
      message: 'Color updated successfully',
      color: user.color,
    };
  }
}
