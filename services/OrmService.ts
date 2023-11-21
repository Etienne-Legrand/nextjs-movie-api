import clientPromise from "../lib/mongodb";
import { MongoConfigService } from "./MongoConfigService";
import { ObjectId } from "mongodb";

const connectToDb = async () => {
  const client = await clientPromise;
  return client.db(MongoConfigService.databases.mflix);
};

export const OrmService = {
  connectAndFind: async (dbName: string, params: Object | null = null) => {
    const db = await connectToDb();

    if (params) {
      return await db.collection(dbName).find(params).limit(10).toArray();
    }

    return await db.collection(dbName).find({}).limit(10).toArray();
  },

  connectAndFindOne: async (dbName: string, idObjectToFind: string) => {
    const db = await connectToDb();
    return await db
      .collection(dbName)
      .findOne({ _id: new ObjectId(idObjectToFind as string) });
  },

  connectAndInsertOne: async (dbName: string, payload: any) => {
    const db = await connectToDb();
    const result = await db.collection(dbName).insertOne(payload);
    return result.insertedId;
  },

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

  connectAndDeleteOne: async (dbName: string, idObjectToDelete: string) => {
    const db = await connectToDb();
    const result = await db
      .collection(dbName)
      .deleteOne({ _id: new ObjectId(idObjectToDelete as string) });
    return result.deletedCount;
  },
};
