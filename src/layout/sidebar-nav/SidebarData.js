import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from "react-icons/gi";
import * as FcIcons from "react-icons/fc";

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <FcIcons.FcMindMap size={20}/>
    },
    {
        title: 'Gerenciamento',
        path: '/dashboard',
        icon: <FcIcons.FcList size={20}/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,

        subNav: [
            {
                title: 'Membros',
                path: '/grupos/membros',
                icon: <FcIcons.FcCollaboration size={16}/>
            },

            {
                title: 'Dados Bancários',
                path: '/grupos/dados-bancarios',
                icon: <FcIcons.FcLibrary size={16}/>
            },

            {
                title: 'Grupos',
                path: '/grupos/grupos',
                icon: <FcIcons.FcGlobe size={16}/>
            }
        ]
    },

    {
        title: 'Receitas',
        path: '/receitas',
        icon: <FcIcons.FcBullish size={20}/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
    },
    {
        title: 'Mov. Bancária',
        path: '/movimentacao-bancaria',
        icon: <FcIcons.FcMoneyTransfer size={20}/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
    },
    {
        title: 'Despesas',
        path: '/despesas',
        icon: <FcIcons.FcBearish size={20}/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
    },
    {
        title: 'Programa de Pontos',
        path: '/grupos/programa-pontos',
        icon: <GiIcons.GiAirplaneDeparture size={20}/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
    },
    {
        title: 'Previsões',
        path: '/previsoes',
        icon: <FcIcons.FcRatings size={20}/>
    },
    {
        title: 'Metas',
        path: '/metas',
        icon: <FcIcons.FcTodoList size={20}/>
    },
    // {
    //   title: 'Milhas',
    //   path: '/milhas',
    //   icon: <GiIcons.GiAirplaneDeparture size={22} />
    // },
    // {
    //   title: 'Análises',
    //   path: '/analises',
    //   icon: <FcIcons.FcBarChart size={20}/>
    // },
    // {
    //     title: 'Eventos',
    //     path: '/Eventos',
    //     icon: <FcIcons.FcBarChart size={20}/>
    // },
    // {
    //     title: 'Simulador',
    //     path: '/simulador',
    //     icon: <AiIcons.AiFillExperiment size={20}/>
    // },
    {
        title: 'Support',
        path: '/support',
        icon: <FcIcons.FcSettings size={20}/>
    }
];
  