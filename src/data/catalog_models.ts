// defines three model interfaces that provide the building blocks for a basic product catalog.
export interface  Product {
    id?: number;
    name: string;
    description: string;
    price: number;
   
    category?: Category;
    supplier?: Supplier;
}
export interface Category {
    id?: number;
    name: string;
    products?: Product[];
}
export interface Supplier {
    id?: number;
    name: string;
   
    products?: Product[];
}