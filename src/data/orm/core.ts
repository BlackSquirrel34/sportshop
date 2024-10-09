import { Sequelize } from "sequelize";
import { getConfig } from "../../config";
import { initializeModels, CategoryModel, ProductModel, SupplierModel }
    from "./models";
import { readFileSync } from "fs";
const config = getConfig("catalog:orm_repo");
const logging = config.logging
        ? { logging: console.log, logQueryParameters: true}
        : { logging: false };

// BaseRepo class is responsible for configuring Sequelize, which is done by reading a configuration
// section, appending the logging settings, and invoking the constructor. 
export class BaseRepo {
    sequelize: Sequelize;
   
    constructor() {
        this.sequelize = new Sequelize({ ...config.settings, ...logging })
        this.initModelsAndDatabase();
    }
    // model that calls the initializeModels function and, if configured, resets the database and 
    // invokes the addSeedData method to populate the database with seed data. 
    async initModelsAndDatabase() : Promise<void> {
        initializeModels(this.sequelize);
        if (config.reset_db) {
            await this.sequelize.drop();
            await this.sequelize.sync();
            await this.addSeedData();
        } else {
            await this.sequelize.sync();           
        }
    }  
    // reads a JSON data file and uses the Sequelize bulkCreate method to store multiple objects in a single operation. 
    async addSeedData() {
        const data = JSON.parse(readFileSync(config.seed_file).toString());
        await this.sequelize.transaction(async (transaction) => {
            await SupplierModel.bulkCreate(data.suppliers, { transaction });
            await CategoryModel.bulkCreate(data.categories, { transaction });
            await ProductModel.bulkCreate(data.products, { transaction });
        });
    }   
}
// defines a type that will be used to create the mixin and 
// represents a type that can be instantiated with the new keyword.
export type Constructor<T = {}> = new (...args: any[]) => T;