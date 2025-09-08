import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/singup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() singUpDto: SignUpDto) {
    return this.authService.singUp(singUpDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
