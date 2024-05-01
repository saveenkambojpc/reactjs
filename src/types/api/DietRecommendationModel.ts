export type DietRecommendationModel = {
  user_id: string;
  diet_date: string;
  diets: {
    type: string;
    time: string;
    item: string;
    calorie_count: 0;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
    is_consumed: false;
  }[];
  water: string;
  water_consumed: string;
  id: string;
  partitionKey: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
};

export type DietRecommendationPostModel = {
  user_id: string;
  diet_date: string;
  diets: {
    type: string;
    time: string;
    item: string;
    calorie_count: 0;
    portion_size: string;
    fats: string;
    proteins: string;
    carbs: string;
    is_consumed: false;
  }[];
  water: string;
  water_consumed: string;
};
