<style lang="less">
  .search-container {
    padding: 10px 0;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 200px;
    padding: 8px;
    margin-right: 10px;
    outline: none;
    vertical-align: middle;
  }
  .btn {
    width: 80px;
    padding: 4px 0;
    margin-right: 10px;
    border: 1px solid #42b983;
    cursor: pointer;
  }
  .showAddCon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 15px 0;
  }
  .hero-container {
    border: 1px solid #42b983;
  }
  .hero-header, .hero-item {
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) {
      border-bottom: 1px solid #42b983;
    }
    span {
      flex: 1;
      padding: 5px 0;
      &:not(:last-child) {
        border-right: 1px solid #42b983;
      }
    }
  }
  .hero-header {
    font-weight: bold;
  }
</style>
<template>
  <div>
    <div class="search-container">
      <input type="text" placeholder="请输入英雄姓名搜索" v-model="heroName" @input="searchHero">
      <div class="btn" @click="searchHero">搜索</div>
      <div class="btn" v-if="!showAddCon" @click="showAddCon = !showAddCon">添加英雄</div>
    </div>
    <div class="showAddCon" v-if="showAddCon">
      <input type="text" placeholder="姓名" v-model="newHeroName">
      <input type="text" placeholder="年龄" v-model="newHeroAge">
      <input type="text" placeholder="武器" v-model="newHeroWeapon">
      <div class="btn" @click="addHero">添加英雄</div>
    </div>
    <div class="hero-container">
      <div class="hero-header">
        <span>姓名</span>
        <span>年龄</span>
        <span>武器</span>
      </div>
      <div v-for="(value, index) in heroesList" :key="index" class="hero-item">
        <span>{{ value.name }}</span>
        <span>{{ value.age }}</span>
        <span>{{ value.weapon }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { Action, State, namespace } from 'vuex-class';
  import { Hero } from '@/types/self';
  const heroModule = namespace('selfModule');

  @Component
  export default class Self extends Vue {

    // @ts-ignore
    @heroModule.State('initData') heroesList;

    @heroModule.Action fetchAllHeroes: any;
    @heroModule.Action addHeroAction: any;
    @heroModule.Action getOneHero: any;

    heroName: string = '';
    showAddCon: boolean = false;
    newHeroName: string = '';
    newHeroAge: number | string = '';
    newHeroWeapon: string = '';

    async mounted () {
      await this.fetchAllHeroes();
      console.log('mounted', this.heroesList);
    }
    searchHero () {
      console.log(this.heroName);
      this.getOneHero(this.heroName);
    }
    addHero () {
      if (!this.newHeroName || !this.newHeroAge || !this.newHeroWeapon) {
        alert('请认真填写三项内容');
        return;
      }
      this.addHeroAction({
        name: this.newHeroName,
        age: this.newHeroAge,
        weapon: this.newHeroWeapon,
      });
      this.clearInput();
    }
    clearInput () {
      this.newHeroName = '';
      this.newHeroAge = '';
      this.newHeroWeapon = '';
    }
  }
</script>