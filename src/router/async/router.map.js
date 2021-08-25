// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  root: {
    path: '/',
    name: '首页',
    redirect: '/login',
    component: view.tabs
  },
  dashBoard: {
    name: 'dashBoard',
    icon: 'dashboard',
    component: () => import('@/pages/dashboard/analysis')
  },
  个人中心:{
    name: '个人中心',
    component: () => import('@/pages/system/personal')
  },
  系统管理: {
    name: '系统管理',
    component: view.blank
  },

  用户管理: {
    name: '用户管理',
    component: () => import('@/pages/system/usermgr')
  },
  角色管理: {
    name: '角色管理',
    component: () => import('@/pages/system/role')
  },
  菜单管理: {
    name: '菜单管理',
    component: () => import('@/pages/system/permission')
  },
  日志管理: {
    name: '日志管理',
    component: view.blank
  },
  操作日志: {
    name: '操作日志',
    component: () => import('@/pages/system/log/handle')
  },
  登录日志: {
    name: '登录日志',
    component: () => import('@/pages/system/log/logininfo')
  },
  设备: {
    name: '设备',
    component: view.blank
  },
  设备状态: {
    name: '设备状态',
    component: () => import('@/pages/device/status')
  },
  设备详情: {
    name: '设备详情',
    component: () => import('@/pages/device/detail')
  },
  success: {
    name: '成功',
    component: () => import('@/pages/result/Success')
  },
  error: {
    name: '失败',
    component: () => import('@/pages/result/Error')
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
}
export default routerMap

