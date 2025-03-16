"use client";
import { Button, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import axios from "axios";
import { createContext, useMemo } from "react";
import { AppUtils } from "@/utils/app.utils";

type NotificationPlacement = "topRight";

const Context = createContext({ name: "Default" });

const UploadButton = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    placement: NotificationPlacement,
    message: string,
    description: string,
    isError = false
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
      const { file, onSuccess } = options;
      const formData = new FormData();
      formData.append("logFile", file as RcFile);

      try {
        const response = await axios.post(
          AppUtils.UPLOAD_LOGS_ENDPOINT,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        onSuccess && onSuccess(response.data, file);

        openNotification(
          "topRight",
          "Upload Successful",
          `${(file as RcFile).name} was uploaded successfully.`
        );
      } catch (error) {
        console.error("Upload error:", error);
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
