import { useGlobal } from '@/store';
import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router';

// Components
import PanelView from '@/views/PanelView.vue';
import CreateRecordView from '@/views/network/CreateRecordView.vue';

// Pinia Store

// Unimplemented in Vuetify 3.5.6
// import { goTo } from 'vuetify/services';

/** Router Rules */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: async () => await import('@/views/IndexView.vue'),
  },
  {
    path: '/network',
    name: 'Network',
    component: PanelView,
  },
  {
    path: '/network/:id',
    name: 'NetworkEditView',
    component: async () => await import('@/views/network/NetworkEditView.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: async () => await import('@/views/AboutView.vue'),
  },
  {
    path: '/new',
    name: 'create',
    component: CreateRecordView,
  },
  {
    path: '/iptables',
    name: 'Iptables',
    component: async () => await import('@/views/network/IptablesView.vue'),
  },
  // PVE
  {
    path: '/pve/nodes',
    name: 'PVENodes',
    component: async () => await import('@/views/proxmox/NodesView.vue'),
  },
  {
    path: '/pve/nodes/:node',
    name: 'PVENode-Resources',
    component: async () => await import('@/views/proxmox/NodeInfo.vue'),
    props: true,
  },
  {
    path: '/pve/cluster',
    name: 'PVECluster-Resources',
    component: async () => await import('@/views/proxmox/ClusterInfo.vue'),
  },
];

/** Vue Router */
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory(import.meta.env.BASE_URL)
  routes,
});

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const globalStore = useGlobal();
    globalStore.setMessage('');
    next();
  }
);
router.afterEach(() => {
  const globalStore = useGlobal();
  globalStore.setLoading(false);
});
export default router;
