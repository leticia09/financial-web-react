import {FunctionComponent, useState} from "react";
import {Management} from "../../../components/management";
import React from "react";
import {Messages} from "../../../internationalization/message";
import {DashboardComponent} from "../../../components/dashboard";

export const EntranceData: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <DashboardComponent
                title={Messages.titles.entrance}
                titleButton={Messages.titles.add}
                path="/receitas/cadastro"
                rows={[]}
                arrayHeader={[]}
                dataSets={[]}
                labelsData={[]}
                optionText={Messages.titles.pointsAndMiles}
                cards={[]}
                showLineProgress={isLoading}
            />

        </>
    );
}