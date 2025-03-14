// import { Button, Upload, UploadProps, message } from "antd";
// import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";

// const props: UploadProps = {
//     name: 'file',
//     action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
//     headers: {
//       authorization: 'authorization-text',
//     },
//     onChange(info) {
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully`);
//       } else if (info.file.status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };
  
// const UploadButton = () => {

//   return (
//     <Upload {...props}>
//     <Button icon={<UploadOutlined />}>Click to Upload</Button>
//   </Upload>
//   );
// };

// export default UploadButton

'use client'
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import axios from "axios";
import {  Divider, notification, Space } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { createContext, useMemo } from "react";

type NotificationPlacement = NotificationArgsProps['placement'];

const Context = createContext({ name: 'Default' });


const UploadButton = () => {

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  const uploadProps: UploadProps = {
    name: "logFile",
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;
      const formData = new FormData();
      formData.append("logFile", file as RcFile); // Append the file with the key 'logFile'

      try {
        const response = await axios.post("http://localhost:4000/api/upload-logs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("upload successful", response)
        onSuccess && onSuccess(response.data, file);
        // message.success(`${file.name} file uploaded successfully`);
      } catch (error) {
        console.error("Upload error:", error);
        // onError && onError(error);
        // message.error(`${file.name} file upload failed.`);
      }
    },
    showUploadList: false
    // onChange(info) {
    //   if (info.file.status === "done") {
    //     console.log(`${info.file.name} uploaded successfully`);
    //   } else if (info.file.status === "error") {
    //     console.error(`${info.file.name} upload failed`);
    //   }
    // },
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
    <Upload {...uploadProps}>
      <Button onClick={() => openNotification('topRight')} type="primary" shape="round" className="mt-10" icon={<UploadOutlined />}>Upload Log File</Button>
    </Upload>
    </Context.Provider>
  );
};

export default UploadButton;
