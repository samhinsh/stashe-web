import Vue from 'vue'
import Router from 'vue-router'

// Our Route Components
import HelloWorld from '@/components/HelloWorld'
import ReadingListGrid from '@/components/ReadingListGrid'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ReadingListGrid',
      component: ReadingListGrid
    },
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
