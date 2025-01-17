export interface CoffeeBean {
  id: number;
  name: string;
  roastLevel: string;
}

export interface EspressoLog {
  id: number;
  beanId: number;
  grindSize: string;
  weight: number;
  brewTime: number;
  temperature?: number;
  yield: number;
  notes?: string;
  tastes: string[];
  timestamp: string;
}
