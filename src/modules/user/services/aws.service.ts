import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private client: S3Client;
  constructor(private readonly configService: ConfigService) {
    const awsConfig = {
      accessKey: this.configService.get<string>('AWS_ACCESS_KEY'),
      secretKey: this.configService.get<string>('AWS_SECRET_KEY'),
      bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      region: this.configService.get<string>('AWS_S3_REGION'),
    };
    const params: S3ClientConfig = {
      region: awsConfig.region,
      credentials: {
        accessKeyId: awsConfig.accessKey,
        secretAccessKey: awsConfig.secretKey,
      },
    };
    this.client = new S3Client(params);
  }

  public async uploadFile(
    file: Express.Multer.File,
    itemType: 'avatar',
    name: string,
  ): Promise<string> {
    const config = this.configService.get('aws');
    const filePath = this.buildPath(itemType, name, file.originalname);
    await this.client.send(
      new PutObjectCommand({
        Key: filePath,
        ACL: 'public-read',
        Bucket: config.bucket,
        Body: file.buffer,
      }),
    );
    return `https://black-circle-faq-team.s3.us-east-2.amazonaws.com/${filePath}`;
  }

  private buildPath(itemType: string, name: string, fileName: string): string {
    return `${itemType}/${name}/${crypto.randomUUID()}${fileName}`;
  }
}
