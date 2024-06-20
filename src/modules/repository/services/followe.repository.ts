import { Injectable } from '@nestjs/common';
import { FollowEntity } from 'src/entities/follow.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FollowRepository extends Repository<FollowEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FollowEntity, dataSource.manager);
  }
}
