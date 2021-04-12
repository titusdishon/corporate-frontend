import { useEffect, useRef, useState } from "react";

export const useTableStatus = (serverResponseData) => {
  const [response, setData] = useState([]);

  useEffect(() => {
    const responseData = serverResponseData;
    setData(responseData);
  }, [serverResponseData]);

  const skipResetRef = useRef(false);

  const updateMyData = (rowIndex, columnId, value) => {
    skipResetRef.current = true;
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    skipResetRef.current = false;
  }, [response]);
  return {
    updateMyData,
    response,
    skipResetRef,
  };
};
