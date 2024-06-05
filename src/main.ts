import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { ERouteName } from 'src/common/enums/route-name.enum';
import { HttpExceptionFilter } from 'src/common/filters/httpException.filter';
import { swgBuilderLabels } from 'src/utils/generalConstants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle(swgBuilderLabels.title)
    .setDescription(swgBuilderLabels.description)
    .setVersion(swgBuilderLabels.version)
    .addTag(swgBuilderLabels.tag)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ERouteName.DOCS_ROUTE, app, document);

  const port = configService.get<number>('SERVER_PORT');
  await app.listen(port);
}
bootstrap();
