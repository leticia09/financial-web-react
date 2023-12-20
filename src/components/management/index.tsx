import {FunctionComponent, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./management.css";
import {IColumns, IRow} from "../../interfaces/table";
import {ButtonComponent} from "../button";
import {Messages} from "../../internationalization/message";
import {TableComponent} from "../table";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {AccordionComponent} from "../accordion";
import {IAccordion} from "../../interfaces/accordion";

interface IManagement {
    title: string;
    rows?: IRow[];
    arrayHeader?: IColumns[];
    path: string;
    hasAuxButton?: boolean;
    haveMenu?: boolean;
    menuOptions?: any[];
    hasMoreTable?: boolean;
    moreTableArrayHeader?: IColumns[];
    moreTableRows?: IRow[];
    showLineProgress?: boolean;
    hasAccordion?: boolean;
    accordionData?: IAccordion[];
    getValue?: (value: any) => void;
    changeShow?: boolean;
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
                                                               moreTableRows,
                                                               showLineProgress,
                                                               hasAccordion,
                                                               accordionData,
                                                               getValue,
                                                               changeShow = false,
                                                           }: IManagement) => {
    const navigate = useNavigate();
    const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null);
    const [open, setOpen] = useState(false);


    const handleAccordion = (index) => {
        setExpandedAccordion((prev) => (prev === index ? null : index));
        getValue(index);
    }

    const handleTable = () => {
        setOpen(!open);
    }

    return (
        <div className="management-content">
            {showLineProgress &&
                <Box sx={{marginTop: "58px", marginLeft: "-5px", width: '100.6%', marginBottom: "-50px"}}>
                    <LinearProgress/>
                </Box>
            }
            <div className="content-management">
                <div className={changeShow ? 'labels-management-change' : 'labels-management'} onClick={handleTable}>
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

            {hasAccordion && open && accordionData.length > 0 ? (
                accordionData.map((accordion, index) => (
                    <div key={index} className="content-accordion">
                        <AccordionComponent
                            key={index}
                            label={accordion.label}
                            Component={accordion.Component}
                            actions={accordion.actions}
                            status={accordion.status}
                            getValue={(value) => handleAccordion(value)}
                            index={index}
                            icon={accordion.icon}
                            expanded={expandedAccordion === index}
                        />
                    </div>
                ))
            ) : (
                !hasAccordion && open && rows && arrayHeader && rows.length > 0 ? (
                    <div className={`content-grid-management ${hasMoreTable ? "two-columns" : ""}`}>
                        <TableComponent
                            columns={arrayHeader}
                            rows={rows}
                            pagination={true}
                            width={hasMoreTable ? "49.5%" : "100%"}
                        />
                        {open && hasMoreTable && moreTableArrayHeader && moreTableRows && moreTableRows.length > 0 && (
                            <TableComponent
                                columns={moreTableArrayHeader}
                                rows={moreTableRows}
                                pagination={true}
                                width="49.5%"
                            />
                        )}
                    </div>
                ) : (
                    changeShow === false && rows && arrayHeader && rows.length > 0 ? (
                        <div className='content-grid-management'>
                            <TableComponent
                                columns={arrayHeader}
                                rows={rows}
                                pagination={true}
                                width={"100%"}
                            />
                        </div>
                    ) : (
                        changeShow === true && (rows && arrayHeader && rows.length > 0) || (accordionData && accordionData.length > 0) ? (
                            <div></div>
                        ) : (
                            <div className="content-not-grid">
                                {Messages.titles.emptyList}
                            </div>
                        )

                    )

                )
            )}
        </div>
    )
        ;
}