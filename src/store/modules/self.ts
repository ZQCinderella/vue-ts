import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import { Hero } from '@/types/self';
import selfService from '@/service/self';

@Module({
  namespaced: true,
})
export default class SelfStore extends VuexModule {
  // 声明state
  initData: Hero[] = [] as Hero[];

  // 声明mutation
  @Mutation
  setInitData (list: Hero[]) {
    this.initData = list;
  }

  @Mutation
  addHeroMutation (data: Hero) {
    this.initData.push(data);
  }

  // 声明Action
  @Action({ commit: 'addHeroMutation' })
  async addHeroAction (data: Hero) {
    return data;
  }

  @Action({ commit: 'setInitData' })
  async getOneHero (name: string) {
    if (!name) {
      return this.context.dispatch('fetchAllHeroes');
    } else {
      if (this.initData.length > 0) {
        const item = this.initData.find(item => item.name === name);
        return item ? [item] : this.initData;
      } else {
        return [];
      }
    }
  }

  @Action({ commit: 'setInitData'})
  async fetchAllHeroes () {
    return await selfService.getAllHerosService();
  }
}
