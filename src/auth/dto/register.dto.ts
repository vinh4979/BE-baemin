import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class RegisterDto {
    @ApiProperty({ example: 'John Doe', description: 'User name' })
    @IsNotEmpty()
    username: string

    @ApiProperty({ example: 'testUser@gmail.com', description: 'User email' })
    @IsEmail()
    email: string

    @ApiProperty({ example: '1234', description: 'User password' })
    @MinLength(4)
    password: string
}