import { mount } from "svelte";
import 'modern-normalize';
import App from './App.svelte';

const app = mount(App, {
  target: document.querySelector('div.app')!
})

export default app;