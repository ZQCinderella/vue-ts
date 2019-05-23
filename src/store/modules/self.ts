import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import { Hero, SelfState } from '@/types/self';
import selfService from '@/service/self';
import { ActionContext } from 'vuex';

@Module({
  namespaced: true,
})
export default class SelfStore extends VuexModule {
  // 声明state
  heroList: Hero[] = [] as Hero[];

  // 声明mutation
  @Mutation
  setHeroList (list: Hero[]) {
    this.heroList = list;
  }

  @Mutation
  addHeroMutation (data: Hero) {
    this.heroList.push(data);
  }

  // 声明Action
  @Action({ commit: 'addHeroMutation' })
  async addHeroAction (data: Hero) {
    return data;
  }

  @Action({ commit: 'setHeroList' })
  async getOneHero (name: string) {
    if (!name) {
      return this.context.dispatch('fetchAllHeroes');
    } else {
      if (this.heroList.length > 0) {
        const item = this.heroList.find(item => item.name === name);
        return item ? [item] : this.heroList;
      } else {
        return [];
      }
    }
  }

  @Action({ commit: 'setHeroList'})
  async fetchAllHeroes () {
    return await selfService.getAllHerosService();
  }
}
