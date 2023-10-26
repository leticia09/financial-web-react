import {FunctionComponent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { IColumns, IRow } from "../../interfaces/table";
import {ButtonComponent} from "../button";
import {Messages} from "../../internationalization/message";
import {TableComponent} from "../table";
import {Bar} from "react-chartjs-2";
import "./dashboard-component.css"
import {data, option} from "../../pages/points-programs/management";

interface IDashboard {
    title: string;
    rows: IRow[];
    arrayHeader: IColumns[];
    path: string;
    haveMenu?: boolean;
    menuOptions?: any[];
    hasMoreTable?: boolean;
    moreTableArrayHeader?: IColumns[];
    moreTableRows?: IRow[];
}
export const DashboardComponent: FunctionComponent <IDashboard> = ({ title, rows, arrayHeader, path, haveMenu, menuOptions,
                                                                       hasMoreTable = false, moreTableArrayHeader, moreTableRows }: IDashboard) => {
    const navigate = useNavigate();
    const [chartWidth, setChartWidth] = useState(0);
    useEffect(() => {
        const handleResize = () => {
            setChartWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        setChartWidth(window.innerWidth);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className="content">
                <div className="labels">
                    <h3>{title}</h3>

                    <div className="button-create">
                        <ButtonComponent
                            label={Messages.titles.add}
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
                    </div>
                </div>
            </div>
            <div className="dash_content">
                <div className="dash_item_content">
                    <Bar data={data} options={option} width={chartWidth} height={300} />
                </div>
            </div>
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
        </>
    );
}