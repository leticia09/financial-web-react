import {FunctionComponent} from "react";
// @ts-ignore
import {ButtonComponent} from "../button/index.tsx";
// @ts-ignore
import {Messages} from "../../internationalization/message/index.ts";
// @ts-ignore
import {TableComponent} from "../table/index.tsx";
import {useNavigate} from "react-router-dom";
import "./management.css"

interface IManagement {
    title: string;
    rows: [];
    arrayHeader: [];
    pathBack: string;
    getValue: (value: string) => void;
}
export const Management: FunctionComponent = ({title, rows, arrayHeader, pathBack}: IManagement) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="content">
                <div className="labels">
                    <h3>{title}</h3>

                    <div className="button-create">
                        <ButtonComponent
                            label={Messages.titles.add}
                            disabled={false}
                            width="100px"
                            height="40px"
                            cursor="pointer"
                            borderRadius="6px"
                            color="white"
                            background="#05465f"
                            padding="2px"
                            marginBottom="20px"
                            fontWeight="600"
                            maxHeight="40px"
                            action={() => {
                                navigate(pathBack)
                            }}
                        />
                    </div>
                </div>
            </div>
            {rows.length > 0 ?
                (
                    <div className="content-grid">
                        <TableComponent
                            columns={arrayHeader}
                            rows={rows}
                        />
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