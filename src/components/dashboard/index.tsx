import {FunctionComponent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ICard, IColumns, IRow} from "../../interfaces/table";
import {ButtonComponent} from "../button";
import {Messages} from "../../internationalization/message";
import {TableComponent} from "../table";
import {Bar} from "react-chartjs-2";
import "./dashboard-component.css"
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {IDataSet} from "../../interfaces/points-program";
import {ClassNames} from "@emotion/react";

interface IDashboard {
    title: string;
    rows: IRow[];
    arrayHeader: IColumns[];
    path: string;
    hasAuxButton?: boolean;
    auxPath?: string;
    auxTitle?: string;
    haveMenu?: boolean;
    menuOptions?: any[];
    hasMoreTable?: boolean;
    moreTableArrayHeader?: IColumns[];
    moreTableRows?: IRow[];
    labelsData?: [];
    optionText?: string;
    cards: ICard[];
    hasAuxButton1?: boolean;
    auxPath1?: string;
    auxTitle1?: string;
    showLineProgress?: boolean;
    dataSets?: IDataSet[];
    titleButton: string;
    filters?: JSX.Element;
}

export const DashboardComponent: FunctionComponent<IDashboard> = ({
                                                                      title,
                                                                      rows,
                                                                      arrayHeader,
                                                                      labelsData,
                                                                      path,
                                                                      auxPath,
                                                                      auxTitle,
                                                                      hasAuxButton,
                                                                      haveMenu,
                                                                      menuOptions,
                                                                      hasMoreTable = false,
                                                                      moreTableArrayHeader,
                                                                      moreTableRows,
                                                                      optionText,
                                                                      cards,
                                                                      hasAuxButton1,
                                                                      auxPath1,
                                                                      auxTitle1,
                                                                      showLineProgress,
                                                                      dataSets,
                                                                      titleButton,
                                                                      filters
                                                                  }: IDashboard) => {
    const navigate = useNavigate();
    const [chartWidth, setChartWidth] = useState(0);

    const data = {
        labels: labelsData,
        datasets: dataSets,
    };

    const option = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: optionText,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    barThickness: 1
                },
            },
            y: {
                grid: {
                    display: true,
                },
            },
        },
    };


    return (
        <div className="dash-content">
            {showLineProgress &&
                <Box sx={{marginTop: "58px", marginLeft: "-5px", width: '100.6%', marginBottom: "-50px"}}>
                    <LinearProgress/>
                </Box>
            }
            <div className="content">
                <div className="labels">
                    <h3>{title}</h3>

                    <div className={`button-create ${hasAuxButton ? 'button-aux' : ''}`}>
                        <ButtonComponent
                            label={titleButton}
                            disabled={false}
                            width="120px"
                            height="40px"
                            cursor="pointer"
                            borderRadius="6px"
                            color="white"
                            background="#05465f"
                            padding="2px"
                            marginBottom="20px"
                            fontWeight="600"
                            border="none"
                            action={(action, havePath) => {
                                if (action)
                                    havePath ? navigate(havePath) : navigate(path);
                            }}
                            haveMenu={haveMenu}
                            menuOptions={menuOptions}
                        />
                        {hasAuxButton &&
                            <ButtonComponent
                                label={auxTitle}
                                disabled={false}
                                width="120px"
                                height="40px"
                                cursor="pointer"
                                borderRadius="6px"
                                color="white"
                                background="#05465f"
                                padding="2px"
                                marginBottom="20px"
                                fontWeight="600"
                                border="none"
                                action={(action, havePath) => {
                                    if (action)
                                        havePath ? navigate(havePath) : navigate(auxPath);
                                }}
                                haveMenu={haveMenu}
                                menuOptions={menuOptions}
                            />
                        }
                        {hasAuxButton1 &&
                            <ButtonComponent
                                label={auxTitle1}
                                disabled={false}
                                width="120px"
                                height="40px"
                                cursor="pointer"
                                borderRadius="6px"
                                color="white"
                                background="#05465f"
                                padding="2px"
                                marginBottom="20px"
                                fontWeight="600"
                                border="none"
                                action={(action, havePath) => {
                                    if (action)
                                        havePath ? navigate(havePath) : navigate(auxPath1);
                                }}
                                haveMenu={haveMenu}
                                menuOptions={menuOptions}
                            />
                        }
                    </div>
                </div>
            </div>

            {cards && cards.length > 0 &&
                <div className="card_content">
                    {cards.map((card, index) => (
                        <div className="card" key={index}>{card.label}
                            <div className="value">{card.value}</div>
                        </div>

                    ))}
                </div>
            }

            { filters &&
                <div className="filters-content-dash">
                    {filters}
                </div>
            }

            {dataSets.length > 0 &&
                <div className="dash_content">
                    <div className="dash_item_content">
                        <Bar data={data} options={option} width={chartWidth} height={300}/>
                    </div>
                </div>
            }

            {rows && arrayHeader && rows.length > 0 ? (
                <div className={`content-grid ${hasMoreTable ? "two-columns" : ""}`}>
                    <TableComponent
                        columns={arrayHeader}
                        rows={rows}
                        pagination={true}
                        width={hasMoreTable ? "49.5%" : "100%"}
                    />
                    {hasMoreTable && moreTableArrayHeader && moreTableRows && moreTableRows.length > 0 && (
                        <TableComponent
                            columns={moreTableArrayHeader}
                            rows={moreTableRows}
                            pagination={true}
                            width="49.5%"
                        />
                    )}
                </div>
            ) : (
                <div className="content-not-grid">
                    {Messages.titles.emptyList}
                </div>
            )
            }
        </div>
    );
}