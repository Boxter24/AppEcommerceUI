import { Carousel1Component } from "../../components/carousel/carousel1/carousel1.component";
import { Carousel1Module } from "../../components/carousel/carousel1/carousel1.module";
import { Footer1Component } from "../../components/footer/footer1/footer1.component";
import { Footer1Module } from "../../components/footer/footer1/footer1.module";
import { Navbar1Component } from "../../components/navbar/navbar1/navbar1.component";
import { Navbar1Module } from "../../components/navbar/navbar1/navbar1.module";
import { Navbar2Component } from "../../components/navbar/navbar2/navbar2.component";
import { Section1Component } from "../../components/section/section1/section1.component";
import { Section1Module } from "../../components/section/section1/section1.module";
import { Slider1Component } from "../../components/slider/slider1/slider1.component";
import { Slider1Module } from "../../components/slider/slider1/slider1.module";

export type UnionType =
/**************************** NAVBAR ****************************/ 
{
    id: number;
    module: () => Promise<typeof Navbar1Module>;
    component: () => Promise<typeof Navbar1Component>;
} | {
    id: number;
    module: () => void;
    component: () => Promise<typeof Navbar2Component>;
} |
/**************************** SLIDER ****************************/
{
    id: number;
    module: () => Promise<typeof Slider1Module>;
    component: () => Promise<typeof Slider1Component>;
} | 
/**************************** CAROUSEL ****************************/
{
    id: number;
    module: () => Promise<typeof Carousel1Module>;
    component: () => Promise<typeof Carousel1Component>;
} |
/**************************** SECTION ****************************/
{
    id: number;
    module: () => Promise<typeof Section1Module>;
    component: () => Promise<typeof Section1Component>;
} |
/**************************** FOOTER ****************************/
{
    id: number;
    module: () => Promise<typeof Footer1Module>;
    component: () => Promise<typeof Footer1Component>;
};