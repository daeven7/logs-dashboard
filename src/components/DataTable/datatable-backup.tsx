"use client";

import { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

const { Column, ColumnGroup } = Table;

// interface DataType {
//   key: React.Key;
//   firstName: string;
//   lastName: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

// const data: DataType[] = [
//   {
//     key: "1",
//     firstName: "John",
//     lastName: "Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     firstName: "Jim",
//     lastName: "Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     firstName: "Joe",
//     lastName: "Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

let jsonData={"event":"job-completed","stats":[{"id":54,"created_at":"2025-03-13T14:02:51.64223+00:00","file_id":"656209cc-7b12-9353-d80b-b65dcb09aad8","timestamp":"2025-01-20T10:00:00+00:00","level":"ERROR","message":"Database timeout","json_payload":{"userId":123,"ip":"192.168.1.1"},"error":true,"keywords":"","ip_address":"192.168.1.1","user_Id":"123"},{"id":55,"created_at":"2025-03-13T14:02:51.64223+00:00","file_id":"656209cc-7b12-9353-d80b-b65dcb09aad8","timestamp":"2025-03-20T10:02:00+00:00","level":"ERROR","message":"Connection lost","json_payload":{"userId":125,"ip":"192.168.1.3"},"error":true,"keywords":"","ip_address":"192.168.1.3","user_Id":"125"},{"id":56,"created_at":"2025-03-13T14:02:51.64223+00:00","file_id":"656209cc-7b12-9353-d80b-b65dcb09aad8","timestamp":"2025-04-20T10:02:00+00:00","level":"DEBUG","message":"Requesting Permissions","json_payload":{"userId":3434,"ip":"192.168.1.3"},"error":false,"keywords":"permissions,auth","ip_address":"192.168.1.3","user_Id":"3434"}]}

const convertToDataType = (json: any): DataType[] => {
    return json.stats.map((stat: any) => ({
      key: String(stat.id), // Convert `id` to string
      timestamp: stat.timestamp,
      fileId: stat.file_id,
      level: stat.level,
      logMessage: stat.message,
      userId: String(stat.user_Id), // Ensure userId is a string
      ip: stat.ip_address,
      error: stat.error,
      keywords: stat.keywords.split(","),
    }));
  };

interface DataType {
    key: string;
    timestamp: string;
    fileId: string
    level: string
    logMessage: string
    userId: string
    ip: string
    error: boolean
    keywords: string[]
  }


const data: DataType[]= convertToDataType(jsonData)

console.log("convertToDataType",data)

const MAX_ENTRIES = 100; 

const DataTable2 = () => {
  const [stats, setStats] = useState<DataType[]>([]); // Replace `any` with your stats type

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000/api/live-stats"); // Replace with your server URL

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      try {
        // const dataJson = JSON.parse(event.data);
        // let tmp= convertToDataType(dataJson)
        // setStats(tmp); // Update stats state with incoming data

        // const newData = JSON.parse(event.data);

        // setStats((prevStats) => {
        //   const updatedStats = [newData, ...prevStats]; // Add new data at the beginning
        //   return updatedStats.slice(0, MAX_ENTRIES); // Keep only the most recent `MAX_ENTRIES`
        // });

        let newData= convertToDataType(JSON.parse(event.data))
        let updatedStats = [...newData, ...stats]
        console.log("updated stats", updatedStats, updatedStats.length)
        setStats(updatedStats.slice(0, MAX_ENTRIES))
        // setStats((prevStats) => {
        //     const updatedStats = [newData, ...prevStats]; // Add new data at the beginning
        //     return updatedStats.slice(0, MAX_ENTRIES); // Keep only the most recent `MAX_ENTRIES`
        //   });

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
      socket.close(); // Cleanup WebSocket connection on unmount
    };
  }, []);

  return (
    <>
      <h1>Data Table</h1>
      <Table<DataType> dataSource={stats}>
        {/* <ColumnGroup title="Name"> */}
        <Column title="Timestamp" dataIndex="timestamp" key="timestamp" />
          <Column title="File Id" dataIndex="fileId" key="fileId" />
          {/* <Column title="Log Level" dataIndex="level" key="level" /> */}

          <Column
          title="Log Level"
          dataIndex="level"
          key="level"
          render={(level: string) => {
            let color;

            if(level.toLowerCase() == "error")
                color="#f50"
            else if(level.toLowerCase() == "debug")
                color="#2db7f5"
            else if(level.toLowerCase() == "info")
                color="#87d068"
            else 
                color='#108ee9'


            return <Tag color={color}>{level.toUpperCase()}</Tag>}}
        />

        {/* </ColumnGroup> */}
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
        {/* <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          )}
        /> */}
        {/* <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        /> */}
      </Table>
    </>
  );
};

export default DataTable2;
