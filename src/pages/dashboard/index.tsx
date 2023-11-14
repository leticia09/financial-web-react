import "./dashboard.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {FunctionComponent} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Receitas",
        },
    },
};

export const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Despesas",
        },
    },
};

export const options3 = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Mov. Bancária",
        },
    },
};

export const options4 = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Metas",
        },
    },
};

export const options5 = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Milhas",
        },
    },
};

const labels = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

export const data1 = {
    labels,
    datasets: [
        {
            label: "Fixas",
            data: [5, 12, 10, 20, 18, 24, 5, 12, 10, 20, 18, 24],
            borderColor: "#335c92",
            backgroundColor: "#335c92",
        },
    ],
};

export const data2 = {
    labels,
    datasets: [
        {
            label: "Total",
            data: [5, 12, 10, 20, 18, 24, 5, 12, 10, 20, 18, 24],
            borderColor: "#e32636",
            backgroundColor: "#ff333f",
        },
    ],
};
export const data3 = {
    labels,
    datasets: [
        {
            label: "Entrada",
            data: [5, 12, 10, 20, 18, 24, 5, 12, 10, 20, 18, 24],
            borderColor: "#ff33ad",
            backgroundColor: "rgba(255, 99, 132, 0.8)",
        },
        {
            label: "Saída",
            data: [7, 15, 14, 22, 16, 28, 15, 20, 16, 27, 28, 29],
            borderColor: "#ffff00",
            backgroundColor: "#ffff40",
        }
    ],
};
export const data4 = {
    labels,
    datasets: [
        {
            label: "Total",
            data: [5, 12, 10, 20, 18, 24, 5, 12, 10, 20, 18, 24],
            borderColor: "#33ffe5",
            backgroundColor: "#80ffef",
        },
    ],
};
export const data5 = {
    labels,
    datasets: [
        {
            label: "Total",
            data: [5, 12, 10, 20, 18, 24, 5, 12, 10, 20, 18, 24],
            borderColor: "#8070ed",
            backgroundColor: "#8b8deb",
        },
    ],
};


export const anos = [
    {
        ano: 2023,
    },
    {
        ano: 2022,
    },
    {
        ano: 2021,
    },
];

export const tiposDespesas = [
    {
        nome: "Receita",
        valor: "R$14.000,00",
    },
    {
        nome: "Despesa",
        valor: "R$1.000,00",
    },
    {
        nome: "Mov. Bancária",
        valor: "R$6.000,00",
    },
    {
        nome: "Metas",
        valor: "R$2.000,00",
    },
    {
        nome: "Milhas",
        valor: "R$4.000,00",
    }
];

export const Dashboard: FunctionComponent = () => {
    return (
        <div>
            <div className="page">
                <div className="painel">
                    <div className="labels_dash">
                        {tiposDespesas.map((item, index) => {
                            return (
                                <div className="label_dash" key={index}>
                                    <div className="label_despesas">{item.nome}</div>
                                    <div >{item.valor}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="dashboard">
                <div className="grafico">
                    <div className="grafico_item_dash">
                        <Line data={data1} options={options1} />
                    </div>
                </div>

                <div className="grafico">
                    <div className="grafico_item_dash">
                        <Line data={data2} options={options2} />
                    </div>
                </div>

                <div className="grafico">
                    <div className="grafico_item_dash">
                        <Line data={data3} options={options3} />
                    </div>
                </div>

                <div className="grafico">
                    <div className="grafico_item_dash">
                        <Line data={data4} options={options4} />
                    </div>
                </div>

                <div className="grafico">
                    <div className="grafico_item_dash">
                        <Line data={data5} options={options5} />
                    </div>
                </div>
            </div>
        </div>
    );
}
