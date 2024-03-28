import Joi, { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

// Update Driver Schema
interface UpdateDriver {
  name?: string;
  phoneNumber?: string;
  availability?: string;
  vehicleDetails?: string;
}

const updateDriverSchema: Schema<UpdateDriver> = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(10).max(10),
  availability: Joi.string().valid("available", "unavailable"),
  vehicleDetails: Joi.string(),
});

const validateUpdateRequest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateDriverSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Update Vehicle Schema
interface UpdateVehicle {
  manufacturer?: string;
  model?: string;
  year?: string;
  licensePlate?: string;
  color?: string;
  vehicleClass?: string;
  baseFare?: number;
}

const updateVehicleSchema: Schema<UpdateVehicle> = Joi.object({
  manufacturer: Joi.string(),
  model: Joi.string(),
  year: Joi.string().min(4).max(4),
  licensePlate: Joi.string(),
  color: Joi.string(),
  vehicleClass: Joi.string().valid("Bike", "Rickshaw", "mini", "premius", "xl"),
  baseFare: Joi.number(),
});

const validateUpdateVehicle = (req: Request, res: Response, next: NextFunction) => {
  const { error } = updateVehicleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


export { validateUpdateRequest, validateUpdateVehicle };
