import { Content } from '../pages/Home/components/Content';
import { Editor } from '../pages/Editor/Editor';
import { Home } from '../pages/Home';
import { Home as HomeContent } from '../pages/Home/components/Home';

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
