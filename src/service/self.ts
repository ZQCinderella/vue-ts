export default class SelfService {
  static getAllHerosService () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{
          name: '刘备',
          age: 24,
          weapon: '双股剑',
        }, {
          name: '关羽',
          age: 25,
          weapon: '青龙偃月刀',
        }, {
          name: '张飞',
          age: 20,
          weapon: '双股剑',
        }]);
      }, 300);
    });
  }
}
