export type MedicationModel = {
  name: string;
  frequency: string;
  dose_time_freq: number;
  dose_time: string[];
  start_date: string;
  meal_timing: string;
  end_date: string;
  remarks: string;
  id: string;
  partitionKey: "medication";
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  prescribed_by: string;
  is_consumed: boolean;
};

// [
//   {
//     "name": "string",
//     "frequency": "daily",
//     "dose_time_freq": 0,
//     "dose_time": [
//       "02:27:47.966Z"
//     ],
//     "start_date": "2024-04-16",
//     "meal_timing": "before",
//     "end_date": "2024-04-16",
//     "remarks": "string",
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "partitionKey": "medication",
//     "created_by": "string",
//     "created_at": "2024-04-16T02:27:47.967Z",
//     "updated_by": "string",
//     "updated_at": "2024-04-16T02:27:47.967Z"
//   }
// ]

export type MedicationPostPutModel = {
  name: string;
  frequency: string;
  dose_time_freq: number;
  dose_time: string[];
  start_date: string;
  meal_timing: string;
  end_date: string;
  remarks: string;
  prescribed_by: string;
  is_consumed: boolean;
};

// "name": "string",
// "frequency": "daily", ----------------"'daily', 'weekly' or 'monthly'"
// "dose_time_freq": 0,
// "dose_time": [
//   "02:42:24.455Z"
// ],
// "meal_timing": "before",  ------------'before', 'after', 'with' or 'any'"
// "remarks": "string"
// "start_date": "2024-04-16",
// "end_date": "2024-04-16",
