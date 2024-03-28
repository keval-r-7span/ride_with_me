import  vehicleDetails  from '../models/vehicleDetails'; 

interface VehicleDetails {
  save(): unknown;
  manufacturer: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  vehicleClass: 'Bike' | 'Rickshaw' | 'mini' | 'premius' | 'xl';
  fare: number;
  driverId: string;
}

export const findVehicle = async (query: any): Promise<VehicleDetails | null> => { 
  try {
    return await vehicleDetails.findOne(query);
  } catch (error) {
    throw error;
  }
};

export const addVehicle = async (query: VehicleDetails): Promise<VehicleDetails> => {
  try {
    const createdVehicle = await vehicleDetails.create(query);
    return createdVehicle as VehicleDetails;
    // return await vehicleDetails.create(query);    // for above 2 lines replacement
  } catch (error) {
    throw error;
  }
};

export const updateVehicleDetails = async (
  id: string,
  query: Partial<VehicleDetails>
): Promise<VehicleDetails | null> => {
  try {
    return await vehicleDetails.findByIdAndUpdate(id, query);
  } catch (error) {
    throw error;
  }
};

export const vehicleService =  {findVehicle,addVehicle,updateVehicleDetails}