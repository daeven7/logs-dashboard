import { DataType } from "@/types/table.types";

export const convertToDataType = (json: any): DataType[] => {
  return json.stats.map((stat: any) => ({
    key: String(stat.id), 
    timestamp: stat.timestamp,
    fileId: stat.file_id,
    level: stat.level,
    logMessage: stat.message,
    userId: String(stat.userId), 
    ip: stat.ip_address,
    error: stat.error,
    keywords: stat.keywords.split(","),
  }));
};
