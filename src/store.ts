import {createStore} from 'vuex';
import {testData, testPosts, ColumnProps, PostProps} from "@/testData";
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

/**
 * 全局对象的弊端
 * 1：数据不是响应式的
 * 2：数据修改无法追踪
 * 3：不符合组件开发的原则
 *
 * vuex redux mobx
 * 原则：
 * 1：一个类似object的全局数据结构，称之为store
 * 2：只能调用特殊的方法来实现数据修改
 *
 * vuex 的state都是响应式的
 */
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {isLogin: false}
  },
  mutations: {
    addPost(state, newPost) {
      state.posts.push(newPost);
    },
    login(state) {
      state.user = {...state.user, isLogin: true, name: 'viking'}
    },
    logout(state) {
      state.user = {isLogin: false}
    }
  },
  getters: {
    biggerColumnsLen(state) {
        return state.columns.filter(c => c.id > 2).length;
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id);
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid);
    }
  }
});
// console.log('store:',store.state.count);
// // 通过commit提交mutation，修改state
// store.commit('add');
// console.log('store:',store.state.count);

export default store;