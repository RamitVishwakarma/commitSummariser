import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Commit, CommitSchema } from './schemas/commit.schema';
import { CommitsController } from './commits.controller';
import { CommitsService } from './commits.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Commit.name, schema: CommitSchema }])],
  controllers: [CommitsController],
  providers: [CommitsService],
  exports: [CommitsService],
})
export class CommitsModule {}
