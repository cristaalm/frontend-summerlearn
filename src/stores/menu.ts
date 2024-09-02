import { type Icon } from "@/components/Base/Lucide/Lucide.vue";
import { defineStore } from "pinia";

export interface Menu {
  icon: Icon;
  title: string;
  badge?: number;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface MenuState {
  value: Array<Menu | string>;
}

export const useMenuStore = defineStore("menu", {
  state: (): MenuState => ({
    value: [
    "GESTIÓN DE USUARIOS",
      {
        icon: "SquareUser",
        pageName: "Users",
        title: "Usuarios",
      },
      {
        icon: "UserPlus",
        pageName: "AddUser",
        title: "Agregar Usuario",
      },
      "GESTIÓN DE PROGRAMAS",
      {
        icon: "Album",
        pageName: "Programs",
        title: "Programas",
         subMenu: [
          {
            icon: "LayoutPanelTop",
            pageName: "Areas",
            title: "Áreas",
           },
           {
             icon: "BookMarked",
             pageName: "Activities",
             title: "Actividades",
           },
        ],
      },
      "GESTIÓN GENERAL",
      {
        icon: "PiggyBank",
        pageName: "Donations",
        title: "Donaciones",
         subMenu: [
          {
            icon: "ReceiptText",
            pageName: "Expenses",
            title: "Gastos",
          },
        ],
      },
      {
        icon: "Notebook",
        pageName: "Subscriptions",
        title: "Suscripciones",
      },
      {
        icon: "BarChartBig",
        pageName: "Performance",
        title: "Desempeño",
      },
      {
        icon: "MessagesSquare",
        pageName: "Chat",
        title: "Chat",
      },
    ],
  }),
});
