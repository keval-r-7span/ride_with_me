import Joi, { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

interface Driver {
  name: string;
  email: string;
  phoneNumber: string;
  availability?: string;
  password: string;
  role?: string;
}

const driverJoiSchema: Schema<Driver> = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(10).required(),
  availability: Joi.string().valid("available", "unavailable"),
  password: Joi.string().min(3).required(),
  role: Joi.string().default("driver"),
});

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const { error } = driverJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


interface Vehicle {
  manufacturer: string;
  model: string;
  year: string;
  licensePlate: string;
  color?: string;
  vehicleClass: string;
  baseFare: number;
  driverId: string;
}

const addVehicleSchema: Schema<Vehicle> = Joi.object({
  manufacturer: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.string().min(4).max(4).required(),
  licensePlate: Joi.string().required(),
  color: Joi.string(),
  vehicleClass: Joi.string()
    .valid("Bike", "Rickshaw", "mini", "premius", "xl")
    .required(),
  baseFare: Joi.number().required(),
  driverId: Joi.string().required(),
});

const validateAddVehicle = (req: Request, res: Response, next: NextFunction) => {
  const { error } = addVehicleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


export { validateRequest, validateAddVehicle };
