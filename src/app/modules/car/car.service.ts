import { TCar } from './car.interface';
import { Car } from './car.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';



const createCarIntoDB = async ( payload: TCar) => {
  // create a user object
  
  const result = await Car.create( payload);
  return result;
  //set manually generated it
  
};

const getAllCarsFromDB = async () => {
    const result = await Car.find();
    return result;
  };
  const getSingleCarFromDB = async (id: string) => {
    const result = await Car.findById(id);
    return result;
  };

  const updateCarIntoDB = async (
    id: string,
    payload: Partial<TCar>,
  ) => {
    
  
    const result = await Car.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };




  const deleteCarFromDB = async (id: string) => {    
    const deletedCar = await Car.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true},
      );
      
    if (!deletedCar) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Car');
      }
      return deletedCar;
  };


export const CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarFromDB
};
