// Base types
export type Product = {
    id: string;
    name: string;
    availability: boolean;
    quantity: number;
    price: number;
    pictures: string[];
  };
  
  export type Farm = {
    id: string;
    farmName: string;
    ownerName: string;
    address: string;
    latitude: number;
    longitude: number;
    pictures: string[];
    description: string;
    tags: string[];
    ratings: number;
    products: Product[];
  };
  
  // GraphQL Input Types
  export type ProductInput = {
    name: string;
    availability: boolean;
    quantity: number;
    price: number;
    pictures: string[];
  };
  
  export type FarmInput = {
    farmName: string;
    ownerName: string;
    address: string;
    latitude: number;
    longitude: number;
    pictures: string[];
    description?: string;
    tags?: string[];
    ratings?: number;
    products?: ProductInput[];
  };
  
  // API Response Types
  export type QueryResponse<T> = {
    data?: T;
    loading: boolean;
    error?: Error;
  };
  
  // Navigation Param Types
  export type RootStackParamList = {
    '(tabs)': undefined;
    farmDetails: { id: string };
    create: undefined;
    '+not-found': undefined;
  };
  
//   // Component Props
//   export type FarmCardProps = {
//     farm: Farm;
//     onPress?: () => void;
//     style?: ViewStyle;
//   };
  
  export type FarmListProps = {
    farms: Farm[];
    onFarmPress: (farmId: string) => void;
    loading?: boolean;
  };
  
  // Location Types
  export type Coordinates = {
    latitude: number;
    longitude: number;
  };
  
  export type Region = Coordinates & {
    latitudeDelta: number;
    longitudeDelta: number;
  };
  
  // Form Types
  export type CreateFarmFormValues = {
    farmName: string;
    ownerName: string;
    address: string;
    coordinates: Coordinates;
    description: string;
    tags: string;
    products: ProductInput[];
  };