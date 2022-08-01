import React from "react";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

function ExportExcelFile({ csvData, fileName, style, className, forceExport }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  forceExport && exportToCSV(csvData, fileName);

  // Export button for exporting that particular page's data in csv
  return (
    <button
      className={`${className}`}
      onClick={(e) => exportToCSV(csvData, fileName)}
      style={style}
    >
      Export
    </button>
  );
}

export default ExportExcelFile;
