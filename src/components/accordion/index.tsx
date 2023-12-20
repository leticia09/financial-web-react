import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {FunctionComponent, useEffect, useState} from "react";
import "./accordion.css"
import {IAccordion} from 'interfaces/accordion';

export const AccordionComponent: FunctionComponent<IAccordion> = ({
                                                                      label,
                                                                      Component,
                                                                      actions,
                                                                      getValue,
                                                                      index,
                                                                      expanded = false,
                                                                      status,
                                                                      icon,
                                                                      info
                                                                  }: IAccordion) => {
    const [isExpanded, setIsExpanded] = useState(expanded);

    useEffect(() => {
        setIsExpanded(expanded);
    }, [expanded]);

    const handleAccordionChange = () => {
        setIsExpanded(!isExpanded);
        getValue(index);
    };

    return (
        <div className="accordion-content">
            <Accordion expanded={isExpanded} onChange={handleAccordionChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className={expanded ? "accordion-summary-border" : "accordion-summary"}>
                        <div style={{display: 'flex', justifyContent: "space-between", alignItems:"center"}}>
                            {icon &&
                                <Typography style={{marginRight: "10px", display:"flex", alignItems:"center"}} >{icon}</Typography>
                            }
                            <Typography style={{marginRight: "18px"}}>{label}</Typography>
                            {info &&
                                <Typography style={{marginRight: "18px", display:"flex", alignItems:"center"}} >{info}</Typography>
                            }
                            {status &&
                                <Typography>{status}</Typography>
                            }

                        </div>

                        <div>
                            {actions}
                        </div>
                    </div>


                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className="accordion-component">
                            {Component}
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
