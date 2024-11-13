import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('hello', () => {
    it('should return a hello world message', async () => {
      const result = await appController.hello();
      expect(result).toEqual({
        message:
          'Hello, World! Library Management System by Muhammad Asad Ullah',
      });
      expect(appService.hello).toHaveBeenCalled();
    });
  });
});
