import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

import catchAsync from '../../utils/catchAsync';
import { CarServices } from './car.service';

const createCar =catchAsync( async (req, res) => {
  const {  car: carData } = req.body;
    

    const result = await CarServices.createCarIntoDB(
      
        carData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car is created succesfully',
      data: result,
    });
});

const getAllCars= catchAsync(async (req, res) => {
    const result = await CarServices.getAllCarsFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Cars are retrieved successfully',
      data: result,
    });
  });
  const getSingleCar = catchAsync(async (req, res) => {
    const { carId } = req.params;
    
    const result =
      await CarServices.getSingleCarFromDB(carId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Car is retrieved succesfully',
      data: result,
    });
  });

  const updateCar= catchAsync(async (req, res) => {
    const { carId } = req.params;
    const result = await CarServices.updateCarIntoDB(
        carId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'A Car is Updated succesfully',
      data: result,
    });
  });

  const deletedCar = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CarServices.deleteCarFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Car is deleted succesfully',
      data: result,
    });
  });
  
export const CarControllers = {
    createCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deletedCar
};
