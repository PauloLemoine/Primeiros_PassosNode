import { AppDataSource } from "./db/data_source";

AppDataSource.initialize()
    .then(() => {
        console.log(`Database is running.`);
    })
    .catch((error) => console.log(error))