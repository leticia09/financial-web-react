import {FunctionComponent} from "react";
import {Management} from "../../../components/management";
import React from "react";

export const EntranceData: FunctionComponent = () => {
    return (
        <>
            <Management
                title="Dados Bancários"
                rows={null}
                arrayHeader={null}
                pathBack="/grupos/dados-bancarios/cadastro"
            />
        </>
    );
}