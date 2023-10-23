import {FunctionComponent, useEffect, useState} from "react";
// @ts-ignore
import {Layout} from "../index.tsx";
import Box from "@mui/material/Box";
import {Route, Routes} from "react-router-dom";
// @ts-ignore
import {Dashboard} from "../../pages/dashboard/index.tsx";
// @ts-ignore
import {Members} from "../../pages/members/managment/index.tsx";
// @ts-ignore
import {RegisterMember} from "../../pages/members/creation/index.tsx"
// @ts-ignore
import {BankData} from "../../pages/bank-data/management/index.tsx";
// @ts-ignore
import {RegisterBankData} from "../../pages/bank-data/creation/index.tsx";

export const Home: FunctionComponent = () => {

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 1,
                background: "#f2f7fb",
                height: "100vh",
                width: "100%"
            }}
        >
            <Routes>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/grupos/membros"
                       element={<Members/>}/>
                <Route path="/grupos/membros/cadastro"
                       element={<RegisterMember />}/>
                <Route path="/grupos/dados-bancarios"
                       element={<BankData />}/>
                <Route
                    path="/grupos/dados-bancarios/cadastro"
                    element={<RegisterBankData />}
                />
                <Route path="/grupos/dados-bancarios/:id"
                       element={<RegisterBankData />}/>
                {/*<Route path="/grupos/pontos"
                      element={<ProgramaPontos loginInformation={props.loginInformation}/>}/>
               <Route path="/grupos/pontos/cadastro"
                      element={<CadastroProgramaPontos loginInformation={props.loginInformation}/>}/>

               <Route path="/grupos/cartoes"
                      element={<Cartoes loginInformation={props.loginInformation}/>}/>
               <Route                   path="/grupos/cartoes/cadastro"
                   element={<CadastroCartao loginInformation={props.loginInformation}/>}
               />


               <Route
                   path="/grupos/conta-bancaria"
                   element={<ContaBancaria loginInformation={props.loginInformation}/>}
               />
               <Route
                   path="/grupos/conta-bancaria/cadastro"
                   element={<CadastroContaBancaria loginInformation={props.loginInformation}/>}
               />
               <Route path="/grupos/salario"
                      element={<Salario loginInformation={props.loginInformation}/>}/>
               <Route
                   path="/grupos/salario/cadastro"
                   element={<CadastroSalario loginInformation={props.loginInformation}/>}
               />
               <Route path="/grupos/grupo-macro"
                      element={<GrupoMacro loginInformation={props.loginInformation}/>}/>
               <Route
                   path="/grupos/grupo-macro/cadastro"
                   element={<CadastroGrupoMacro loginInformation={props.loginInformation}/>}
               />
               <Route path="/despesas/graficos"
                      element={<DespesasGrafico loginInformation={props.loginInformation}/>}/>
               <Route path="/despesas" element={<Despesas loginInformation={props.loginInformation}/>}/>
               <Route path="/despesas/cadastro"
                      element={<CadastroDespesas loginInformation={props.loginInformation}/>}/>
               <Route path="/receitas/graficos"
                      element={<ReceitasGrafico loginInformation={props.loginInformation}/>}/>
               <Route path="/receitas" element={<Receitas loginInformation={props.loginInformation}/>}/>
               <Route path="/receitas/cadastro"
                      element={<CadastroReceitas loginInformation={props.loginInformation}/>}/>
               <Route path="/previsoes" element={<Previsao />} />
                <Route path="/analises" element={<Analises />} />
                <Route path="/metas" element={<Metas />} />
                <Route path="/simulador" element={<Simulador />} />
                <Route path="/support" element={<Suporte />} />
                <Route path="/movimentacao-bancaria/graficos" element={<MovimentoBancarioGrafico />}/>
                <Route path="/movimentacao-bancaria/cadastro" element={<MovimentoBancarioCadastro />}/>{" "}
        */}
            </Routes>
        </Box>
    );
}