import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      setData: {
        setID: "",
        setName: "",
        setDescription: "",
        cards:
          [
           
          ],
      },
    };
  },
  actions: {

  }
});


/*

 {
              questionID: 0,
              flip: false,
              front: {
                title: "",
                body: "",
                tags: []
              },
              back: {
                title: "",
                body: "",
                tags: []
              }
            }
*/