"use client";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Захиалга",
    icon: LocalPostOfficeIcon,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Загвар",
    icon: DesignServicesIcon,
    href: "/dashboard/templates",
  },
];

export default Menuitems;
