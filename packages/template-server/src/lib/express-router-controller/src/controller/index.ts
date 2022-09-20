import { TControllers, TControllersReturnType } from "./types"

export const controller = (config: TControllers): TControllersReturnType => {
    if(!config) {
        throw new TypeError(`config is undefined`);
    }

    const { routesPath } = config;

    if(!routesPath) {
        throw new TypeError(`config not include routesPath`);
    }

    import(routesPath).then(res => {
        console.log(res);
    })

    return (req,res) => {
        console.log(req);
    };
}