import { Test, TestingModule } from '@nestjs/testing';
import { TicketCreditoService } from './ticket-credito.service';

describe('TicketCreditoService', () => {
  let service: TicketCreditoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketCreditoService],
    }).compile();

    service = module.get<TicketCreditoService>(TicketCreditoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
