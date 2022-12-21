import Modal from '../../components/Modal/Modal.js';
import Page from '../../components/Page/Page.js';
import initApp from '../utils/initApp.js';

initApp(Page, document.querySelector('.Page'), window.pageData);

document.querySelectorAll('.Modal').forEach((modalElement) => initApp(Modal, modalElement));
