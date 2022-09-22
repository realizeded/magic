import { Content } from './../components/Home/components/Content';
import { Editor } from './../components/Editor/Editor';
import { Home } from './../components/Home';
import { Home as HomeContent } from './../components/Home/components/Home';

export const routerConfigs = [
    {
        path: '/home/*',
        component: Home,
        children: [
            {
                path: '',
                component: HomeContent
            },
            {
                path: 'projects',
                component: Content
            }
        ]
    },
    {
        path: '/editor/:id',
        component: Editor
    }
];

export const topMenuConfig = [
    {
        title: '首页',
        path: '/home'
    },
    {
        title: '所有项目',
        path: '/home/projects'
    }
];
