import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from "recharts";

interface Props {
    data: number[];
}

const Graph: React.FC<Props> = ({ data }) => {
    const chartData = data.map((value, index) => ({
        name: `${index}`,
        temperature: value,
    }));

    return (
        <div className="bg-white border rounded-md shadow-sm p-4">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis tick dataKey="name">
                        <Label value="Dagar" position="bottom" />
                    </XAxis>
                    <YAxis>
                        <Label
                            angle={-90}
                            value="Temperatur"
                            position="insideLeft"
                            style={{ textAnchor: "middle" }}
                        />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;
