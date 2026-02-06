import type { Request, Response } from 'express';
import { SlotService } from '../services/slot.service.js';
import { Logger } from '../utils/logger.js';
import { RequestIdDto } from '../dtos/request-id.dto.js';
import RequestCreateSlotDto from '../dtos/request-create-slot.dto.js';
import RequestUpdateSlotDto from '../dtos/request-update-slot.dto.js';

export class SlotController {
  private logger = new Logger('SlotController');

  constructor(private slotService: SlotService) {}

  async getSlots(_: Request, res: Response) {
    const slots = await this.slotService.getAllSlots();

    res.json({
      success: true,
      data: slots,
    });
  }

  async getSlotById(req: Request, res: Response) {
    const params = new RequestIdDto(req.params);

    const slot = await this.slotService.getSlotByIdOrThrow(params.id);

    res.json({
      success: true,
      data: slot,
    });
  }

  async createSlot(req: Request, res: Response) {
    const body = new RequestCreateSlotDto(req.body);

    const slot = await this.slotService.createSlotOrThrow(body);

    this.logger.log(`Slot created with id: ${slot.id}`);

    res.status(201).json({
      success: true,
      data: slot,
      message: 'Slot created successfully',
    });
  }

  async updateSlot(req: Request, res: Response) {
    const { id } = new RequestIdDto(req.params);

    const body = new RequestUpdateSlotDto(req.body);

    const slot = await this.slotService.updateSlotOrThrow(id, body);

    this.logger.log(`Slot ${id} updated successfully`);

    res.json({
      success: true,
      data: slot,
      message: 'Slot updated successfully',
    });
  }

  async removeSlot(req: Request, res: Response) {
    const { id } = new RequestIdDto(req.params);

    const slot = await this.slotService.deleteSlotOrThrow(id);

    this.logger.log(`Slot ${id} deleted successfully`);

    res.json({
      success: true,
      data: slot,
      message: 'Slot deleted successfully',
    });
  }
}
