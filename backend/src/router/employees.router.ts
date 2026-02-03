import { Router } from 'express';
import { EmployeeController } from '../controllers/employees.controller.js';
import { EmployeeService } from '../services/employee.service.js';
import { asyncHandler } from '../middleware/error-handler.middleware.js';

const employeesRouter = Router();
const entityName = 'employees';

const employeeService = new EmployeeService();
const employeeController = new EmployeeController(employeeService);

employeesRouter
  .route('/employees')
  .get(asyncHandler(async (req, res) => employeeController.getEmployees(req, res)))
  .post(asyncHandler(async (req, res) => employeeController.createEmployee(req, res)));

employeesRouter
  .route(`/${entityName}/:id`)
  .get(asyncHandler(async (req, res) => employeeController.getEmployeeById(req, res)))
  .put(asyncHandler(async (req, res) => employeeController.updateEmployee(req, res)))
  .delete(asyncHandler(async (req, res) => employeeController.removeEmployee(req, res)));

export default employeesRouter;
