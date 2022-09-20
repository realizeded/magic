export interface TControllers {
    routesPath: string;
}

export interface TControllersReturnType {
    (...reset: any[]):void
}