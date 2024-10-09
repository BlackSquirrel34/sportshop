// defines three model interfaces that provide the building blocks for a basic product catalog.
// much of the additional complexity in shop apps relates to external processes, 
// such as procurement, dispatch, customer service, and so on
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
// adding pagination types
// allows the pagination requirements associated with a query to be provided to the repository.
export interface ProductQueryParameters {
    pageSize?: number;
    page?: number;
    category?: number;
    searchTerm?: string;
}
// describes the response the repository will produce, which contains the page of data and 
// the total number of stored items. 
export interface ProductQueryResult {
    products: Product[];
    totalCount: number;
    categories: Category[];
}