import {FunctionComponent} from "react";
import {useNavigate} from "react-router-dom";
import "./management.css";
import {IColumns, IRow} from "../../interfaces/table";
import {ButtonComponent} from "../button";
import {Messages} from "../../internationalization/message";
import {TableComponent} from "../table";

interface IManagement {
    title: string;
    rows: IRow[];
    arrayHeader: IColumns[];
    path: string;
    hasAuxButton?: boolean;
    haveMenu?: boolean;
    menuOptions?: any[];
    hasMoreTable?: boolean;
    moreTableArrayHeader?: IColumns[];
    moreTableRows?: IRow[];
}

export const Management: FunctionComponent<IManagement> = ({
                                                               title,
                                                               rows,
                                                               arrayHeader,
                                                               path,
                                                               hasAuxButton,
                                                               haveMenu,
                                                               menuOptions,
                                                               hasMoreTable = false,
                                                               moreTableArrayHeader,
                                                               moreTableRows
                                                           }: IManagement) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="content">
                <div className="labels">
                    <h3>{title}</h3>

                    <div className={`button-create ${hasAuxButton ? 'button-aux' : ''}`}>
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
                        {hasAuxButton &&
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
                        }
                    </div>

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