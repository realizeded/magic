import { EControlTypes, ITemplateState } from './type';

export const initState: ITemplateState = {
    project: {
        activeIndex: '',
        template: {
            stages: [
                {
                    value: '1212'
                },
                {
                    value: '12123'
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
                        src: 'https://lf9-creativelab-sign.bytetos.com/creative-lab/material/74c8cd24e919762dcfa5a24baa3616aa.jpg?x-expires=1661690529&x-signature=S%2BiXX3PZMaCkQ%2F2yAkIV6DluJCE%3D'
                    }
                },
                '12123': {
                    type: EControlTypes.Img,
                    box: {
                        width: '200px',
                        height: '200px',
                        top: '20px',
                        left: '-100px'
                    },
                    data: {
                        src: 'https://lf9-creativelab-sign.bytetos.com/creative-lab/material/74c8cd24e919762dcfa5a24baa3616aa.jpg?x-expires=1661690529&x-signature=S%2BiXX3PZMaCkQ%2F2yAkIV6DluJCE%3D'
                    }
                }
            }
        }
    }
};
