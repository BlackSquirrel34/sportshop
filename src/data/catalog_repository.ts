// The use of a repository means that the details of how data is stored 
// don’t have to align with how data is used by the rest of the application. 
// stores data without transformation, ensuring that the results of querying the database, 
// for example, are objects whose type matches the expectations of the rest of the application. 
// This approach doesn’t require conversion functions, but it can require some effort to override
// the default behavior of the ORM package.
import { Category, Product, Supplier } from "./catalog_models";

// defines methods to query and store objects that 
// defines methods to query and store objects that implement the Product, Category, and Supplier interfaces.implement the Product, Category, and Supplier interfaces.
export interface CatalogRepository {
    getProducts(): Promise<Product[]>;
    storeProduct(p: Product): Promise<Product>;
    getCategories() : Promise<Category[]>;
    storeCategory(c: Category): Promise<Category>;
    getSuppliers(): Promise<Supplier[]>;
    storeSupplier(s: Supplier): Promise<Supplier>;
}