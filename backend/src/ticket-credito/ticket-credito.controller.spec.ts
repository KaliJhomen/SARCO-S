import { Test, TestingModule } from '@nestjs/testing';
import { TicketCreditoController } from './ticket-credito.controller';
import { TicketCreditoService } from './ticket-credito.service';

describe('TicketCreditoController', () => {
  let controller: TicketCreditoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketCreditoController],
      providers: [TicketCreditoService],
    }).compile();

    controller = module.get<TicketCreditoController>(TicketCreditoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
