// The use of a repository means that the details of how data is stored 
// don’t have to align with how data is used by the rest of the application. 
// stores data without transformation, ensuring that the results of querying the database, 
// for example, are objects whose type matches the expectations of the rest of the application. 
// This approach doesn’t require conversion functions, but it can require some effort to override
// the default behavior of the ORM package.
// Note: This isn’t an issue if you are using an object database, such as MongoDB, 
// or if you are writing native SQL queries without using an ORM package.
import { Category, Product, Supplier, ProductQueryParameters,
    ProductQueryResult } from "./catalog_models";
export interface CatalogRepository {
    getProducts(params?: ProductQueryParameters): Promise<ProductQueryResult>;
    getProductDetails(ids: number[]): Promise<Product[]>;
    storeProduct(p: Product): Promise<Product>;
    getCategories() : Promise<Category[]>;
    storeCategory(c: Category): Promise<Category>;
    getSuppliers(): Promise<Supplier[]>;
    storeSupplier(s: Supplier): Promise<Supplier>;
}