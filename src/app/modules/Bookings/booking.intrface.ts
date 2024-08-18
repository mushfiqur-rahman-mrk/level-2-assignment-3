import { Types } from "mongoose";

export type TBooking = {
    id: Types.ObjectId;
    date: Date;
    user: Types.ObjectId; // assuming it's a reference to the user's ID (as a string)
    car: Types.ObjectId;  // assuming it's a reference to the car's ID (as a string)
    startTime: string;
    endTime?: string; // 24hr format, e.g., "14:00"

    totalCost: number;
}