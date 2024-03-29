import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import { Space, Table, Tag, message } from "antd";
import { DatePicker } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import api from "../../service/api";
import Cookies from "js-cookie";
import moment from "moment";
import "../style.css";

function LeavePendingTab() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getPendingLeave();
  }, []);

  const getPendingLeave = async () => {
    const userDetails = JSON.parse(Cookies.get("userDetails"));
    const userId = userDetails.id;
    await api
      .post(`leaveListEmp`, {
        leaveStatus: "Waiting for Approval",
        userId: userId,
      })
      .then((res) => {
        console.log(res);
        setTableData(res.data);
        // message.success("Leave application submitted successfully");
      })
      .catch((err) => {
        message.error("Something went wrong");
        console.log(err);
      });
  };

  const dataSource = [
    {
      key: "1",
      name: "Sick Leave",
      Status: "Pending",
      days: "05",
      from: "10-12-2023",
      to: "15-12-2023",
      reason: "dsdfsdf",
    },
    {
      key: "2",
      name: "Casual Leave",
      Status: "Pending",
      days: "05",
      from: "10-12-2023",
      to: "15-12-2023",
      reason: "dsdfsdf",
    },
  ];
  const columns = [
    {
      title: "Type of Leave",
      dataIndex: "leaveType",
      key: "name",
      render: (record) => {
        if (record == "SL") return "Sick Leave";
        else if (record == "CL") return "Causual Leave";
        else if (record == "PL") return "Previlage Leave";
        else if (record == "ML") return "Maternity leave";
      },
    },
    {
      title: "Status",
      dataIndex: "approval",
      key: "Status",
    },
    {
      title: "From",
      dataIndex: "fromDate",
      key: "from",
      render: (record) => moment(record, "DD-MM-YYYY").format("DD-MM-YYYY"),
    },
    {
      title: "To",
      dataIndex: "toDate",
      key: "to",
      render: (record) => moment(record, "DD-MM-YYYY").format("DD-MM-YYYY"),
    },
    {
      title: "No of Days",
      dataIndex: "noOfDays",
      key: "days",
    },
  ];
  console.log(moment("30-Dec-23").format("DD-MM-YY"));
  const items = [
    {
      key: "1",
      label: "LeavePending",
      children: <Table dataSource={dataSource} columns={columns} />,
    },
  ];
  const { RangePicker } = DatePicker;
  const onChange = (key) => {
    console.log(key);
  };
  const expandIcon = ({ expanded, onExpand, record }) => (
    <span
      onClick={(e) => onExpand(record, e)}
      style={{ cursor: "pointer", width: 10 }}
    >
      {expanded ? <UpOutlined /> : <DownOutlined />}
    </span>
  );
  return (
    <div>
      {/* <div className="LeavePendingTab"></div> */}
      <Table
        dataSource={tableData}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              Reason: {record.reason}
            </p>
          ),
          expandIcon,
          // rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
      />
    </div>
  );
}

export default LeavePendingTab;
