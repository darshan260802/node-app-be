import { Test, TestingModule } from '@nestjs/testing';
import { UpdateDeleteController } from './update-delete.controller';

describe('UpdateDeleteController', () => {
  let controller: UpdateDeleteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateDeleteController],
    }).compile();

    controller = module.get<UpdateDeleteController>(UpdateDeleteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
