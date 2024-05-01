export type DietModel = {
  user_id: string;
  diet_date: string;
  breakfast: {
    time: string;
    item: string;
    calorie_count: number;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
  };
  middaymeal: {
    time: string;
    item: string;
    calorie_count: number;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
  };
  lunch: {
    time: string;
    item: string;
    calorie_count: number;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
  };
  evening: {
    time: string;
    item: string;
    calorie_count: number;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
  };
  dinner: {
    time: string;
    item: string;
    calorie_count: number;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
  };
  water: string;
  id: string;
  partitionKey: "diet";
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
};

export type DietPostPutModel = {
  user_id: string;
  diet_date: string;
  breakfast: {
    time: string;
    item: string;
    calorie_count: number;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
  };
  middaymeal: {
    time: string;
    item: string;
    calorie_count: number;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
  };
  evening: {
    time: string;
    item: string;
    calorie_count: number;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
  };
  dinner: {
    time: string;
    item: string;
    calorie_count: number;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
  };
  water: string;
};
