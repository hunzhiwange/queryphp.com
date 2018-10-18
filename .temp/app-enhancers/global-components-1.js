import Vue from 'vue'
Vue.component("Bit", () => import("/data/codes/queryphp.com/docs/.vuepress/components/Bit.vue"))
Vue.component("OtherComponent", () => import("/data/codes/queryphp.com/docs/.vuepress/components/OtherComponent.vue"))
Vue.component("demo-1", () => import("/data/codes/queryphp.com/docs/.vuepress/components/demo-1.vue"))
Vue.component("Foo-Bar", () => import("/data/codes/queryphp.com/docs/.vuepress/components/Foo/Bar.vue"))
Vue.component("Badge", () => import("/data/codes/queryphp.com/node_modules/@vuepress/theme-default/global-components/Badge.vue"))


export default {}