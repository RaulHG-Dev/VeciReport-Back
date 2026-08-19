import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommunityUsecase } from '../../usecase/create-community.usecase';
import { RegisterCommunityDto } from '../dto/register-community.dto';

@ApiTags('Community')
@Controller('community')
export class CommunityController {
    constructor(
        private readonly createCommunityUsecase: CreateCommunityUsecase
    ) {}

    @Post('register')
    @ApiOperation({
        summary: 'Create a new community',
        description: 'This endpoint allows you to create a new community by providing the necessary information. The request body should contain a JSON object with the community details.',
    })
    @ApiOkResponse({
        description: 'The community has been created successfully.',
        schema: {
            example: {
                id: 1,
                name: 'Example Community',
                description: 'A community for example purposes.',
                createdAt: '2023-10-01T00:00:00Z'
            }
        }
    })
    @ApiInternalServerErrorResponse({
        description: 'An internal server error occurred while processing the request.',
        schema: {
            example: {
                message: 'Internal server error'
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'The request is malformed or missing required parameters.',
        schema: {
            example: {
                message: 'Invalid input'
            }
        }
    })
    @ApiCreatedResponse({
        description: 'The community has been created successfully.',
        schema: {
            example: {
                id: 1,
                name: 'Example Community',
                description: 'A community for example purposes.',
                createdAt: '2023-10-01T00:00:00Z'
            }
        }
    })
    async createCommunity(
        @Body() registerCommunityDto: RegisterCommunityDto
    ) {
        return await this.createCommunityUsecase.execute(registerCommunityDto);
    }
}

