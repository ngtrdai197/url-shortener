import { BaseResponseDto } from '@/common/dto/base-response.dto'
import {
  HttpStatus,
  INestApplication,
  Type,
  applyDecorators,
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiResponse,
  DocumentBuilder,
  SwaggerModule,
  getSchemaPath,
} from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Auth service')
    .setDescription('Auth service API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
}

export const ApiBaseResponse = <TDataDto extends Type<unknown>>(
  dto: TDataDto,
  options?: {
    statusCode: number
    isArray?: boolean
  },
) =>
  applyDecorators(
    ApiExtraModels(BaseResponseDto, dto),
    ApiResponse({
      status: options?.statusCode ?? HttpStatus.OK,
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: options?.isArray
                ? {
                    type: 'object',
                    items: { $ref: getSchemaPath(dto) },
                  }
                : { $ref: getSchemaPath(dto) },
            },
          },
        ],
      },
    }),
  )
