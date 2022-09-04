import { EControlTypes, ITemplateState } from './type';

export const initState: ITemplateState = {
    project: {
        activeIndex: '',
        activeStageIndex: 0,
        template: {
            stages: [
                {
                    name: '场景一',
                    value: ['1212', '12123'],
                    posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fdfdb344e89c70ce3cc0db030f61c45555f82e640.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=efea8e64bd411cf4dec2a256c8963072'
                },
                {
                    name: '场景二',
                    value: ['121233'],
                    posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F16%2F20190116074404_xigov.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=4775f18496d2369e9cd54f8e47a4d0c1'
                },
                {
                    name: '场景一',
                    value: ['1212', '12123'],
                    posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fdfdb344e89c70ce3cc0db030f61c45555f82e640.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=efea8e64bd411cf4dec2a256c8963072'
                },
                {
                    name: '场景二',
                    value: ['121233'],
                    posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F16%2F20190116074404_xigov.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=4775f18496d2369e9cd54f8e47a4d0c1'
                },
                {
                    name: '场景一',
                    value: ['1212', '12123'],
                    posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fdfdb344e89c70ce3cc0db030f61c45555f82e640.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=efea8e64bd411cf4dec2a256c8963072'
                },
                {
                    name: '场景二',
                    value: ['121233'],
                    posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F16%2F20190116074404_xigov.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=4775f18496d2369e9cd54f8e47a4d0c1'
                },
                {
                    name: '场景一',
                    value: ['1212', '12123'],
                    posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2Fdfdb344e89c70ce3cc0db030f61c45555f82e640.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=efea8e64bd411cf4dec2a256c8963072'
                },
                {
                    name: '场景二',
                    value: ['121233'],
                    posts: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F16%2F20190116074404_xigov.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864710&t=4775f18496d2369e9cd54f8e47a4d0c1'
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
                        left: '0px'
                    },
                    data: {
                        src: 'https://lf9-creativelab-sign.bytetos.com/creative-lab/material/74c8cd24e919762dcfa5a24baa3616aa.jpg?x-expires=1661690529&x-signature=S%2BiXX3PZMaCkQ%2F2yAkIV6DluJCE%3D'
                    }
                },
                '121233': {
                    type: EControlTypes.Img,
                    box: {
                        width: '200px',
                        height: '200px',
                        top: '120px',
                        left: '0px'
                    },
                    data: {
                        src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F1e1184a17efc52183a73c96f3f91d726c73a72bc.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664864219&t=11ec28b1d41601ec1950770d771437cf'
                    }
                }
            }
        }
    }
};
