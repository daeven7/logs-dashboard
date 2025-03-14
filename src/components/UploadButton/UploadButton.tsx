// 'use client'
// import { Button, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import type { UploadProps } from "antd";
// import type { RcFile } from "antd/es/upload/interface";
// import axios from "axios";
// import {  Divider, notification, Space } from 'antd';
// import type { NotificationArgsProps } from 'antd';
// import { createContext, useMemo } from "react";

// type NotificationPlacement = NotificationArgsProps['placement'];

// const Context = createContext({ name: 'Default' });

// const UploadButton = () => {

//   const [api, contextHolder] = notification.useNotification();

//   const openNotification = (placement: NotificationPlacement) => {
//     api.info({
//       message: `Notification ${placement}`,
//       description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
//       placement,
//     });
//   };

//   const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

//   const uploadProps: UploadProps = {
//     name: "logFile",
//     customRequest: async (options) => {
//       const { file, onSuccess, onError } = options;
//       const formData = new FormData();
//       formData.append("logFile", file as RcFile); // Append the file with the key 'logFile'

//       try {
//         const response = await axios.post("http://localhost:4000/api/upload-logs", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         console.log("upload successful", response)
//         onSuccess && onSuccess(response.data, file);
//         // message.success(`${file.name} file uploaded successfully`);
//       } catch (error) {
//         console.error("Upload error:", error);
//         // onError && onError(error);
//         // message.error(`${file.name} file upload failed.`);
//       }
//     },
//     showUploadList: false

//   };

//   return (
//     <Context.Provider value={contextValue}>
//       {contextHolder}
//     <Upload {...uploadProps}>
//       <Button onClick={() => openNotification('topRight')} type="primary" shape="round" className="mt-10" icon={<UploadOutlined />}>Upload Log File</Button>
//     </Upload>
//     </Context.Provider>
//   );
// };

// export default UploadButton;

"use client";
import { Button, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import axios from "axios";
import { createContext, useMemo } from "react";

type NotificationPlacement = "topRight";

const Context = createContext({ name: "Default" });

const UploadButton = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    message: string,
    description: string,
    isError= false
  ) => {
    if (isError)
      api.error({
        message,
        description,
        placement,
      });
    else
      api.success({
        message,
        description,
        placement,
      });
  };

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  const uploadProps: UploadProps = {
    name: "logFile",
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;
      const formData = new FormData();
      formData.append("logFile", file as RcFile);

      try {
        const response = await axios.post(
          "http://localhost:4000/api/upload-logs",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("upload successful", response);
        onSuccess && onSuccess(response.data, file);

        // Show success notification
        openNotification(
          "topRight",
          "Upload Successful",
          `${(file as RcFile).name} was uploaded successfully.`
        );
      } catch (error) {
        console.error("Upload error:", error);
        // onError && onError(error);
        // Show error notification
        openNotification(
          "topRight",
          "Upload Failed",
          `Failed to upload ${(file as RcFile).name}.`,
          true
        );
      }
    },
    showUploadList: false,
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Upload {...uploadProps}>
        <Button
          type="primary"
          shape="round"
          className="mt-10"
          icon={<UploadOutlined />}
        >
          Upload Log File
        </Button>
      </Upload>
    </Context.Provider>
  );
};

export default UploadButton;
