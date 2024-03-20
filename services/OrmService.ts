import clientPromise from "@/lib/mongodb";
import { MongoConfigService } from "@/services/MongoConfigService";
import { ObjectId } from "mongodb";

const connectToDb = async () => {
  const client = await clientPromise;
  return client.db(MongoConfigService.databases.mflix);
};

export const OrmService = {
  // Read all
  connectAndFind: async (dbName: string, filter: Object | null = null) => {
    const db = await connectToDb();
    filter = filter || {};
    return await db.collection(dbName).find(filter).limit(10).toArray();
  },

  // Read all by id and idProperty
  connectAndFindAllById: async (
    dbName: string,
    idProperty: string,
    idObjectToFind: string
  ) => {
    const db = await connectToDb();
    return await db
      .collection(dbName)
      .find({ [idProperty]: new ObjectId(idObjectToFind as string) })
      .toArray();
  },

  // Read one
  connectAndFindOne: async (dbName: string, idObjectToFind: string) => {
    const db = await connectToDb();
    return await db
      .collection(dbName)
      .findOne({ _id: new ObjectId(idObjectToFind as string) });
  },

  // Create one
  connectAndInsertOne: async (dbName: string, payload: any) => {
    const db = await connectToDb();
    const result = await db.collection(dbName).insertOne(payload);
    return result.insertedId;
  },

  // Update one
  connectAndUpdateOne: async (
    dbName: string,
    idObjectToUpdate: string,
    payload: any
  ) => {
    const db = await connectToDb();
    const result = await db
      .collection(dbName)
      .updateOne(
        { _id: new ObjectId(idObjectToUpdate as string) },
        { $set: payload }
      );
    return result.modifiedCount;
  },

  // Delete one
  connectAndDeleteOne: async (dbName: string, idObjectToDelete: string) => {
    const db = await connectToDb();
    const result = await db
      .collection(dbName)
      .deleteOne({ _id: new ObjectId(idObjectToDelete as string) });
    return result.deletedCount;
  },
};
