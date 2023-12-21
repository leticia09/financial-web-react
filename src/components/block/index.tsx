import {FunctionComponent, useState} from "react";
import "./block.css"
import {FcNext} from "react-icons/fc";
import {FcPrevious} from "react-icons/fc";

interface IBlockComponent {
    title: string,
    rows: any[],
    columns: any[]
}

export const BlockComponent: FunctionComponent <IBlockComponent> = ({title, columns, rows}: IBlockComponent) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    function previous() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    function next() {
        if (currentIndex < rows.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    return (
        <div className="block-component">
            <div className="block-component-title">{title}</div>
            <div className="block-component-content">
                {columns && columns.length > 0 && rows && rows.length > 0 ? (
                    columns.map((column, i) => (
                        <div key={i}>
                            {rows[currentIndex][i].label &&
                                <div className="block-component-content-line">
                                    <span className="block-component-content-item">{column.label}: </span>
                                    <span>{rows[currentIndex][i].label}</span>
                                </div>
                            }
                        </div>
                    ))
                ) : null}
            </div>

            <div className="block-component-footer">
                {columns && columns.length > 0 && rows && rows.length > 0 ? (
                    <div className="block-component-footer-actions">
                        <FcPrevious onClick={() => previous()} className="block-component-footer-icon"/>
                        <span className="block-component-footer-text"> {currentIndex + 1} / {rows.length} </span>
                        <FcNext onClick={() => next()} className="block-component-footer-icon"/>
                    </div>
                ) : null}
            </div>

        </div>
    );

}

