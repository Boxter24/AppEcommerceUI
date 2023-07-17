import { Validators } from "@angular/forms";

const structureModal = [
    /****** NAVBAR ******/
    {
        type: 'navbar',
        formControl: [
            ['title', 'text'],
            ['link1', 'text'],
            ['link2', 'text'],
            ['link3', 'text'],
        ]
    },
    /****** SLIDER ******/
    {
        type: 'slider',
        formControl: [
            ['number_image', 'number'],
            ['image', 'image'],
        ]
    },
    /****** CAROUSEL ******/
    {
        type: 'carousel',
        formControl: [
            ['products', 'boolean','required'],
            ['image', 'image'],
        ]
    },
    /****** SECTION ******/
    {
        type: 'section',
        formControl: [
            ['title', 'text'],
            ['description', 'textarea'],
            ['image', 'image'],
        ]
    },
]

export function findElement(type: string){
    let element = structureModal.find((e) => e.type == type)
    if(element != null){
        // await element!.module();
        return element;
        // return object;
    }

    return null;
}

