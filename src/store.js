import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
// npm install --save axios vue-axios を実行してデータにアクセスできるようにする
//import VueAxios from 'vue-axios'
//Vue.use(VueAxios, axios)
//Vue.config.productionTip = false

Vue.use(Vuex);

export default new Vuex.Store({
  //state:コンポーネントでいうdata
  state: {
    skillCategories: [],
  },



  //getters:コンポーネントでいうcomputed的なもの
  getters: {
      getSkills: (state) => (category) => {
        if (state.skillcategories.length > 0) {
          return state.skillcategories.find((skill) => skill.category===category);
        }
      return [];
    },
  },



  //mutations:コンポーネントでいうmethod（と言うかsetter）
  //stateを唯一変更できるもの
  mutations: {
    //vuexでは引数をpayloadと呼ぶっぽい
    //payloadはオブジェクトにするべき（いっぱい入れれるし）
    setSkillCategories(state, payload) {
      state.skillCategories = payload.skillCategories;
    },
  },



  //actionのコミットを使うことでミューテーションを呼び出す（コンポーネントには無い概念）
  actions: {
    async updateSkillcategories({commit}) {
      const skillCategories = [];
      const res = await axios.get('https://us-central1-myfirstfirebase-8807b.cloudfunctions.net/skills');
      res.date.forEach((category) =>{
        skillCategories.push(category);
      });
      commit('setSkillCategories', {skillCategories});
    },
  },
});
