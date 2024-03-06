import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Input, Button } from 'antd';
import "./table.css"

const TableRenderer = ({ rawData }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([...rawData]);
  const [searchText, setSearchText] = useState('');

  const columns = Object.keys(rawData[0] || {}).map((column) => ({
    title: column,
    dataIndex: column,
    key: column,
    hidden: !selectedColumns.includes(column),
    render: (item, record) => {
      if (column === 'address') {
        return (
          <span>
            {item && (
              <>
                {item.street}, {item.suite}, {item.city}, {item.zipcode}
              </>
            )}
          </span>
        );
      } else if (column === 'company') {
        return (
          <span>
            {item && (
              <>
                {item.name} - {item.catchPhrase}
              </>
            )}
          </span>
        );
      } else {
        return item;
      }
    },
  }));

  const handleCheckboxChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  const handleSearch = (value) => {
    setSearchText(value);

    const filtered = rawData
      .filter((row) =>
        selectedColumns.some(
          (column) =>
            String(row[column]).toLowerCase().includes(value.toLowerCase()) &&
            selectedColumns.includes(column)
        )
      )
      .map((row) =>
        selectedColumns.reduce((acc, column) => {
          acc[column] = row[column];
          return acc;
        }, {})
      );

    setFilteredData(filtered);
  };

  const handleSubmit = () => {
    const updatedData = rawData.map((row) =>
      selectedColumns.reduce((acc, column) => {
        acc[column] = row[column];
        return acc;
      }, {})
    );
    setFilteredData(updatedData);
  };

  useEffect(() => {
    const filtered = rawData.map((row) =>
      selectedColumns.reduce((acc, column) => {
        acc[column] = row[column];
        return acc;
      }, {})
    );
    setFilteredData(filtered);
  }, [rawData, selectedColumns]);

  return (
    <div>
      <Checkbox.Group options={Object.keys(rawData[0] || {})} onChange={handleCheckboxChange}/>
      <br />
      <Input.Search placeholder="Search" onSearch={handleSearch} className='mb-4 mt-4'/>
      <Button type="primary" onClick={handleSubmit} className='mb-4'>
        Submit
      </Button>
      <br />
      <Table dataSource={filteredData} columns={columns.filter((column) => !column.hidden)} />
    </div>
  );
};

export default TableRenderer;
