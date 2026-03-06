/* eslint-disable */
import type { DataModelFromSchemaDefinition, DocumentByName, TableNamesInDataModel, SystemTableNames } from "convex/server";
import schema from "../schema";

export type TableNames = TableNamesInDataModel<DataModel>;
export type Doc<TableName extends TableNames> = DocumentByName<DataModel, TableName>;
export type Id<TableName extends TableNames | SystemTableNames> = string & { __tableName: TableName };
export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
