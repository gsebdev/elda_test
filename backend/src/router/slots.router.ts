import { Router } from 'express';
import { SlotController } from '../controllers/slots.controller.js';
import { SlotService } from '../services/slot.service.js';
import { asyncHandler } from '../middleware/error-handler.middleware.js';

const slotsRouter = Router();
const entityName = 'slots';

const slotService = new SlotService();
const slotController = new SlotController(slotService);

slotsRouter
  .route('/slots')
  .get(asyncHandler(async (req, res) => slotController.getSlots(req, res)))
  .post(asyncHandler(async (req, res) => slotController.createSlot(req, res)));

slotsRouter
  .route(`/${entityName}/:id`)
  .get(asyncHandler(async (req, res) => slotController.getSlotById(req, res)))
  .put(asyncHandler(async (req, res) => slotController.updateSlot(req, res)))
  .delete(asyncHandler(async (req, res) => slotController.removeSlot(req, res)));

export default slotsRouter;
