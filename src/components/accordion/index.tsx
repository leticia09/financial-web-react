import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {FunctionComponent} from "react";
import * as AiIcons from "react-icons/ai";
import "./accordion.css"
import {IAccordion} from 'interfaces/accordion';

export const AccordionComponent: FunctionComponent<IAccordion> = ({
                                                                      label,
                                                                      Component,
                                                                      handleView,
                                                                      handleEdit,
                                                                      handleDelete,
                                                                      showView,
                                                                      showEdit,
                                                                      showDelete
                                                                  }: IAccordion) => {

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className="accordion-summary">
                        <div>
                            <Typography>{label}</Typography>
                        </div>
                        {(showDelete ||showView || showDelete) &&
                            <div className="accordion-icons">
                                {showView &&
                                    <AiIcons.AiOutlineEye size={18}/>
                                }
                                {showEdit &&

                                    <AiIcons.AiOutlineEdit size={18}/>
                                }
                                {showDelete &&
                                    <AiIcons.AiOutlineDelete size={18}/>
                                }
                            </div>
                        }

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
