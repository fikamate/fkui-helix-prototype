import { createRouter, createWebHashHistory } from 'vue-router';
import { XOverviewView, XDocumentView, XJournalView } from './views';
import { XTextFieldDemo } from './components';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'overview', component: XOverviewView },
    { path: '/journal', name: 'journal', component: XJournalView },
    { path: '/documents', name: 'documents', component: XDocumentView },
    {
      path: '/textfield-demo',
      name: 'textfield-demo',
      component: XTextFieldDemo,
    },
  ],
});

export default router;
