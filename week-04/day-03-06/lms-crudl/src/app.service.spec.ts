import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('hello', () => {
    it('should return a hello world message', async () => {
      const result = await appService.hello();
      expect(result).toEqual({
        message:
          'Hello, World! Library Management System by Muhammad Asad Ullah',
      });
    });
  });
});
