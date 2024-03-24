import clientPromise from "@/lib/mongodb";
import { MongoConfigService } from "@/services/MongoConfigService";
import { ObjectId } from "mongodb";

const connectToDb = async () => {
  const client = await clientPromise;
  return client.db(MongoConfigService.databases.mflix);
};

export const OrmService = {
  // Read all
  connectAndFindAll: async (
    dbName: string,
    relatedIdProperty?: string,
    relatedIdObjectToFind?: string
  ) => {
    const db = await connectToDb();

    // Construct the filter object based on the provided parameters
    let filter = {};
    if (relatedIdProperty && relatedIdObjectToFind) {
      filter = {
        [relatedIdProperty]: new ObjectId(relatedIdObjectToFind as string),
      };
    }
    // Perform find operation using the provided filter
    return await db
      .collection(dbName)
      .aggregate([
        { $match: filter }, // Filter the documents
        { $sample: { size: 50 } }, // Select 50 random documents
      ])
      .toArray();
  },

  // Read one
  connectAndFindOne: async (
    dbName: string,
    IdObjectToFind: string,
    relatedIdProperty?: string,
    relatedIdObjectToFind?: string
  ) => {
    const db = await connectToDb();

    // Construct the filter object based on the provided parameters
    let filter: any = { _id: new ObjectId(IdObjectToFind) };
    if (relatedIdProperty && relatedIdObjectToFind) {
      filter[relatedIdProperty] = new ObjectId(relatedIdObjectToFind);
    }

    // Perform findOne operation using the provided filter
    return await db.collection(dbName).findOne(filter);
  },

  // Create one
  connectAndInsertOne: async (
    dbName: string,
    payload: any,
    relatedIdProperty?: string,
    relatedIdObjectToFind?: string
  ) => {
    const db = await connectToDb();

    // Construct the payload object based on the provided parameters
    if (relatedIdProperty && relatedIdObjectToFind) {
      payload[relatedIdProperty] = new ObjectId(relatedIdObjectToFind);
    }
    // Perform insertOne operation using the provided payload
    const result = await db.collection(dbName).insertOne(payload);
    return result.insertedId;
  },

  // Update one
  connectAndUpdateOne: async (
    dbName: string,
    idObjectToUpdate: string,
    payload: any,
    relatedIdProperty?: string,
    relatedIdObjectToFind?: string
  ) => {
    const db = await connectToDb();

    // Construct the filter object based on the provided parameters
    let filter: any = { _id: new ObjectId(idObjectToUpdate) };
    if (relatedIdProperty && relatedIdObjectToFind) {
      filter[relatedIdProperty] = new ObjectId(relatedIdObjectToFind);
    }

    const result = await db
      .collection(dbName)
      .updateOne(filter, { $set: payload });
    return result.modifiedCount;
  },

  // Delete one
  connectAndDeleteOne: async (
    dbName: string,
    idObjectToDelete: string,
    relatedIdProperty?: string,
    relatedIdObjectToFind?: string
  ) => {
    const db = await connectToDb();

    // Construct the filter object based on the provided parameters
    let filter: any = { _id: new ObjectId(idObjectToDelete) };
    if (relatedIdProperty && relatedIdObjectToFind) {
      filter[relatedIdProperty] = new ObjectId(relatedIdObjectToFind);
    }
    // Perform deleteOne operation using the provided filter
    const result = await db.collection(dbName).deleteOne(filter);
    return result.deletedCount;
  },
};
