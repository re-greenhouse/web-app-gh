import {CSSProperties, ReactElement, ReactNode} from "react";

type TableProps<T> = {
  data: Array<T>;
  columnNames: Array<string | ReactNode>;
  columnValues: Array<(row: T) => string | number | ReactNode>;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
}

export const Table = <T extends object>({data, columnNames, columnValues, headerStyle, bodyStyle}: TableProps<T>): ReactElement => {
  return (
    <div className="grid w-full ">
      <div className="overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs md:text-base text-gray-700 bg-gray-200" style={headerStyle}>
          <tr>
            {columnNames.map((name, index) =>
              <th key={index} scope="col" className="px-6 py-3 text-center">
                {typeof name === 'string' ? name : name}
              </th>
            )}
          </tr>
          </thead>
          <tbody style={bodyStyle} className="bg-neutral-50 font-normal text-center">
            {data.map((row, index) =>
              <tr key={index} className="border-b">
                {columnValues.map((prop, index) =>
                  <th key={index} scope={index === 0 ? "row" : undefined} className="font-normal px-6 py-4">
                    {prop(row)}
                  </th>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};