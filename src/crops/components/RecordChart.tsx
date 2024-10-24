import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Record } from "../models/Record";
import { Dropdown } from "@/shared/components/DropDownComponent";
import { Filter } from "@/shared/components/Filter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type RecordChartProps = {
  records: Record[];
};

export const RecordChart = ({ records }: RecordChartProps) => {
  const [selectedField, setSelectedField] = useState<string>("");
  const [timeFrame, setTimeFrame] = useState<string>("individual");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const filteredFields = records[0]?.payload.data.filter(
    (item: { name: string }) =>
      !item.name.toLowerCase().includes("comment") &&
      !item.name.toLowerCase().includes("activities")
  );

  const payloadFields = filteredFields.map(
    (item: { name: string }) => item.name
  );

  const groupRecordsByTimeFrame = () => {
    const groupedData: { [key: string]: number[] } = {};
    const groupedLabels: string[] = [];

    records.forEach((record) => {
      const date = new Date(record.updatedDate);
      let label = "";

      if (timeFrame === "día") {
        label = date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      } else if (timeFrame === "semana") {
        const weekNumber = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
        label = `Semana ${weekNumber}, ${date.getFullYear()}`;
      } else if (timeFrame === "mes") {
        label = date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
        });
      } else {
        label = date.toLocaleString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      if (!groupedData[label]) {
        groupedData[label] = [];
      }

      const field = record.payload.data.find(
        (item: { name: string }) => item.name === selectedField
      );
      groupedData[label].push(field ? parseFloat(field.value) : 0);
    });

    Object.keys(groupedData).forEach((label) => {
      groupedLabels.push(label);
    });

    return { groupedData, groupedLabels };
  };

  const { groupedData, groupedLabels } = groupRecordsByTimeFrame();

  const chartData = {
    labels: groupedLabels,
    datasets: [
      {
        label: `Valores de ${selectedField}`,
        data: groupedLabels.map((label) => {
          const values = groupedData[label];
          const sum = values.reduce((acc, val) => acc + val, 0);
          return sum / values.length;
        }),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const timeFrameOptions = ["individual", "día", "semana", "mes"];

  return (
    <div className="w-full">
      <span className="flex justify-between">
        <h3 className="text-xl font-bold mb-4">Gráficos</h3>
        <div className="relative mb-4">
          <Filter
            label={timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
            onClick={() => setShowDropdown(!showDropdown)}
            showArrow={showDropdown}
          />
          {showDropdown && (
            <div className="absolute mt-2 z-50">
              <Dropdown
                options={timeFrameOptions}
                onOptionSelect={(option) => {
                  setTimeFrame(option);
                  setShowDropdown(false);
                }}
              />
            </div>
          )}
        </div>
      </span>

      <div className="flex flex-wrap gap-2 mb-4">
        {payloadFields.map((key: string) => (
          <button
            key={key}
            onClick={() => setSelectedField(key)}
            className={`px-4 py-2 rounded-md ${
              selectedField === key
                ? "bg-textCardColorR text-white"
                : "bg-gray-200"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow w-full min-h-[400px]">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: `Gráfico de ${selectedField} - ${timeFrame}`,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Fecha",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Valor",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
