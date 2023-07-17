import { UnionType } from '../types/component.type';

const ecommerceJson = [
    /****** NABVARS ******/
    {
        type: 'navbar',
        components: [
            {
                id: 1,
                module: () => import('src/app/shared/components/navbar/navbar1/navbar1.module')
                    .then((m) => m.Navbar1Module),
                component: () => import('src/app/shared/components/navbar/navbar1/navbar1.component')
                    .then((c) => c.Navbar1Component),
            },
            {
                id: 2,
                module: () => {},
                component: () => import('src/app/shared/components/navbar/navbar2/navbar2.component')
                    .then((c) => c.Navbar2Component),
            },
        ]
    },

    /****** SLIDERS ******/
    {
        type: 'slider',
        components: [
            {
                id: 1,
                module: () => import('src/app/shared/components/slider/slider1/slider1.module')
                    .then((m) => m.Slider1Module),
                component: () => import('src/app/shared/components/slider/slider1/slider1.component')
                    .then((c) => c.Slider1Component),
            },
        ]
    },

    /****** CAROUSEL ******/
    {
        type: 'carousel',
        components: [
            {
                id: 1,
                module: () => import('src/app/shared/components/carousel/carousel1/carousel1.module')
                    .then((m) => m.Carousel1Module),
                component: () => import('src/app/shared/components/carousel/carousel1/carousel1.component')
                    .then((c) => c.Carousel1Component),
            },
        ]
    },

    /****** SECTION ******/
    {
        type: 'section',
        components: [
            {
                id: 1,
                module: () => import('src/app/shared/components/section/section1/section1.module')
                    .then((m) => m.Section1Module),
                component: () => import('src/app/shared/components/section/section1/section1.component')
                    .then((c) => c.Section1Component),
            },
        ]
    },

    /****** FOOTER ******/
    {
        type: 'footer',
        components: [
            {
                id: 1,
                module: () => import('src/app/shared/components/footer/footer1/footer1.module')
                    .then((m) => m.Footer1Module),
                component: () => import('src/app/shared/components/footer/footer1/footer1.component')
                    .then((c) => c.Footer1Component),
            },
        ]
    }
]

export function findElement(id: number, type: string){
    let element: UnionType[] = ecommerceJson.find((e) => e.type == type)!.components;
    let select: UnionType = element.find((c: UnionType) => c.id == id)!;
    
    if(select != null){
        // await element!.module();
        return select.component();
        // return object;
    }

    return null;
}

export function listSizeElementType(type: string){
    let size = ecommerceJson.find((e) => e.type == type)?.components.length!;

    let response = {
        type: type,
        size: size,
    };

    return response;

}