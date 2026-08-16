import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommunityUsecase } from '../../usecase/create-community.usecase';
import { RegisterCommunityDto } from '../dto/register-community.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Community')
@Controller('community')
export class CommunityController {
    constructor(
        private readonly createCommunityUsecase: CreateCommunityUsecase
    ) {}

    @Post('register')
    @ApiOperation({
        summary: 'Create a new community',
        description: 'This endpoint allows you to create a new community by providing the necessary information.',
    })
    @ApiOkResponse({
        description: 'The community has been created successfully.',
    })
    @ApiInternalServerErrorResponse({
        description: 'An internal server error occurred while processing the request.',
    })
    @ApiBadRequestResponse({
        description: 'The request is malformed or missing required parameters.',
    })
    @ApiCreatedResponse({
        description: 'The community has been created successfully.',
    })
    async createCommunity(
        @Body() registerCommunityDto: RegisterCommunityDto
    ) {
        return await this.createCommunityUsecase.execute(registerCommunityDto);
    }
}
