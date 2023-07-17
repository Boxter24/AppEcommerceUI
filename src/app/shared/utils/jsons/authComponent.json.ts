const authJson = [
    {
        id: 1,
        module: () => import('src/app/shared/components/auth/auth1/auth1.module')
            .then((m) => m.Auth1Module),
        component: () => import('src/app/shared/components/auth/auth1/auth1.component')
        .then((c) => c.Auth1Component),
    },
    {
        id: 2,
        module: () => import('src/app/shared/components/auth/auth2/auth2.module')
            .then((m) => m.Auth2Module),
        component: () => import('src/app/shared/components/auth/auth2/auth2.component')
        .then((c) => c.Auth2Component),
    }
]

export function findElement(id: number){    
    let element = authJson.find((e) => e.id == id)
    if(element != null){
        element!.module();
        let object =  element!.component();
        return object;
    }

    return null;
}

