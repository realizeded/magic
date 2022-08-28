import { EControlTypes, ITemplateState } from './type';

export const initState: ITemplateState = {
    project: {
        template: {
            stages: [
                {
                    value: '1212'
                }
            ],
            controls: {
                '1212': {
                    type: EControlTypes.Img,
                    box: {
                        width: '200px',
                        height: '200px',
                        top: '20px',
                        left: '-100px'
                    },
                    data: {
                        src: 'https://lf9-creativelab-sign.bytetos.com/creative-lab/material/private/2b668063605244f8b1793c6ddeb2edba.png?x-expires=1661675138&x-signature=lQDBi3KrYHtHpmyE2L5fv6oRTXE%3D'
                    }
                }
            }
        }
    }
};
