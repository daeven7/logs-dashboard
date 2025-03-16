"use client";

import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { DataType } from "@/types/table.types";
import { AppUtils } from "@/utils/app.utils";
import { convertToDataType } from "@/utils/helper";

const { Column } = Table;

const DataTable = () => {
  const [stats, setStats] = useState<DataType[]>([]);

  useEffect(() => {
    const socket = new WebSocket(AppUtils.LIVE_STATS_ENDPOINT);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      try {
        let newData = convertToDataType(JSON.parse(event.data));
        setStats((prevStats) => {
          let updatedStats = [...newData, ...prevStats];
          return updatedStats.slice(0, AppUtils.MAX_ENTRIES);
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <Table<DataType> dataSource={stats} className="w-4/5">
        <Column title="Timestamp" dataIndex="timestamp" key="timestamp" />
        <Column title="File Id" dataIndex="fileId" key="fileId" />

        <Column
          title="Log Level"
          dataIndex="level"
          key="level"
          render={(level: string) => {
            let color;

            if (level.toLowerCase() == "error") color = "#f50";
            else if (level.toLowerCase() == "debug") color = "#2db7f5";
            else if (level.toLowerCase() == "info") color = "#87d068";
            else color = "#108ee9";

            return <Tag color={color}>{level.toUpperCase()}</Tag>;
          }}
        />

        <Column title="Message" dataIndex="logMessage" key="logMessage" />
        <Column title="IP Address" dataIndex="ip" key="ip" />
        <Column
          title="Keywords"
          dataIndex="keywords"
          key="keywords"
          render={(keywords: string[]) => (
            <>
              {keywords.map((keyword) => {
                let color = keyword.length > 5 ? "geekblue" : "green";
                if (keyword === "permissions") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={keyword}>
                    {keyword.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        />
      </Table>
    </>
  );
};

export default DataTable;
